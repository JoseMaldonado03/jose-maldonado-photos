import Image from "next/image";

import { getCollection } from "@/app/unsplash";

import classes from "./styles.module.css";

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const photos = await getCollection(id);

  return (
    <main className={classes.gallery}>
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
