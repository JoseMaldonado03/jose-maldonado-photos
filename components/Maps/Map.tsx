"use client";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import classes from "./styles.module.css";

const MAPBOX_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
const MAPBOX_USERID = process.env.NEXT_PUBLIC_MAPBOX_USERID;
const MAPBOX_STYLEID = process.env.NEXT_PUBLIC_MAPBOX_STYLEID;

const customIcon = new L.Icon({
  iconUrl: "/descarga.png",
  iconSize: [41, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

export default function Maps() {
  return (
    <MapContainer
      center={[-34.5876719, -58.4515826]}
      zoom={4}
      scrollWheelZoom={false}
      attributionControl={false}
      className={classes.container}
    >
      <TileLayer
        attribution='© <a href="https://apps.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url={`https://api.mapbox.com/styles/v1/${MAPBOX_USERID}/${MAPBOX_STYLEID}/tiles/512/{z}/{x}/{y}@2x?access_token=${MAPBOX_ACCESS_TOKEN}`}
      />
      <Marker icon={customIcon} position={[-54.8068351, -68.3853746]}>
        <Popup>Ushuaia</Popup>
      </Marker>
      <Marker icon={customIcon} position={[-12.9017521, -38.5027637]}>
        <Popup>Salvador</Popup>
      </Marker>
      <Marker icon={customIcon} position={[-23.6820636, -46.9249425]}>
        <Popup>São Paulo</Popup>
      </Marker>
      <Marker icon={customIcon} position={[-12.8801657, -41.3928278]}>
        <Popup>Lençois</Popup>
      </Marker>
      <Marker icon={customIcon} position={[-12.7332594, -38.5116182]}>
        <Popup>Caboto</Popup>
      </Marker>
      <Marker icon={customIcon} position={[-33.4726784, -70.7949816]}>
        <Popup>Santiago</Popup>
      </Marker>
      <Marker icon={customIcon} position={[-33.0055221, -71.571455]}>
        <Popup>Viña del Mar</Popup>
      </Marker>
      <Marker icon={customIcon} position={[-41.1282349, -71.5050635]}>
        <Popup>Bariloche</Popup>
      </Marker>
      <Marker icon={customIcon} position={[-34.4486388, -57.8777606]}>
        <Popup>Colonia del Sacramento</Popup>
      </Marker>
      <Marker icon={customIcon} position={[-34.6157959, -58.5158705]}>
        <Popup>Buenos Aires</Popup>
      </Marker>
      <Marker icon={customIcon} position={[-38.0175379, -57.6829343]}>
        <Popup>Mar del Plata</Popup>
      </Marker>
      <Marker icon={customIcon} position={[-31.399446, -64.2720448]}>
        <Popup>Cordoba</Popup>
      </Marker>
      <Marker icon={customIcon} position={[8.5916679, -71.2144957]}>
        <Popup>Mérida</Popup>
      </Marker>
      <Marker icon={customIcon} position={[4.6482784, -74.2726164]}>
        <Popup>Bogotá</Popup>
      </Marker>
      <Marker icon={customIcon} position={[7.908758, -72.5456201]}>
        <Popup>Cúcuta</Popup>
      </Marker>
    </MapContainer>
  );
}
