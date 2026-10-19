"use client";
import L from "leaflet";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";

import type { CollectionCard } from "@/app/unsplash.types";
import markersData from "@/map.json";

import classes from "./styles.module.css";

type MapMarker = {
  position: [number, number];
  title: string;
  image: string;
  collection: string;
};

const markers = markersData as MapMarker[];

const FLY_ZOOM = 8;
const MAPBOX_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
const MAPBOX_USERID = process.env.NEXT_PUBLIC_MAPBOX_USERID;
const MAPBOX_STYLEID = process.env.NEXT_PUBLIC_MAPBOX_STYLEID;

const customIcon = new L.Icon({
  iconUrl: "/descarga.png",
  iconSize: [41, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

function bounce(element: HTMLElement | undefined) {
  if (!element) return;

  element.classList.remove(classes.bounce);
  // Reading offsetWidth forces a reflow so the animation restarts on repeated clicks.
  void element.offsetWidth;
  element.classList.add(classes.bounce);
  element.addEventListener(
    "animationend",
    () => element.classList.remove(classes.bounce),
    { once: true },
  );
}

type Collections = Record<string, CollectionCard>;

function Markers({ collections }: { collections: Collections }) {
  const map = useMap();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const pending = useRef<number | null>(null);
  const markerRefs = useRef<(L.Marker | null)[]>([]);

  useMapEvents({
    // The popup opens only once the flight ends.
    moveend: () => {
      if (pending.current !== null) {
        setSelectedIndex(pending.current);
        pending.current = null;
      }
    },
  });

  function select(index: number) {
    bounce(markerRefs.current[index]?.getElement());
    pending.current = index;
    setSelectedIndex(null);
    map.closePopup();
    map.flyTo(markers[index].position, Math.max(map.getZoom(), FLY_ZOOM), {
      duration: 1.5,
    });
  }

  const selected = selectedIndex === null ? null : markers[selectedIndex];
  const card = selected?.collection ? collections[selected.collection] : null;

  return (
    <>
      {markers.map((marker, index) => (
        <Marker
          key={marker.position.join()}
          ref={(instance) => {
            markerRefs.current[index] = instance;
          }}
          icon={customIcon}
          position={marker.position}
          eventHandlers={{ click: () => select(index) }}
        />
      ))}
      {selected && selectedIndex !== null && (
        <Popup
          key={selected.position.join()}
          position={selected.position}
          offset={[1, -27]}
          className={classes.popup}
        >
          <div className={classes.content}>
            <div className={classes.header}>
              <button
                type="button"
                className={classes.arrow}
                onClick={() => select(selectedIndex - 1)}
                disabled={selectedIndex === 0}
                aria-label="Pin anterior"
              >
                <FiChevronLeft />
              </button>
              <span className={classes.title}>{selected.title}</span>
              <button
                type="button"
                className={classes.arrow}
                onClick={() => select(selectedIndex + 1)}
                disabled={selectedIndex === markers.length - 1}
                aria-label="Próximo pin"
              >
                <FiChevronRight />
              </button>
            </div>

            {card ? (
              <Link href={`/collections/${card.id}`} className={classes.card}>
                <span
                  className={classes.cover}
                  style={{ backgroundColor: card.color }}
                >
                  <Image
                    className={classes.coverImage}
                    src={card.coverUrl}
                    alt={card.title}
                    fill
                    sizes="220px"
                  />
                </span>
                <span className={classes.cardTitle}>{card.title}</span>
                <span className={classes.cardCount}>
                  {card.totalPhotos} fotos
                </span>
              </Link>
            ) : (
              selected.image && (
                <Image
                  className={classes.image}
                  src={selected.image}
                  alt={selected.title}
                  width={220}
                  height={130}
                />
              )
            )}
          </div>
        </Popup>
      )}
    </>
  );
}

export default function Maps({ collections }: { collections: Collections }) {
  return (
    <MapContainer
      center={[-34.5876719, -58.4515826]}
      zoom={4}
      attributionControl={false}
      className={classes.container}
    >
      <TileLayer
        attribution='© <a href="https://apps.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url={`https://api.mapbox.com/styles/v1/${MAPBOX_USERID}/${MAPBOX_STYLEID}/tiles/512/{z}/{x}/{y}@2x?access_token=${MAPBOX_ACCESS_TOKEN}`}
      />
      <Markers collections={collections} />
    </MapContainer>
  );
}
