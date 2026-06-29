import React from 'react'
import { regions } from '../data/regions'

export default function RegionSelector({ selected, onChange }) {
  return (
    <div className="region-selector">
      <label className="section-label">📍 Région</label>
      <div className="region-grid">
        {regions.map((region) => (
          <button
            key={region.id}
            className={`region-btn ${selected === region.id ? 'active' : ''}`}
            onClick={() => onChange(region.id)}
          >
            {region.name}
          </button>
        ))}
      </div>
    </div>
  )
}
