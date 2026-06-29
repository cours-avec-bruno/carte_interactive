import React from 'react'
import { getActivity } from '../data/activities'

/**
 * Liste compacte des parcours sauvegardés, en lignes fines.
 */
export default function RouteList({ routes, selectedId, onSelect, onDelete }) {
  if (routes.length === 0) {
    return (
      <div className="route-empty">
        <p className="route-empty-title">Aucun parcours pour l'instant</p>
        <p className="route-empty-sub">Importe un fichier GPX pour commencer à explorer ton territoire.</p>
      </div>
    )
  }

  return (
    <ul className="route-list">
      {routes.map((route) => {
        const activity = getActivity(route.activity)
        const date = new Date(route.importDate).toLocaleDateString('fr-FR', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit',
        })

        return (
          <li
            key={route.id}
            className={`route-row ${selectedId === route.id ? 'selected' : ''}`}
          >
            <span className="route-rail" style={{ background: activity.color }} />
            <div className="route-main">
              <span className="route-name" title={route.fileName}>{route.name}</span>
              <span className="route-meta">
                {activity.label} · {route.distance} km · {date}
              </span>
            </div>
            <div className="route-actions">
              <button className="link-btn" onClick={() => onSelect(route.id)}>Voir</button>
              <button className="link-btn danger" onClick={() => onDelete(route.id)}>Supprimer</button>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
