import { CollectionPhotos } from "./unsplash.types";

const API_URL = "https://api.unsplash.com";

const headers = {
  Authorization: `Client-ID ${process.env.UNSPLASH_TOKEN}`,
};

export async function getUnsplashData<T>(path: string): Promise<T> {
  const datos = await fetch(`${API_URL}/${path}`, {
    headers,
    next: {
      revalidate: 60 * 60,
    },
  });

  const json = await datos.json();

  return json;
}

export async function getCollection(collectionId: string) {
  const collectionDetails = await getUnsplashData<{ total_photos: number }>(
    `collections/${collectionId}`,
  );

  const photos = [];

  for (let i = 1; photos.length < collectionDetails.total_photos; i++) {
    const collectionPhotos = await getUnsplashData<CollectionPhotos>(
      `collections/${collectionId}/photos?page=${i}`,
    );

    photos.push(...collectionPhotos);
  }

  return photos;
}
