import Link from "next/link";
import { notFound } from "next/navigation";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import { getCollectionPhoto } from "@/app/unsplash";
import PhotoKeys from "../PhotoKeys";
import PhotoFrame from "./PhotoFrame";

import classes from "./styles.module.css";

interface PhotoViewerProps {
  collectionId: string;
  photoId: string;
}

export default async function PhotoViewer({
  collectionId,
  photoId,
}: PhotoViewerProps) {
  const data = await getCollectionPhoto(collectionId, photoId);

  if (!data) {
    notFound();
  }

  const { photo, previousId, nextId, position, total } = data;

  const previousHref = previousId
    ? `/collections/${collectionId}/photos/${previousId}`
    : null;
  const nextHref = nextId
    ? `/collections/${collectionId}/photos/${nextId}`
    : null;

  return (
    <figure
      className={classes.viewer}
      style={{ "--ratio": photo.width / photo.height } as React.CSSProperties}
    >
      {previousHref && (
        <Link
          href={previousHref}
          replace
          scroll={false}
          className={`${classes.arrow} ${classes.previous}`}
          aria-label="Foto anterior"
        >
          <FiChevronLeft />
        </Link>
      )}

      <PhotoFrame
        key={photo.id}
        src={`${photo.urls.raw}&w=2000&q=80&fit=max&auto=format`}
        alt={photo.description ?? ""}
        color={photo.color}
      />

      {nextHref && (
        <Link
          href={nextHref}
          replace
          scroll={false}
          className={`${classes.arrow} ${classes.next}`}
          aria-label="Foto siguiente"
        >
          <FiChevronRight />
        </Link>
      )}

      <figcaption className={classes.caption}>
        {position} / {total}
      </figcaption>

      <PhotoKeys previousHref={previousHref} nextHref={nextHref} />
    </figure>
  );
}
