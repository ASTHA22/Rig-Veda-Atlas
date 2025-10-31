import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function Map() {
  return (
    <MapContainer
      center={[28.0, 77.0]}
      zoom={5}
      style={{ height: '100vh', width: '100%' }}
      zoomControl={true}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />
      <Marker position={[28.0, 77.0]}>
        <Popup>Test Marker</Popup>
      </Marker>
    </MapContainer>
  );
}
