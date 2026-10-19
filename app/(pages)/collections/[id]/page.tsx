import Image from "next/image";
import Link from "next/link";

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
      {photos.map((photo, index) => (
        <div key={photo.id} className={classes.item}>
          <Link
            href={`/collections/${id}/photos/${photo.id}`}
            scroll={false}
            className={classes.link}
          >
            <Image
              className={classes.photo}
              src={photo.urls.regular}
              alt={photo.description ?? ""}
              width={photo.width}
              height={photo.height}
              sizes="(max-width: 640px) 100vw, 512px"
              loading={index < 2 ? "eager" : "lazy"}
              fetchPriority={index < 2 ? "high" : "auto"}
            />
          </Link>
        </div>
      ))}
    </main>
  );
}
