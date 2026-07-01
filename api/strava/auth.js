// GET /api/strava/auth → redirige vers la page d'autorisation Strava.
import { getRedirectUri } from '../_lib/strava.js'

export default function handler(req, res) {
  const clientId = process.env.STRAVA_CLIENT_ID
  if (!clientId) {
    res.status(500).send('STRAVA_CLIENT_ID manquant (variable d\'environnement).')
    return
  }

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: getRedirectUri(req),
    response_type: 'code',
    approval_prompt: 'auto',
    scope: 'activity:read_all',
  })

  res.writeHead(302, { Location: `https://www.strava.com/oauth/authorize?${params}` })
  res.end()
}
