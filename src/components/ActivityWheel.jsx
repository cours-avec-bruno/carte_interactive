import React from 'react'
import { activities } from '../data/mockRoutes'

// Positionne les 4 activités en cercle (haut, droite, bas, gauche)
const POSITIONS = [
  { top: '0%',   left: '50%', transform: 'translate(-50%, 0)' },     // haut
  { top: '50%',  left: '100%', transform: 'translate(-100%, -50%)' }, // droite
  { top: '100%', left: '50%', transform: 'translate(-50%, -100%)' },  // bas
  { top: '50%',  left: '0%',  transform: 'translate(0, -50%)' },      // gauche
]

export default function ActivityWheel({ selected, onChange }) {
  return (
    <div className="activity-section">
      <label className="section-label">🏅 Activité</label>
      <div className="wheel-wrapper">
        <div className="wheel-ring" />
        <div className="wheel-center">
          {activities.find(a => a.id === selected)?.icon}
        </div>
        {activities.map((activity, i) => (
          <button
            key={activity.id}
            className={`wheel-item ${selected === activity.id ? 'active' : ''}`}
            style={POSITIONS[i]}
            onClick={() => onChange(activity.id)}
            title={activity.label}
          >
            <span className="wheel-icon">{activity.icon}</span>
            <span className="wheel-label">{activity.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
