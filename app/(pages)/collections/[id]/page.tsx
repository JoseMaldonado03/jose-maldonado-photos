import Image from "next/image";

import { getCollection, getCollectionPhotos } from "@/app/unsplash";

import classes from "./styles.module.css";

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const collection = await getCollection(id);
  const photos = await getCollectionPhotos(id);

  return (
    <main className={classes.gallery}>
      <div className={`${classes.inicio} ${classes.item}`}>
        <h1>{collection.title}</h1>
        <p className={classes.quantity}>
          Cantidad de Fotos:{collection.total_photos}
        </p>
      </div>
      {photos.map((photo) => (
        <div key={photo.id} className={classes.item}>
          <Image
            className={classes.photo}
            src={photo.urls.raw}
            alt={photo.description ?? ""}
            width={photo.width}
            height={photo.height}
          />
        </div>
      ))}
    </main>
  );
}
