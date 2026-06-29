import React from 'react'
import { regions } from '../data/mockRoutes'

export default function RegionSelector({ selected, onChange }) {
  return (
    <div className="region-selector">
      <label className="section-label">📍 Région</label>
      <div className="region-grid">
        {regions.map((region) => (
          <button
            key={region}
            className={`region-btn ${selected === region ? 'active' : ''}`}
            onClick={() => onChange(region)}
          >
            {region}
          </button>
        ))}
      </div>
    </div>
  )
}
