import React from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import neighborhoods from 'Domains.json'; // Your converted GeoJSON file

const Map = () => {
  const onEachFeature = (feature, layer) => {
    if (feature.properties && feature.properties.name) {
      layer.bindTooltip(feature.properties.name); // Display name on hover
    }
    layer.on({
      mouseover: (e) => {
        e.target.setStyle({
          color: '#ffcc00', // Highlight color
          weight: 3,
        });
      },
      mouseout: (e) => {
        e.target.setStyle({
          color: '#3388ff',
          weight: 1,
        });
      },
    });
  };

  return (
    <MapContainer center={[37.9902, 23.6813]} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <GeoJSON data={neighborhoods} onEachFeature={onEachFeature} />
    </MapContainer>
  );
};

export default Map;
