import { getUnsplashData } from "@/app/unsplash";
import { Collections } from "@/app/unsplash.types";
import Link from "next/link";

import classes from "./styles.module.css";
import Image from "next/image";

export default async function Home() {
  const collections = await getUnsplashData<Collections>(
    "users/muso0397/collections",
  );

  return (
    <div className={classes.container}>
      {collections.map((collection, index) => (
        <Link key={collection.id} href={`/collections/${collection.id}`}>
          <div
            className={classes.card}
            style={{ backgroundColor: collection.cover_photo.color }}
          >
            <Image
              src={collection.cover_photo.urls.regular}
              alt={collection.title}
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              loading={index < 2 ? "eager" : "lazy"}
              fetchPriority={index < 2 ? "high" : "auto"}
            />

            <div className={classes.overlay}>
              <h2>{collection.title}</h2>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
