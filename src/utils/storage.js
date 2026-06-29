// Persistance des parcours dans le localStorage

const STORAGE_KEY = 'carte_interactive_routes'

/**
 * Récupère tous les parcours sauvegardés.
 * @returns {Array}
 */
export function loadRoutes() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch (err) {
    console.error('Lecture localStorage échouée :', err)
    return []
  }
}

/**
 * Écrase la liste complète des parcours.
 */
export function saveRoutes(routes) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(routes))
  } catch (err) {
    console.error('Écriture localStorage échouée :', err)
  }
}

/**
 * Ajoute un parcours et renvoie la nouvelle liste.
 */
export function addRoute(route) {
  const routes = loadRoutes()
  const next = [...routes, route]
  saveRoutes(next)
  return next
}

/**
 * Supprime un parcours par id et renvoie la nouvelle liste.
 */
export function removeRoute(id) {
  const next = loadRoutes().filter((r) => r.id !== id)
  saveRoutes(next)
  return next
}

/**
 * Vide complètement les parcours.
 */
export function clearRoutes() {
  localStorage.removeItem(STORAGE_KEY)
  return []
}

/**
 * Génère un identifiant unique pour un nouveau parcours.
 */
export function generateId() {
  return `route_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
}
