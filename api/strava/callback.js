// GET /api/strava/callback → échange le code contre des tokens et pose le cookie.
import { serializeSession, getAppUrl } from '../_lib/strava.js'

export default async function handler(req, res) {
  const appUrl = getAppUrl(req)
  const { code, error } = req.query

  if (error || !code) {
    res.writeHead(302, { Location: `${appUrl}?strava=error` })
    res.end()
    return
  }

  try {
    const tokenRes = await fetch('https://www.strava.com/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: process.env.STRAVA_CLIENT_ID,
        client_secret: process.env.STRAVA_CLIENT_SECRET,
        code,
        grant_type: 'authorization_code',
      }),
    })
    if (!tokenRes.ok) throw new Error('token_exchange_failed')
    const data = await tokenRes.json()

    const session = {
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      expires_at: data.expires_at,
    }

    res.setHeader('Set-Cookie', serializeSession(session))
    res.writeHead(302, { Location: `${appUrl}?strava=connected` })
    res.end()
  } catch (e) {
    res.writeHead(302, { Location: `${appUrl}?strava=error` })
    res.end()
  }
}
