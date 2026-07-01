import React, { useState, useEffect } from 'react'
import {
  fetchStravaActivities,
  stravaLogout,
  stravaConnectUrl,
  mapStravaType,
} from '../utils/stravaApi'
import { getActivity } from '../data/activities'

/**
 * Connexion Strava + panneau d'import des activités.
 * - non connecté : bouton "Se connecter avec Strava"
 * - connecté : bouton "Importer depuis Strava" (ouvre une modale de sélection)
 */
export default function StravaConnect({ connected, autoOpen, onConnectedChange, onImport }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [activities, setActivities] = useState([])
  const [selected, setSelected] = useState(() => new Set())

  useEffect(() => {
    if (autoOpen && connected) load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoOpen, connected])

  async function load() {
    setOpen(true)
    setLoading(true)
    setError(null)
    try {
      const acts = await fetchStravaActivities()
      setActivities(acts)
      setSelected(new Set(acts.map((a) => a.stravaId)))
    } catch (e) {
      if (e.message === 'not_connected') {
        onConnectedChange(false)
        setError('Session Strava expirée. Reconnecte-toi.')
      } else {
        setError('Impossible de récupérer tes activités Strava.')
      }
    } finally {
      setLoading(false)
    }
  }

  function toggle(id) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function importSelection() {
    onImport(activities.filter((a) => selected.has(a.stravaId)))
    setOpen(false)
  }

  async function logout() {
    await stravaLogout()
    onConnectedChange(false)
    setOpen(false)
  }

  if (!connected) {
    return (
      <a className="strava-btn" href={stravaConnectUrl()}>
        <StravaGlyph /> Se connecter avec Strava
      </a>
    )
  }

  return (
    <div className="strava-connected">
      <div className="strava-row">
        <span className="strava-badge"><StravaGlyph /> Strava connecté</span>
        <button className="link-btn" onClick={logout}>Déconnecter</button>
      </div>
      <button className="strava-import-btn" onClick={load}>Importer depuis Strava</button>

      {open && (
        <div className="strava-modal-backdrop" onClick={() => setOpen(false)}>
          <div className="strava-modal" onClick={(e) => e.stopPropagation()}>
            <div className="strava-modal-head">
              <h3>Importer depuis Strava</h3>
              <button className="route-info-close" onClick={() => setOpen(false)} aria-label="Fermer">✕</button>
            </div>

            {loading && <p className="strava-status">Récupération de tes activités…</p>}
            {error && <p className="strava-status error">{error}</p>}
            {!loading && !error && activities.length === 0 && (
              <p className="strava-status">Aucune activité avec tracé trouvée.</p>
            )}

            {!loading && !error && activities.length > 0 && (
              <>
                <div className="strava-list">
                  {activities.map((a) => {
                    const act = getActivity(mapStravaType(a.sport_type, a.type))
                    const date = new Date(a.date).toLocaleDateString('fr-FR')
                    return (
                      <label key={a.stravaId} className="strava-item">
                        <input
                          type="checkbox"
                          checked={selected.has(a.stravaId)}
                          onChange={() => toggle(a.stravaId)}
                        />
                        <span className="strava-item-dot" style={{ background: act.color }} />
                        <span className="strava-item-name" title={a.name}>{a.name}</span>
                        <span className="strava-item-meta">{a.distance} km · {date}</span>
                      </label>
                    )
                  })}
                </div>
                <div className="strava-modal-foot">
                  <span className="strava-count">{selected.size} sélectionné(s)</span>
                  <button
                    className="import-btn"
                    disabled={selected.size === 0}
                    onClick={importSelection}
                  >
                    Importer la sélection
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function StravaGlyph() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169" />
    </svg>
  )
}
