// Calcul de la "progression exploratoire" : zones de la grille visitées.
// NOTE : ce n'est pas une mesure scientifique, juste un indicateur ludique
// basé sur le nombre de cellules de grille uniques traversées.

// Précision de la grille : 2 décimales ≈ ~1.1 km de côté.
const GRID_PRECISION = 2

/**
 * Transforme une coordonnée [lat, lon] en clé de cellule de grille.
 */
function cellKey([lat, lon]) {
  const gLat = lat.toFixed(GRID_PRECISION)
  const gLon = lon.toFixed(GRID_PRECISION)
  return `${gLat},${gLon}`
}

/**
 * Renvoie l'ensemble (Set) des cellules de grille uniques visitées
 * pour une liste de parcours.
 * @param {Array<{coordinates: Array<[number,number]>}>} routes
 * @returns {Set<string>}
 */
export function getVisitedGridCells(routes) {
  const cells = new Set()
  for (const route of routes) {
    for (const coord of route.coordinates) {
      cells.add(cellKey(coord))
    }
  }
  return cells
}

/**
 * Statistiques agrégées pour une liste de parcours.
 * @returns {{ routeCount, totalDistance, totalPoints, discoveredZones }}
 */
export function computeStats(routes) {
  const totalDistance = routes.reduce((sum, r) => sum + (r.distance || 0), 0)
  const totalPoints = routes.reduce((sum, r) => sum + (r.pointCount || 0), 0)
  const discoveredZones = getVisitedGridCells(routes).size

  return {
    routeCount: routes.length,
    totalDistance: Math.round(totalDistance * 10) / 10,
    totalPoints,
    discoveredZones,
  }
}
