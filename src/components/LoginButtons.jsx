import React from 'react'

export default function LoginButtons({ connectedAs, onConnect, onDisconnect }) {
  if (connectedAs) {
    return (
      <div className="login-connected">
        <span className="connected-badge">
          {connectedAs === 'strava' ? '🟠 Strava' : '🔵 OpenRunner'} connecté
        </span>
        <button className="btn-disconnect" onClick={onDisconnect}>
          Déconnexion
        </button>
      </div>
    )
  }

  return (
    <div className="login-buttons">
      <button
        className="btn-strava"
        onClick={() => onConnect('strava')}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169" />
        </svg>
        Se connecter avec Strava
      </button>
      <button
        className="btn-openrunner"
        onClick={() => onConnect('openrunner')}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        Se connecter avec OpenRunner
      </button>
    </div>
  )
}
