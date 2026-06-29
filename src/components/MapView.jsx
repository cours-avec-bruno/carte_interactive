import React, { useEffect } from 'react'
import { MapContainer, TileLayer, Polyline, CircleMarker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { getActivity } from '../data/activities'

// Recentre la carte quand la cible change (région ou parcours sélectionné)
function MapFocus({ focusRoute, regionCenter }) {
  const map = useMap()

  useEffect(() => {
    if (focusRoute && focusRoute.coordinates.length > 0) {
      const lats = focusRoute.coordinates.map((p) => p[0])
      const lons = focusRoute.coordinates.map((p) => p[1])
      map.fitBounds(
        [[Math.min(...lats), Math.min(...lons)], [Math.max(...lats), Math.max(...lons)]],
        { padding: [50, 50] }
      )
    } else if (regionCenter) {
      map.setView(regionCenter, 9)
    }
  }, [focusRoute, regionCenter, map])

  return null
}

export default function MapView({ routes, selectedId, lastImportedId, regionCenter, onSelect }) {
  const selectedRoute = routes.find((r) => r.id === selectedId)
  // Cible du recentrage : parcours sélectionné en priorité
  const focusRoute = selectedRoute || null

  return (
    <div className="map-wrapper">
      <MapContainer center={regionCenter || [46.8, 2.3]} zoom={9} style={{ width: '100%', height: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        <MapFocus focusRoute={focusRoute} regionCenter={regionCenter} />

        {routes.map((route) => {
          const activity = getActivity(route.activity)
          const isSelected = route.id === selectedId
          const isLast = route.id === lastImportedId

          return (
            <Polyline
              key={route.id}
              positions={route.coordinates}
              pathOptions={{
                color: activity.color,
                weight: isSelected ? 7 : isLast ? 5 : 3,
                opacity: isSelected || isLast ? 1 : 0.55,
                dashArray: isLast && !isSelected ? '1, 0' : undefined,
              }}
              eventHandlers={{ click: () => onSelect(route.id) }}
            >
              <Popup>
                <div className="popup-content">
                  <strong>{route.name}</strong>
                  <div className="popup-stats">
                    <span>📏 {route.distance} km</span>
                    <span>📍 {route.pointCount} points</span>
                    <span style={{ color: activity.color }}>{activity.icon} {activity.label}</span>
                  </div>
                </div>
              </Popup>
            </Polyline>
          )
        })}

        {/* Marqueurs départ / arrivée du parcours sélectionné */}
        {selectedRoute && selectedRoute.coordinates.length > 0 && (
          <>
            <CircleMarker
              center={selectedRoute.coordinates[0]}
              radius={8}
              pathOptions={{ color: '#fff', fillColor: '#06d6a0', fillOpacity: 1, weight: 3 }}
            >
              <Popup>🟢 Départ — {selectedRoute.name}</Popup>
            </CircleMarker>
            <CircleMarker
              center={selectedRoute.coordinates[selectedRoute.coordinates.length - 1]}
              radius={8}
              pathOptions={{ color: '#fff', fillColor: '#e94560', fillOpacity: 1, weight: 3 }}
            >
              <Popup>🏁 Arrivée — {selectedRoute.name}</Popup>
            </CircleMarker>
          </>
        )}
      </MapContainer>

      {routes.length === 0 && (
        <div className="map-empty">
          <span>Importe un fichier GPX pour voir tes parcours apparaître ici 🗺️</span>
        </div>
      )}
    </div>
  )
}
