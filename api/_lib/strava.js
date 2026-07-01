// Helpers partagés pour les fonctions serverless Strava.
// Ce fichier commence par "_" : il est ignoré comme route mais importable.

const COOKIE = 'strava_session'
const MAX_AGE = 60 * 60 * 24 * 30 // 30 jours

/**
 * Décode un polyline encodé Google (format utilisé par Strava)
 * en une liste de [lat, lon].
 */
export function decodePolyline(str, precision = 5) {
  let index = 0
  let lat = 0
  let lng = 0
  const coordinates = []
  const factor = Math.pow(10, precision)

  while (index < str.length) {
    let shift = 0
    let result = 0
    let byte
    do {
      byte = str.charCodeAt(index++) - 63
      result |= (byte & 0x1f) << shift
      shift += 5
    } while (byte >= 0x20)
    lat += result & 1 ? ~(result >> 1) : result >> 1

    shift = 0
    result = 0
    do {
      byte = str.charCodeAt(index++) - 63
      result |= (byte & 0x1f) << shift
      shift += 5
    } while (byte >= 0x20)
    lng += result & 1 ? ~(result >> 1) : result >> 1

    coordinates.push([lat / factor, lng / factor])
  }
  return coordinates
}

/** Sérialise la session en cookie httpOnly sécurisé. */
export function serializeSession(session) {
  const val = Buffer.from(JSON.stringify(session)).toString('base64')
  return [
    `${COOKIE}=${val}`,
    'HttpOnly',
    'Secure',
    'SameSite=Lax',
    'Path=/',
    `Max-Age=${MAX_AGE}`,
  ].join('; ')
}

/** Cookie de suppression de session. */
export function clearSession() {
  return `${COOKIE}=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0`
}

/** Lit la session depuis les cookies de la requête. */
export function readSession(req) {
  const cookie = req.headers.cookie || ''
  const match = cookie
    .split(';')
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${COOKIE}=`))
  if (!match) return null
  try {
    const val = match.slice(COOKIE.length + 1)
    return JSON.parse(Buffer.from(val, 'base64').toString('utf8'))
  } catch {
    return null
  }
}

/**
 * Rafraîchit l'access token si expiré. Renvoie la session (éventuellement
 * mise à jour). Lève une erreur si le refresh échoue.
 */
export async function ensureFreshToken(session) {
  const now = Math.floor(Date.now() / 1000)
  if (session.expires_at && session.expires_at - 60 > now) return session

  const res = await fetch('https://www.strava.com/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: process.env.STRAVA_CLIENT_ID,
      client_secret: process.env.STRAVA_CLIENT_SECRET,
      grant_type: 'refresh_token',
      refresh_token: session.refresh_token,
    }),
  })
  if (!res.ok) throw new Error('refresh_failed')
  const data = await res.json()
  return {
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    expires_at: data.expires_at,
  }
}

/** URL de callback OAuth, dérivée de l'hôte de la requête. */
export function getRedirectUri(req) {
  const host = req.headers['x-forwarded-host'] || req.headers.host
  return `https://${host}/api/strava/callback`
}

/** URL racine de l'app, dérivée de l'hôte de la requête. */
export function getAppUrl(req) {
  const host = req.headers['x-forwarded-host'] || req.headers.host
  return `https://${host}/`
}
