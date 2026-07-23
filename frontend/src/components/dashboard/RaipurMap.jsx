import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";

import TrafficMap from "../map/TrafficMap";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function RaipurMap() {
  const [mapData, setMapData] = useState(null);
  const [locationDetails, setLocationDetails] = useState({});
  const [locationLoading, setLocationLoading] = useState({});
  const [locationErrors, setLocationErrors] = useState({});

  useEffect(() => {
    async function fetchMapData() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/map");
        setMapData(response.data);
      } catch (error) {
        console.error("Failed to fetch map data:", error);
      }
    }

    fetchMapData();
  }, []);

  async function fetchLocationDetails(id) {
    setLocationLoading((previous) => ({
      ...previous,
      [id]: true,
    }));
    setLocationErrors((previous) => ({
      ...previous,
      [id]: false,
    }));

    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/location/${id}`);
      setLocationDetails((previous) => ({
        ...previous,
        [id]: response.data,
      }));
    } catch (error) {
      console.error("Failed to fetch location details:", error);
      setLocationErrors((previous) => ({
        ...previous,
        [id]: true,
      }));
    } finally {
      setLocationLoading((previous) => ({
        ...previous,
        [id]: false,
      }));
    }
  }

  if (!mapData) {
    return (
      <div className="flex h-full w-full items-center justify-center text-white">
        Loading Map...
      </div>
    );
  }

  return (
    <TrafficMap
      center={[mapData.center.lat, mapData.center.lng]}
      zoom={mapData.zoom}
      onMarkerPopupOpen={(location) => fetchLocationDetails(location.id)}
      renderPopup={(location) => (
        <>
          {locationLoading[location.id] && "Loading..."}

          {locationErrors[location.id] && "Unable to load location details."}

          {!locationLoading[location.id] &&
            !locationErrors[location.id] &&
            locationDetails[location.id] && (
              <>
                <strong>{locationDetails[location.id].name}</strong>
                <br />
                Congestion: {locationDetails[location.id].congestion}%
                <br />
                Average Speed: {locationDetails[location.id].averageSpeed} km/h
                <br />
                Prediction: {locationDetails[location.id].prediction}
                <br />
                Risk Level: {locationDetails[location.id].riskLevel}
                <br />
                Weather: {locationDetails[location.id].weather}
                <br />
                Temperature: {locationDetails[location.id].temperature} C
                <br />
                Travel Time: {locationDetails[location.id].travelTime}
              </>
            )}

          {!locationLoading[location.id] &&
            !locationErrors[location.id] &&
            !locationDetails[location.id] &&
            "Loading..."}
        </>
      )}
    />
  );
}
