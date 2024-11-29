import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import domains from '../data/Domains.json'; // Static domains data or your GeoJSON file
import axios from 'axios'; // If you're using axios for data fetching
import './MapComponent.css'; // New CSS file for dark theme

const MapComponent = () => {
  const [database, setDatabase] = useState(null);
  const [loading, setLoading] = useState(true);

  const jsonBinUrl = 'https://api.jsonbin.io/v3/b/6747626bacd3cb34a8b000a2'; // Replace with your actual bin URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(jsonBinUrl, {
          headers: {
            'X-Master-Key': '$2b$10$UZ0nh9zAcCgQh0i.0U4BXOoTKmaLGLgq4sf5kFV.a0m8EXz6QWTua', // If needed for private bins
          },
        });
        setDatabase(response.data); // Set the data from the bin
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data from JSON Bin:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getColor = (name) => {
    if (database?.areas.darkRed.includes(name)) return "darkred";
    if (database?.areas.blue.includes(name)) return "blue";
    return database?.areas.defaultColor || "gray";
  };

  const getPopupContent = (feature) => {
    const areaName = feature.properties.name;
    const info = database?.popupInfo[areaName] || database?.defaultPopupInfo;
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

    layer.setStyle({
      fillColor: getColor(areaName),
      color: "black",
      weight: 1,
      fillOpacity: 0.6,
    });

    if (areaName) {
      layer.bindTooltip(areaName);
    }

    layer.bindPopup(getPopupContent(feature));

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

  if (loading) {
    return <div className="loading">Loading...</div>; // Dark themed loading
  }

  return (
    <div className="map-container">
      <MapContainer center={[37.9902, 23.6813]} zoom={13} style={{ height: '80vh', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <GeoJSON data={domains} onEachFeature={onEachFeature} />
      </MapContainer>
    </div>
  );
};

export default MapComponent;
