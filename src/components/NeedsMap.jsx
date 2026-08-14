import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet'
import { CITY_COORDS } from '../data/cities'

const URGENCY_COLOR = {
  critique: "#C0392B",
  urgent: "#F1C40F",
  normal: "#1E8449",
}

function jitter(coord, seed) {
  const offset = ((seed * 37) % 100) / 1000 - 0.05
  return [coord[0] + offset, coord[1] + offset * 1.3]
}

function NeedsMap({ needs }) {
  const center = CITY_COORDS["Ouagadougou"]

  return (
    <div className="rounded-xl overflow-hidden border border-gray-100 shadow-sm" style={{ height: 420 }}>
      <MapContainer center={center} zoom={7} style={{ height: "100%", width: "100%" }} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {needs.map((need) => {
          const base = CITY_COORDS[need.lieu] || center
          const pos = jitter(base, need.id)
          return (
            <CircleMarker
              key={need.id}
              center={pos}
              radius={10}
              pathOptions={{
                color: URGENCY_COLOR[need.urgence],
                fillColor: URGENCY_COLOR[need.urgence],
                fillOpacity: 0.7,
                weight: 2,
              }}
            >
              <Popup>
                <strong>{need.hopital}</strong><br />
                {need.groupe} · {need.quantite} poches<br />
                {need.lieu}
              </Popup>
            </CircleMarker>
          )
        })}
      </MapContainer>
    </div>
  )
}

export default NeedsMap