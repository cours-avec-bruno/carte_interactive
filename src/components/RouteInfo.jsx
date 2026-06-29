import React from 'react'
import { getRegion } from '../data/regions'
import { getActivity } from '../data/activities'

/**
 * Panneau d'infos du parcours sélectionné.
 */
export default function RouteInfo({ route, onClose }) {
  if (!route) return null

  const region = getRegion(route.region)
  const activity = getActivity(route.activity)
  const date = new Date(route.importDate).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })

  return (
    <div className="route-info" style={{ borderColor: activity.color }}>
      <div className="route-info-head">
        <span className="route-info-icon" style={{ color: activity.color }}>
          {activity.icon}
        </span>
        <h3>{route.name}</h3>
        <button className="route-info-close" onClick={onClose} title="Fermer">✕</button>
      </div>
      <div className="route-info-grid">
        <div><span className="ri-label">Distance</span><span className="ri-value">{route.distance} km</span></div>
        <div><span className="ri-label">Points GPS</span><span className="ri-value">{route.pointCount}</span></div>
        <div><span className="ri-label">Activité</span><span className="ri-value">{activity.label}</span></div>
        <div><span className="ri-label">Région</span><span className="ri-value">{region.name}</span></div>
        <div><span className="ri-label">Importé le</span><span className="ri-value">{date}</span></div>
        <div><span className="ri-label">Fichier</span><span className="ri-value ri-file">{route.fileName}</span></div>
      </div>
    </div>
  )
}
