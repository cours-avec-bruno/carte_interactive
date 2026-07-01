import React, { useRef, useState, useEffect } from 'react'
import { expandAndParse } from '../utils/bulkImport'

/**
 * Import GPX en masse : fichiers multiples, .zip, .gpx.gz, ou dossier entier.
 * Remonte la liste des parcours parsés via onImportMany(results).
 */
export default function GpxImporter({ onImportMany }) {
  const fileRef = useRef(null)
  const dirRef = useRef(null)
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)

  // webkitdirectory posé via ref (attribut non standard React)
  useEffect(() => {
    if (dirRef.current) {
      dirRef.current.setAttribute('webkitdirectory', '')
      dirRef.current.setAttribute('directory', '')
    }
  }, [])

  async function handle(fileList) {
    if (!fileList || fileList.length === 0) return
    setBusy(true)
    setError(null)
    setMessage('Lecture des fichiers…')
    try {
      const { results, errors } = await expandAndParse(fileList, (n) =>
        setMessage(`${n} parcours lus…`)
      )

      let saved = 0
      if (results.length > 0) {
        saved = onImportMany(results)
      }

      const parts = []
      if (saved > 0) parts.push(`${saved} parcours importé${saved > 1 ? 's' : ''}`)
      if (errors.length > 0) parts.push(`${errors.length} ignoré${errors.length > 1 ? 's' : ''}`)
      if (results.length === 0 && errors.length === 0) parts.push('Aucun fichier GPX trouvé.')
      setMessage(parts.join(' · '))
    } catch {
      setError('Import impossible. Vérifie tes fichiers.')
      setMessage(null)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="gpx-importer">
      <button
        className="import-btn"
        disabled={busy}
        onClick={() => fileRef.current?.click()}
      >
        {busy ? 'Import…' : 'Importer des GPX / ZIP'}
      </button>
      <button
        className="import-sub-btn"
        disabled={busy}
        onClick={() => dirRef.current?.click()}
      >
        Importer un dossier
      </button>

      <input
        ref={fileRef}
        type="file"
        accept=".gpx,.zip,.gz"
        multiple
        hidden
        onChange={(e) => {
          handle(e.target.files)
          e.target.value = ''
        }}
      />
      <input
        ref={dirRef}
        type="file"
        multiple
        hidden
        onChange={(e) => {
          handle(e.target.files)
          e.target.value = ''
        }}
      />

      {message && <p className="import-msg">{message}</p>}
      {error && <p className="import-error">{error}</p>}
    </div>
  )
}
