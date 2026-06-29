import React from 'react'
import { getRegion } from '../data/regions'
import { getActivity } from '../data/activities'

/**
 * Liste des parcours sauvegardés avec actions Voir / Supprimer.
 */
export default function RouteList({ routes, selectedId, onSelect, onDelete }) {
  if (routes.length === 0) {
    return (
      <div className="route-list-empty">
        Aucun parcours importé pour l'instant.
      </div>
    )
  }

  return (
    <div className="route-list">
      {routes.map((route) => {
        const activity = getActivity(route.activity)
        const region = getRegion(route.region)
        const date = new Date(route.importDate).toLocaleDateString('fr-FR', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit',
        })

        return (
          <div
            key={route.id}
            className={`route-card ${selectedId === route.id ? 'selected' : ''}`}
          >
            <div className="route-card-top">
              <span className="route-card-icon" style={{ color: activity.color }}>
                {activity.icon}
              </span>
              <span className="route-card-name" title={route.fileName}>
                {route.name}
              </span>
            </div>

            <div className="route-card-meta">
              <span>{region.name}</span>
              <span>·</span>
              <span>{activity.label}</span>
            </div>

            <div className="route-card-stats">
              <span>📏 {route.distance} km</span>
              <span>📅 {date}</span>
            </div>

            <div className="route-card-actions">
              <button className="card-btn view" onClick={() => onSelect(route.id)}>
                Voir
              </button>
              <button className="card-btn delete" onClick={() => onDelete(route.id)}>
                Supprimer
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
