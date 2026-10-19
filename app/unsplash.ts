import { cache } from "react";

import { fetchJson } from "@/lib/http";

import {
  Collection,
  CollectionCard,
  Photo,
  UserStatistics,
} from "./unsplash.types";

const API_URL = "https://api.unsplash.com";
const USERNAME = "muso0397";

/**
 * Unsplash's demo tier allows only 50 requests/hour — far too little to serve every
 * visitor live. The collection and photo pages are built statically
 * (generateStaticParams walks them during `next build`); this window then keeps them
 * as ISR, so the first visit after a day triggers one background refetch per distinct
 * URL instead of a request per visit.
 */
const REVALIDATE = 60 * 60 * 24;

/**
 * A rejected or rate-limited token stays rejected for the whole build — fail the
 * build loudly instead of shipping empty pages. 403 is what Unsplash returns once
 * the hourly quota is spent; 401 is a bad access key.
 */
const FAIL_FAST_STATUSES = [401, 403];

/** Unsplash caps per_page at 30. */
const PAGE_SIZE = 30;
/** Safety cap so a misbehaving API can never loop forever (30 × 20 = 600 items). */
const MAX_PAGES = 20;

const VALID_ID = /^[\w-]{1,64}$/;

function getUnsplashData<T>(
  path: string,
  id: string,
  failFast = true,
): Promise<T | null> {
  return fetchJson<T>(`${API_URL}/${path}`, {
    headers: { Authorization: `Client-ID ${process.env.UNSPLASH_TOKEN}` },
    id,
    revalidate: REVALIDATE,
    failFastStatuses: failFast ? FAIL_FAST_STATUSES : undefined,
  });
}

async function getAllPages<T>(path: string, id: string): Promise<T[]> {
  const all: T[] = [];

  for (let page = 1; page <= MAX_PAGES; page += 1) {
    const items = await getUnsplashData<T[]>(
      `${path}?per_page=${PAGE_SIZE}&page=${page}`,
      id,
    );

    // Throwing keeps a failed response from being cached as a partial page.
    if (!items) {
      throw new Error(`[${id}] Unsplash request failed`);
    }

    all.push(...items);

    if (items.length < PAGE_SIZE) {
      break;
    }
  }

  return all;
}

export const getUserCollections = cache(() =>
  getAllPages<Collection>(
    `users/${USERNAME}/collections`,
    "unsplash-collections",
  ),
);

// The collections list already carries title, total_photos and cover_photo, so
// single collections never need a request of their own.
export async function getCollection(collectionId: string) {
  if (!VALID_ID.test(collectionId)) {
    return null;
  }

  const collections = await getUserCollections();

  return collections.find(({ id }) => id === collectionId) ?? null;
}

export async function getCollectionCard(
  collectionId: string,
): Promise<CollectionCard | null> {
  const collection = await getCollection(collectionId);

  if (!collection?.cover_photo) {
    return null;
  }

  return {
    id: collection.id,
    title: collection.title,
    totalPhotos: collection.total_photos,
    coverUrl: collection.cover_photo.urls.regular,
    color: collection.cover_photo.color,
  };
}

export const getCollectionPhotos = cache((collectionId: string) =>
  getAllPages<Photo>(
    `collections/${encodeURIComponent(collectionId)}/photos`,
    "unsplash-collection-photos",
  ),
);

export async function getPhotoParams() {
  const collections = await getUserCollections();
  const params: { id: string; photoId: string }[] = [];

  // Sequential so each collection is cached before the next one is requested.
  for (const { id } of collections) {
    const photos = await getCollectionPhotos(id);

    params.push(...photos.map((photo) => ({ id, photoId: photo.id })));
  }

  return params;
}

export async function getCollectionPhoto(
  collectionId: string,
  photoId: string,
) {
  if (!(await getCollection(collectionId))) {
    return null;
  }

  const photos = await getCollectionPhotos(collectionId);
  const index = photos.findIndex((photo) => photo.id === photoId);

  if (index === -1) {
    return null;
  }

  return {
    photo: photos[index],
    previousId: photos[index - 1]?.id ?? null,
    nextId: photos[index + 1]?.id ?? null,
    position: index + 1,
    total: photos.length,
  };
}

export async function getUserStatistics(username: string) {
  const statistics = await getUnsplashData<UserStatistics>(
    `users/${encodeURIComponent(username)}/statistics`,
    "unsplash-statistics",
    false,
  );

  if (!statistics) {
    return null;
  }

  return {
    views: statistics.views.total,
    downloads: statistics.downloads.total,
  };
}
