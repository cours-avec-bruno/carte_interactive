// Import en masse : développe les .zip / .gpx.gz et parse tous les GPX trouvés.
import { unzipSync, gunzipSync, strFromU8 } from 'fflate'
import { parseGpxString } from './gpxParser'

function baseName(path) {
  return path.split('/').pop() || path
}

/**
 * Développe une liste de fichiers (File[]) et parse tous les GPX.
 * Gère : .gpx, .gpx.gz, et .zip (contenant .gpx et/ou .gpx.gz).
 *
 * @param {FileList|File[]} fileList
 * @param {(count: number) => void} [onProgress] appelé avec le nb de parcours lus
 * @returns {Promise<{ results: Array, errors: string[] }>}
 *   results : objets { name, fileName, coordinates, distance, pointCount }
 */
export async function expandAndParse(fileList, onProgress) {
  const results = []
  const errors = []
  const files = Array.from(fileList)

  const push = (parsed, fileName) => {
    results.push({ ...parsed, fileName })
    onProgress?.(results.length)
  }

  for (const file of files) {
    const lower = file.name.toLowerCase()
    try {
      if (lower.endsWith('.zip')) {
        const buf = new Uint8Array(await file.arrayBuffer())
        const entries = unzipSync(buf)
        for (const [path, data] of Object.entries(entries)) {
          const p = path.toLowerCase()
          if (p.endsWith('/')) continue // dossier
          try {
            if (p.endsWith('.gpx')) {
              push(parseGpxString(strFromU8(data), baseName(path)), baseName(path))
            } else if (p.endsWith('.gpx.gz')) {
              const name = baseName(path).replace(/\.gz$/i, '')
              push(parseGpxString(strFromU8(gunzipSync(data)), name), name)
            }
            // autres formats (.fit, .tcx…) ignorés silencieusement
          } catch {
            errors.push(baseName(path))
          }
        }
      } else if (lower.endsWith('.gpx.gz')) {
        const buf = new Uint8Array(await file.arrayBuffer())
        const name = file.name.replace(/\.gz$/i, '')
        push(parseGpxString(strFromU8(gunzipSync(buf)), name), name)
      } else if (lower.endsWith('.gpx')) {
        push(parseGpxString(await file.text(), file.name), file.name)
      }
      // autres fichiers ignorés
    } catch {
      errors.push(file.name)
    }
  }

  return { results, errors }
}
