// Calcul de distance géographique (formule de Haversine)

const EARTH_RADIUS_KM = 6371

/**
 * Distance en km entre deux points GPS [lat, lon].
 */
export function haversine([lat1, lon1], [lat2, lon2]) {
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2
  return EARTH_RADIUS_KM * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

/**
 * Distance totale d'une trace (liste de [lat, lon]), arrondie à 0.1 km.
 */
export function totalDistance(coordinates) {
  let total = 0
  for (let i = 1; i < coordinates.length; i++) {
    total += haversine(coordinates[i - 1], coordinates[i])
  }
  return Math.round(total * 10) / 10
}

function toRad(deg) {
  return (deg * Math.PI) / 180
}
