import React, { useState, useEffect } from 'react'
import GpxImporter from './components/GpxImporter'
import RegionSelector from './components/RegionSelector'
import ActivityWheel from './components/ActivityWheel'
import DiscoveryStats from './components/DiscoveryStats'
import RouteList from './components/RouteList'
import RouteInfo from './components/RouteInfo'
import MapView from './components/MapView'
import { regions, DEFAULT_REGION, getRegion } from './data/regions'
import { DEFAULT_ACTIVITY } from './data/activities'
import {
  loadRoutes,
  addRoute,
  removeRoute,
  clearRoutes,
  generateId,
} from './utils/storage'

export default function App() {
  const [routes, setRoutes] = useState([])
  const [region, setRegion] = useState(DEFAULT_REGION)
  const [activity, setActivity] = useState(DEFAULT_ACTIVITY)
  const [selectedId, setSelectedId] = useState(null)
  const [lastImportedId, setLastImportedId] = useState(null)

  // Persistance : on charge les parcours sauvegardés au démarrage
  useEffect(() => {
    setRoutes(loadRoutes())
  }, [])

  function handleImport(parsed) {
    const route = {
      id: generateId(),
      name: parsed.name,
      fileName: parsed.fileName,
      importDate: new Date().toISOString(),
      region,
      activity,
      coordinates: parsed.coordinates,
      distance: parsed.distance,
      pointCount: parsed.pointCount,
    }
    setRoutes(addRoute(route))
    setLastImportedId(route.id)
    setSelectedId(route.id)
  }

  function handleDelete(id) {
    setRoutes(removeRoute(id))
    if (selectedId === id) setSelectedId(null)
    if (lastImportedId === id) setLastImportedId(null)
  }

  function handleReset() {
    if (window.confirm('Supprimer définitivement tous tes parcours sauvegardés ?')) {
      setRoutes(clearRoutes())
      setSelectedId(null)
      setLastImportedId(null)
    }
  }

  const selectedRoute = routes.find((r) => r.id === selectedId) || null
  const regionCenter = getRegion(region).center

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1>🗺️ Carte Interactive</h1>
          <p className="subtitle">Explore et garde la trace de tes parcours</p>
        </div>

        <section className="sidebar-section">
          <GpxImporter onImport={handleImport} />
        </section>

        <section className="sidebar-section">
          <RegionSelector selected={region} onChange={setRegion} />
        </section>

        <section className="sidebar-section">
          <ActivityWheel selected={activity} onChange={setActivity} />
        </section>

        <section className="sidebar-section">
          <DiscoveryStats region={region} routes={routes} />
        </section>

        <section className="sidebar-section grow">
          <div className="route-list-header">
            <label className="section-label">📋 Mes parcours ({routes.length})</label>
            {routes.length > 0 && (
              <button className="reset-btn" onClick={handleReset}>
                Réinitialiser
              </button>
            )}
          </div>
          <RouteList
            routes={routes}
            selectedId={selectedId}
            onSelect={setSelectedId}
            onDelete={handleDelete}
          />
        </section>
      </aside>

      <main className="map-main">
        <MapView
          routes={routes}
          selectedId={selectedId}
          lastImportedId={lastImportedId}
          regionCenter={regionCenter}
          onSelect={setSelectedId}
        />
        {selectedRoute && (
          <div className="route-info-overlay">
            <RouteInfo route={selectedRoute} onClose={() => setSelectedId(null)} />
          </div>
        )}
      </main>
    </div>
  )
}
