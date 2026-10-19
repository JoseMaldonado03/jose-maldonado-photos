"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import classes from "./styles.module.css";

interface PhotoFrameProps {
  src: string;
  alt: string;
  color: string;
}

export default function PhotoFrame({ src, alt, color }: PhotoFrameProps) {
  const imageRef = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);

  // A cached image can finish loading before hydration, so onLoad never fires.
  useEffect(() => {
    if (imageRef.current?.complete) {
      setLoaded(true);
    }
  }, []);

  return (
    <div className={classes.frame} style={{ backgroundColor: color }}>
      {!loaded && <span className={classes.spinner} aria-label="Cargando" />}
      <Image
        ref={imageRef}
        className={`${classes.photo} ${loaded ? classes.loaded : ""}`}
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, calc(100vw - 160px)"
        loading="eager"
        fetchPriority="high"
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
