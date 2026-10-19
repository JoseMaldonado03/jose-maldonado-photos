import {
  Collection,
  CollectionCard,
  CollectionPhotos,
  UserStatistics,
} from "./unsplash.types";

const API_URL = "https://api.unsplash.com";

const headers = {
  Authorization: `Client-ID ${process.env.UNSPLASH_TOKEN}`,
};

export async function getUnsplashData<T>(path: string): Promise<T> {
  try {
    const datos = await fetch(`${API_URL}/${path}`, {
      headers,
      next: {
        revalidate: 60 * 60,
      },
    });

    const json = await datos.json();

    return json as T;
  } catch (error) {
    console.error(error);
    return {} as T;
  }
}

export async function getCollectionPhotos(collectionId: string) {
  const collectionDetails = await getUnsplashData<{ total_photos: number }>(
    `collections/${collectionId}`,
  );

  const photos: CollectionPhotos = [];

  if (collectionDetails.total_photos <= 0) {
    return photos;
  }

  for (let i = 1; photos.length < collectionDetails?.total_photos; i++) {
    const collectionPhotos = await getUnsplashData<CollectionPhotos>(
      `collections/${collectionId}/photos?page=${i}`,
    );

    photos.push(...collectionPhotos);
  }

  return photos;
}

export async function getCollection(collectionId: string) {
  const collectionDetails = await getUnsplashData<{
    title: string;
    total_photos: number;
    description: string;
    updated_at: string;
  }>(`collections/${collectionId}`);

  return collectionDetails;
}

export async function getUserStatistics(username: string) {
  const statistics = await getUnsplashData<Partial<UserStatistics>>(
    `users/${username}/statistics`,
  );

  if (
    typeof statistics.views?.total !== "number" ||
    typeof statistics.downloads?.total !== "number"
  ) {
    return null;
  }

  return {
    views: statistics.views.total,
    downloads: statistics.downloads.total,
  };
}

export async function getCollectionPhoto(
  collectionId: string,
  photoId: string,
) {
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

export async function getCollectionCard(
  collectionId: string,
): Promise<CollectionCard | null> {
  const collection = await getUnsplashData<Collection>(
    `collections/${collectionId}`,
  );

  if (!collection.cover_photo) {
    return null;
  }

  return {
    id: collectionId,
    title: collection.title,
    totalPhotos: collection.total_photos,
    coverUrl: collection.cover_photo.urls.regular,
    color: collection.cover_photo.color,
  };
}
