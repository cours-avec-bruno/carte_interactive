import React, { useState } from 'react'
import LoginButtons from './components/LoginButtons'
import RegionSelector from './components/RegionSelector'
import ActivityWheel from './components/ActivityWheel'
import MapView from './components/MapView'
import { getRoutes } from './data/mockRoutes'

export default function App() {
  const [connectedAs, setConnectedAs] = useState(null)
  const [region, setRegion] = useState('Auvergne-Rhône-Alpes')
  const [activity, setActivity] = useState('velo')

  const routes = connectedAs ? getRoutes(region, activity) : []

  return (
    <div className="app">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1>🗺️ Carte Interactive</h1>
          <p className="subtitle">Visualise tes circuits sportifs</p>
        </div>

        <section className="sidebar-section">
          <LoginButtons
            connectedAs={connectedAs}
            onConnect={setConnectedAs}
            onDisconnect={() => setConnectedAs(null)}
          />
        </section>

        {connectedAs && (
          <>
            <section className="sidebar-section">
              <RegionSelector selected={region} onChange={setRegion} />
            </section>

            <section className="sidebar-section">
              <ActivityWheel selected={activity} onChange={setActivity} />
            </section>

            <section className="sidebar-section route-list">
              <label className="section-label">📋 Circuits ({routes.length})</label>
              {routes.map(r => (
                <div key={r.id} className="route-item">
                  <span className="route-dot" style={{ background: r.color }} />
                  <div className="route-info">
                    <span className="route-name">{r.name}</span>
                    <span className="route-meta">{r.distance} km · {r.elevation} m D+</span>
                  </div>
                </div>
              ))}
            </section>
          </>
        )}

        {!connectedAs && (
          <div className="connect-prompt">
            <p>Connecte-toi pour voir tes circuits sur la carte.</p>
          </div>
        )}
      </aside>

      {/* Carte */}
      <main className="map-main">
        <MapView routes={routes} />
      </main>
    </div>
  )
}
