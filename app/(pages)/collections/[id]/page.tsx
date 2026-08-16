import Image from "next/image";

import { getUnsplashData } from "@/app/unsplash";
import { CollectionPhotos } from "@/app/unsplash.types";

import classes from "./styles.module.css";

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const photos = await getUnsplashData<CollectionPhotos>(
    `collections/${id}/photos`,
  );
  return (
    <main className={classes.gallery}>
      {photos.map((photo) => (
        <img
          key={photo.id}
          className={classes.photo}
          src={photo.urls.raw}
          alt={photo.description}
        />
      ))}
    </main>
  );
}
