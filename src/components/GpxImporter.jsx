import React, { useRef, useState } from 'react'
import { parseGpxFile } from '../utils/gpxParser'

/**
 * Bouton d'import GPX. Parse chaque fichier et remonte le résultat
 * via onImport(parsed) au parent (qui s'occupe de la sauvegarde).
 */
export default function GpxImporter({ onImport }) {
  const inputRef = useRef(null)
  const [error, setError] = useState(null)
  const [busy, setBusy] = useState(false)

  async function handleFiles(fileList) {
    setError(null)
    setBusy(true)
    try {
      for (const file of Array.from(fileList)) {
        const parsed = await parseGpxFile(file)
        onImport({ ...parsed, fileName: file.name })
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="gpx-importer">
      <label className="section-label">📂 Importer un parcours</label>
      <button
        className="import-btn"
        onClick={() => inputRef.current?.click()}
        disabled={busy}
      >
        {busy ? 'Lecture…' : '＋ Ajouter un fichier GPX'}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept=".gpx"
        multiple
        style={{ display: 'none' }}
        onChange={(e) => {
          handleFiles(e.target.files)
          e.target.value = '' // permet de réimporter le même fichier
        }}
      />
      {error && <p className="import-error">⚠️ {error}</p>}
    </div>
  )
}
