import React from 'react'
import { regions } from '../data/regions'

/**
 * Sélecteur de région compact : un select natif stylisé.
 */
export default function RegionSelector({ selected, onChange }) {
  return (
    <div className="field">
      <label className="field-label" htmlFor="region-select">Région</label>
      <div className="select-wrap">
        <select
          id="region-select"
          className="select"
          value={selected}
          onChange={(e) => onChange(e.target.value)}
        >
          {regions.map((region) => (
            <option key={region.id} value={region.id}>
              {region.name}
            </option>
          ))}
        </select>
        <span className="select-chevron" aria-hidden="true">▾</span>
      </div>
    </div>
  )
}
