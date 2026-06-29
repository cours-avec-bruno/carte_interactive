// Parsing de fichiers GPX dans le navigateur (DOMParser)
import { totalDistance } from './distance'

/**
 * Lit un fichier GPX (File) et renvoie une promesse résolue avec :
 * { name, coordinates: [[lat, lon], ...], distance, pointCount }
 */
export function parseGpxFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      try {
        const result = parseGpxString(e.target.result, file.name)
        resolve(result)
      } catch (err) {
        reject(err)
      }
    }
    reader.onerror = () => reject(new Error('Impossible de lire le fichier.'))
    reader.readAsText(file)
  })
}

/**
 * Parse le contenu texte d'un GPX. Exporté pour les tests / réutilisation.
 */
export function parseGpxString(xmlString, fallbackName = 'Parcours') {
  const xml = new DOMParser().parseFromString(xmlString, 'application/xml')

  if (xml.querySelector('parsererror')) {
    throw new Error('Fichier GPX invalide (XML illisible).')
  }

  // On gère trkpt (track) et rtept (route) au cas où
  const pts = xml.querySelectorAll('trkpt, rtept')
  if (pts.length === 0) {
    throw new Error('Aucun point GPS trouvé dans ce fichier GPX.')
  }

  const coordinates = Array.from(pts).map((pt) => [
    parseFloat(pt.getAttribute('lat')),
    parseFloat(pt.getAttribute('lon')),
  ])

  const name =
    xml.querySelector('trk > name, rte > name, metadata > name')?.textContent?.trim() ||
    fallbackName.replace(/\.gpx$/i, '')

  return {
    name,
    coordinates,
    distance: totalDistance(coordinates),
    pointCount: coordinates.length,
  }
}
