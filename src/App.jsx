import React, { useState, useEffect } from 'react'
import GpxImporter from './components/GpxImporter'
import RegionSelector from './components/RegionSelector'
import ActivityWheel from './components/ActivityWheel'
import DiscoveryStats from './components/DiscoveryStats'
import RouteList from './components/RouteList'
import RouteInfo from './components/RouteInfo'
import MapView from './components/MapView'
import { getRegion, DEFAULT_REGION } from './data/regions'
import { getActivity, DEFAULT_ACTIVITY } from './data/activities'
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
  const regionData = getRegion(region)
  const activityData = getActivity(activity)

  return (
    <div className="app">
      <aside className="sidebar">
        <header className="brand">
          <span className="brand-mark" />
          <span className="brand-name">Carte Interactive</span>
        </header>

        <div className="sidebar-body">
          <GpxImporter onImport={handleImport} />

          <div className="controls">
            <RegionSelector selected={region} onChange={setRegion} />
            <ActivityWheel selected={activity} onChange={setActivity} />
          </div>

          <section className="block">
            <h2 className="block-title">Découverte — {regionData.name}</h2>
            <DiscoveryStats region={region} routes={routes} />
            <p className="block-note">Progression exploratoire estimée à partir des zones traversées.</p>
          </section>

          <section className="block grow">
            <div className="block-head">
              <h2 className="block-title">Mes parcours <span className="count">{routes.length}</span></h2>
              {routes.length > 0 && (
                <button className="reset-btn" onClick={handleReset}>Réinitialiser</button>
              )}
            </div>
            <RouteList
              routes={routes}
              selectedId={selectedId}
              onSelect={setSelectedId}
              onDelete={handleDelete}
            />
          </section>
        </div>
      </aside>

      <main className="map-main">
        <div className="map-topbar">
          <span className="topbar-item">
            <span className="topbar-key">Région</span>
            <span className="topbar-val">{regionData.name}</span>
          </span>
          <span className="topbar-sep" />
          <span className="topbar-item">
            <span className="topbar-key">Activité</span>
            <span className="topbar-val">
              <span className="topbar-dot" style={{ background: activityData.color }} />
              {activityData.label}
            </span>
          </span>
        </div>

        <div className="map-stage">
          <MapView
            routes={routes}
            selectedId={selectedId}
            lastImportedId={lastImportedId}
            regionCenter={regionData.center}
            onSelect={setSelectedId}
          />
          {selectedRoute && (
            <div className="route-info-overlay">
              <RouteInfo route={selectedRoute} onClose={() => setSelectedId(null)} />
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
