"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import classes from "./styles.module.css";

type NavBarItemProps = {
  href: string;
  label: string;
  onClick?: () => void;
};

export default function NavBarItem({ href, label, onClick }: NavBarItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`${classes.item} ${isActive ? classes.active : ""}`}
    >
      {label}
    </Link>
  );
}
