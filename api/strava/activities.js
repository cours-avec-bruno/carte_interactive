// GET /api/strava/activities → liste les activités de l'athlète et renvoie
// leurs tracés (polyline décodé), prêts à être importés côté frontend.
import {
  readSession,
  ensureFreshToken,
  serializeSession,
  decodePolyline,
} from '../_lib/strava.js'

const PER_PAGE = 100
const MAX_PAGES = 5 // jusqu'à ~500 activités

export default async function handler(req, res) {
  const session = readSession(req)
  if (!session) {
    res.status(401).json({ error: 'not_connected' })
    return
  }

  let fresh
  try {
    fresh = await ensureFreshToken(session)
  } catch {
    res.status(401).json({ error: 'refresh_failed' })
    return
  }
  if (fresh !== session) {
    res.setHeader('Set-Cookie', serializeSession(fresh))
  }

  const collected = []
  try {
    for (let page = 1; page <= MAX_PAGES; page++) {
      const r = await fetch(
        `https://www.strava.com/api/v3/athlete/activities?per_page=${PER_PAGE}&page=${page}`,
        { headers: { Authorization: `Bearer ${fresh.access_token}` } }
      )
      if (r.status === 429) {
        res.status(429).json({ error: 'rate_limited' })
        return
      }
      if (!r.ok) throw new Error('activities_fetch_failed')
      const batch = await r.json()
      if (!Array.isArray(batch) || batch.length === 0) break
      collected.push(...batch)
      if (batch.length < PER_PAGE) break
    }
  } catch {
    res.status(502).json({ error: 'strava_error' })
    return
  }

  const activities = collected
    .filter((a) => a.map && a.map.summary_polyline)
    .map((a) => ({
      stravaId: a.id,
      name: a.name,
      type: a.type,
      sport_type: a.sport_type,
      distance: Math.round((a.distance / 1000) * 10) / 10,
      date: a.start_date,
      coordinates: decodePolyline(a.map.summary_polyline),
    }))
    .filter((a) => a.coordinates.length > 1)

  res.status(200).json({ activities })
}
