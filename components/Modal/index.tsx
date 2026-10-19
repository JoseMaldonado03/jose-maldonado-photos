"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FiX } from "react-icons/fi";

import classes from "./styles.module.css";

export default function Modal({ children }: React.PropsWithChildren) {
  const router = useRouter();

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        router.back();
      }
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [router]);

  return (
    <div
      className={classes.overlay}
      role="dialog"
      aria-modal="true"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          router.back();
        }
      }}
    >
      <button
        type="button"
        className={classes.close}
        onClick={() => router.back()}
        aria-label="Cerrar"
      >
        <FiX />
      </button>
      {children}
    </div>
  );
}
