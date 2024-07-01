/* eslint-disable react/prop-types */
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
export default function Map({ data }) {
  const defaultLatitute = data?.[0]?.latitude;
  const defaultLongitude = data?.[0]?.longitude;
  return (
    <MapContainer
      style={{ height: "80vh", width: "100%" }}
      center={[defaultLatitute, defaultLongitude]}
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {data?.map((marker, index) => {
        return (
          <Marker key={index} position={[marker?.latitude, marker?.longitude]}>
            <Popup>{marker?.title}</Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
