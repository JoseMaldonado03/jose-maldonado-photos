import Image from "next/image";
import Footer from "@/components/Footer";

import classes from "./styles.module.css";

import MenuBox from "../MenuBox";
import NavBar from "../NavBar";
import Container from "../Container";

export default function Presentation() {
  return (
    <section className={classes.hero}>
      <Container>
        <div className={classes.mobileNav}>
          <NavBar />
        </div>
      </Container>
      <Image
        src="/Background.jpg"
        alt="Background"
        fill
        priority
        className={classes.image}
        unoptimized
      />

      <div className={classes.overlay}>
        <MenuBox title="Sobre mi" href="/about" className={classes.aboutBox} />
        <MenuBox
          title="Colecciones"
          href="/collections"
          className={classes.collectionBox}
        />
        <MenuBox title="Mapa" href="/maps" className={classes.mapsBox} />
      </div>

      <Footer color="white" />
    </section>
  );
}
