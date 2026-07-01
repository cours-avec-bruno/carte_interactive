// Client frontend pour les fonctions serverless Strava (/api/strava/*).
// Tout passe par le même domaine (Vercel) : pas de CORS, session en cookie httpOnly.

/** URL vers laquelle rediriger pour lancer la connexion Strava. */
export function stravaConnectUrl() {
  return '/api/strava/auth'
}

/** Vrai si une session Strava est active. Ne lève jamais (renvoie false si pas de backend). */
export async function getStravaStatus() {
  try {
    const r = await fetch('/api/strava/status')
    if (!r.ok) return false
    const d = await r.json()
    return !!d.connected
  } catch {
    return false
  }
}

/** Récupère les activités Strava avec tracé. Lève 'not_connected' ou 'strava_error'. */
export async function fetchStravaActivities() {
  const r = await fetch('/api/strava/activities')
  if (r.status === 401) throw new Error('not_connected')
  if (!r.ok) throw new Error('strava_error')
  const d = await r.json()
  return d.activities
}

/** Déconnecte la session Strava. */
export async function stravaLogout() {
  try {
    await fetch('/api/strava/logout', { method: 'POST' })
  } catch {
    /* silencieux */
  }
}

/** Mappe un type d'activité Strava vers nos activités internes. */
export function mapStravaType(sportType, type) {
  const t = (sportType || type || '').toLowerCase()
  if (t.includes('trail')) return 'trail'
  if (t.includes('run')) return 'course'
  if (t.includes('hike') || t.includes('walk')) return 'randonnee'
  if (t.includes('ride') || t.includes('bike') || t.includes('cycl')) return 'velo'
  return 'velo'
}
