import { useMemo } from "react";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, Tooltip } from "react-leaflet";

import { locations as defaultLocations } from "../../data/locations";
import "./TrafficMap.css";

function buildIcon(isSelected) {
  if (isSelected) {
    return L.divIcon({
      className: "traffic-map-marker traffic-map-marker--selected",
      html: `<span class="traffic-map-marker-selected"><span class="traffic-map-marker-ring"></span><span class="traffic-map-marker-core"></span></span>`,
      iconSize: [34, 34],
      iconAnchor: [17, 17],
    });
  }

  return L.divIcon({
    className: "traffic-map-marker",
    html: `<span class="traffic-map-marker-dot"></span>`,
    iconSize: [22, 22],
    iconAnchor: [11, 11],
  });
}

export default function TrafficMap({
  center,
  zoom,
  locations = defaultLocations,
  renderPopup,
  onMarkerClick,
  onMarkerPopupOpen,
  selectedLocationId,
  showLocationTooltips = false,
}) {
  const icons = useMemo(
    () => ({
      default: buildIcon(false),
      selected: buildIcon(true),
    }),
    []
  );

  return (
    <div className="w-full h-full overflow-hidden rounded-2xl">
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        className="w-full h-full"
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {locations.map((location) => (
          <Marker
            key={location.id}
            position={[location.lat, location.lng]}
            icon={selectedLocationId === location.id ? icons.selected : icons.default}
            eventHandlers={{
              click: () => onMarkerClick?.(location),
              popupopen: () => onMarkerPopupOpen?.(location),
            }}
          >
            {showLocationTooltips && (
              <Tooltip permanent={selectedLocationId === location.id}>
                {location.name}
              </Tooltip>
            )}
            {renderPopup && (
              <Popup className="traffic-map-popup">{renderPopup(location)}</Popup>
            )}
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}