import React from 'react'
import { computeStats } from '../utils/discovery'

/**
 * Statistiques de découverte pour la région sélectionnée.
 * Les "zones découvertes" sont un indicateur de progression exploratoire,
 * pas une mesure scientifique.
 */
export default function DiscoveryStats({ region, routes }) {
  // On ne garde que les parcours de la région sélectionnée
  const regionRoutes = routes.filter((r) => r.region === region)
  const stats = computeStats(regionRoutes)

  const items = [
    { value: `${stats.totalDistance}`, unit: 'km', label: 'Distance explorée' },
    { value: stats.routeCount, label: 'Parcours' },
    { value: stats.discoveredZones, label: 'Zones découvertes' },
    { value: stats.totalPoints, label: 'Points GPS' },
  ]

  return (
    <div className="discovery">
      <div className="stats-grid">
        {items.map((item) => (
          <div className="stat" key={item.label}>
            <span className="stat-value">
              {item.value}
              {item.unit && <span className="stat-unit"> {item.unit}</span>}
            </span>
            <span className="stat-label">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
