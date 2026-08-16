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
      {collections.map((collection) => (
        <Link key={collection.id} href={`/collections/${collection.id}`}>
          <div className={classes.card}>
            <Image
              src={collection.cover_photo.urls.raw}
              alt={collection.title}
              fill
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
