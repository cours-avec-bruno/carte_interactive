import React from 'react'
import { getRegion } from '../data/regions'
import { getActivity } from '../data/activities'

/**
 * Panneau d'infos du parcours sélectionné, affiché en surimpression sur la carte.
 */
export default function RouteInfo({ route, onClose }) {
  if (!route) return null

  const region = getRegion(route.region)
  const activity = getActivity(route.activity)
  const date = new Date(route.importDate).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })

  return (
    <div className="route-info">
      <div className="route-info-head">
        <span className="route-info-rail" style={{ background: activity.color }} />
        <h3 title={route.fileName}>{route.name}</h3>
        <button className="route-info-close" onClick={onClose} aria-label="Fermer">✕</button>
      </div>
      <div className="route-info-grid">
        <div><span className="ri-value">{route.distance}<span className="ri-unit"> km</span></span><span className="ri-label">Distance</span></div>
        <div><span className="ri-value">{route.pointCount}</span><span className="ri-label">Points GPS</span></div>
        <div><span className="ri-value">{activity.label}</span><span className="ri-label">Activité</span></div>
        <div><span className="ri-value ri-sm">{region.name}</span><span className="ri-label">Région</span></div>
      </div>
      <div className="route-info-foot">Importé le {date}</div>
    </div>
  )
}
