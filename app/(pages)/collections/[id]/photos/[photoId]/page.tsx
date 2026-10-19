import Link from "next/link";

import { getPhotoParams } from "@/app/unsplash";
import PhotoViewer from "@/components/PhotoViewer";

import classes from "./styles.module.css";

export const revalidate = 86400;

export async function generateStaticParams() {
  return getPhotoParams();
}

export default async function PhotoPage({
  params,
}: {
  params: Promise<{ id: string; photoId: string }>;
}) {
  const { id, photoId } = await params;

  return (
    <main className={classes.page}>
      <PhotoViewer collectionId={id} photoId={photoId} />
      <Link href={`/collections/${id}`} className={classes.back}>
        Volver a la colección
      </Link>
    </main>
  );
}
