"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";

import NavBarItem from "../NavBarItem";
import classes from "./styles.module.css";

const sectionLinks = [
  { href: "/collections", label: "Colecciones" },
  { href: "/about", label: "Sobre mí" },
  { href: "/maps", label: "Mapa" },
];

interface NavBarProps {
  color?: string;
}

export default function NavBar(props: NavBarProps) {
  const color = props.color || "white";

  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isHome = pathname === "/";

  const visibleMenuLinks = isHome
    ? sectionLinks
    : [
        { href: "/", label: "Inicio" },
        ...sectionLinks.filter((link) => link.href !== pathname),
      ];

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className={classes.header}>
      <Link href="/" className={classes.brand} onClick={closeMenu}>
        <span className={classes.name} style={{ color }}>
          José Maldonado
        </span>
      </Link>

      <button
        type="button"
        className={classes.menuButton}
        onClick={() => setMenuOpen((open) => !open)}
        aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={menuOpen}
      >
        {menuOpen ? <AiOutlineClose /> : <GiHamburgerMenu />}
      </button>

      {menuOpen && (
        <nav className={classes.mobileNav}>
          {visibleMenuLinks.map(({ href, label }) => (
            <NavBarItem
              key={href}
              href={href}
              label={label}
              onClick={closeMenu}
            />
          ))}
        </nav>
      )}
    </header>
  );
}
