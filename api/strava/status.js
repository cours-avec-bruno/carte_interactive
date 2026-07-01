// GET /api/strava/status → indique si une session Strava est active.
import { readSession } from '../_lib/strava.js'

export default function handler(req, res) {
  res.status(200).json({ connected: !!readSession(req) })
}
