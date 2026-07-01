// POST /api/strava/logout → supprime la session Strava.
import { clearSession } from '../_lib/strava.js'

export default function handler(req, res) {
  res.setHeader('Set-Cookie', clearSession())
  res.status(200).json({ ok: true })
}
