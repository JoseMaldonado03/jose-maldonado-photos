import Container from "@/components/Container";
import Footer from "@/components/Footer";
import Maps from "@/components/Maps";
import NavBar from "@/components/NavBar";
import markers from "@/map.json";

import { getCollectionCard } from "../unsplash";
import type { CollectionCard } from "../unsplash.types";

import classes from "./styles.module.css";

export default async function MapsPage() {
  const collectionIds = [
    ...new Set(markers.map(({ collection }) => collection).filter(Boolean)),
  ];
  const cards = await Promise.all(
    collectionIds.map((id) => getCollectionCard(id)),
  );

  const collections = Object.fromEntries(
    cards
      .filter((card): card is CollectionCard => card !== null)
      .map((card) => [card.id, card]),
  );

  return (
    <>
      <Container>
        <NavBar />
      </Container>
      <div className={classes.map}>
        <Maps collections={collections} />
      </div>
      <Footer color="#ffffff" />
    </>
  );
}
