import React from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import domains from '../data/Domains.json';
import database from '../data/database.json';

const MapComponent = () => {
  const { areas, popupInfo, defaultPopupInfo } = database;

  const getColor = (name) => {
    if (areas.darkRed.includes(name)) return "darkred";
    if (areas.blue.includes(name)) return "blue";
    return areas.defaultColor;
  };

  const getPopupContent = (feature) => {
    const areaName = feature.properties.name; // Using feature properties for the area name
    const info = popupInfo[areaName] || defaultPopupInfo; // Access the popup info based on the area name
    return `
      <b>${areaName}</b><br>
      <i>Owner:</i> ${info.ownerName}<br>
      <i>Email:</i> ${info.email}<br>
      <i>Claimed:</i> ${info.claim ? "Yes" : "No"}<br>
      <i>Feeding Grounds:</i> ${info.feedingGrounds}
    `;
  };

  const onEachFeature = (feature, layer) => {
    const areaName = feature.properties.name;

    // Assign initial color based on area
    layer.setStyle({
      fillColor: getColor(areaName),
      color: "black",
      weight: 1,
      fillOpacity: 0.6,
    });

    // Tooltip with area name
    if (areaName) {
      layer.bindTooltip(areaName);
    }

    // Popup with area details
    layer.bindPopup(getPopupContent(feature)); // Pass feature to getPopupContent

    // Highlight on hover
    layer.on({
      mouseover: (e) => {
        e.target.setStyle({
          fillOpacity: 0.9,
          weight: 2,
        });
      },
      mouseout: (e) => {
        e.target.setStyle({
          fillOpacity: 0.6,
          weight: 1,
        });
      }
    });
  };

  return (
    <MapContainer center={[37.9902, 23.6813]} zoom={13} style={{ height: '80vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <GeoJSON data={domains} onEachFeature={onEachFeature} />
    </MapContainer>
  );
};

export default MapComponent;
