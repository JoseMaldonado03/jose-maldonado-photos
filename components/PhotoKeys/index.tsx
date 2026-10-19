"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface PhotoKeysProps {
  previousHref: string | null;
  nextHref: string | null;
}

export default function PhotoKeys({ previousHref, nextHref }: PhotoKeysProps) {
  const router = useRouter();

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const href =
        event.key === "ArrowLeft"
          ? previousHref
          : event.key === "ArrowRight"
            ? nextHref
            : null;

      if (href) {
        router.replace(href, { scroll: false });
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [router, previousHref, nextHref]);

  return null;
}
