import React from 'react'
import { computeStats } from '../utils/discovery'
import { getRegion } from '../data/regions'

/**
 * Statistiques de découverte pour la région sélectionnée.
 * Les "zones découvertes" sont un indicateur ludique de progression
 * exploratoire, pas une mesure scientifique.
 */
export default function DiscoveryStats({ region, routes }) {
  // On ne garde que les parcours de la région sélectionnée
  const regionRoutes = routes.filter((r) => r.region === region)
  const stats = computeStats(regionRoutes)
  const regionName = getRegion(region).name

  return (
    <div className="discovery-stats">
      <label className="section-label">🧭 Découverte — {regionName}</label>

      <div className="stats-grid">
        <div className="stat-box">
          <span className="stat-value">{stats.routeCount}</span>
          <span className="stat-label">parcours</span>
        </div>
        <div className="stat-box">
          <span className="stat-value">{stats.totalDistance}</span>
          <span className="stat-label">km parcourus</span>
        </div>
        <div className="stat-box">
          <span className="stat-value">{stats.totalPoints}</span>
          <span className="stat-label">points GPS</span>
        </div>
        <div className="stat-box highlight">
          <span className="stat-value">{stats.discoveredZones}</span>
          <span className="stat-label">zones découvertes</span>
        </div>
      </div>

      <p className="stats-hint">
        Progression exploratoire estimée à partir des zones traversées.
      </p>
    </div>
  )
}
