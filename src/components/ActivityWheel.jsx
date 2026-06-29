import React from 'react'
import { activities } from '../data/activities'

/**
 * Sélecteur d'activité minimaliste : des pills.
 * (Le nom du fichier reste ActivityWheel pour ne pas casser les imports.)
 */
export default function ActivityWheel({ selected, onChange }) {
  return (
    <div className="field">
      <label className="field-label">Activité</label>
      <div className="activity-pills">
        {activities.map((activity) => {
          const isActive = selected === activity.id
          return (
            <button
              key={activity.id}
              className={`pill ${isActive ? 'active' : ''}`}
              style={isActive ? { borderColor: activity.color, color: activity.color } : undefined}
              onClick={() => onChange(activity.id)}
            >
              <span className="pill-dot" style={{ background: activity.color }} />
              {activity.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
