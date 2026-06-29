import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Polyline, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

// Centre la vue sur les circuits affichés quand ils changent
function MapFocus({ routes }) {
  const map = useMap()

  useEffect(() => {
    if (routes.length === 0) return
    const allPoints = routes.flatMap(r => r.path)
    const lats = allPoints.map(p => p[0])
    const lons = allPoints.map(p => p[1])
    map.fitBounds([
      [Math.min(...lats), Math.min(...lons)],
      [Math.max(...lats), Math.max(...lons)],
    ], { padding: [40, 40] })
  }, [routes, map])

  return null
}

export default function MapView({ routes }) {
  const [selected, setSelected] = useState(null)

  return (
    <div className="map-wrapper">
      <MapContainer
        center={[46.8, 2.3]}
        zoom={6}
        style={{ width: '100%', height: '100%' }}
        zoomControl={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        <MapFocus routes={routes} />

        {routes.map((route) => (
          <Polyline
            key={route.id}
            positions={route.path}
            pathOptions={{
              color: route.color,
              weight: selected === route.id ? 6 : 4,
              opacity: selected === route.id ? 1 : 0.8,
            }}
            eventHandlers={{
              click: () => setSelected(route.id),
            }}
          >
            <Popup>
              <div className="popup-content">
                <div className="popup-header" style={{ borderColor: route.color }}>
                  <strong>{route.name}</strong>
                </div>
                <div className="popup-stats">
                  <span>📏 {route.distance} km</span>
                  <span>⛰️ {route.elevation} m D+</span>
                  <span className="popup-type" style={{ color: route.color }}>
                    {route.type}
                  </span>
                </div>
              </div>
            </Popup>
          </Polyline>
        ))}
      </MapContainer>

      {routes.length === 0 && (
        <div className="map-empty">
          <span>Sélectionne une région et une activité pour voir tes circuits</span>
        </div>
      )}
    </div>
  )
}
