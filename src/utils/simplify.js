// Simplification de trace GPS (Ramer-Douglas-Peucker), version itérative
// pour ne pas saturer la pile sur de longues traces.
// Objectif : réduire le nombre de points stockés sans altérer le rendu.

// epsilon en degrés : ~0.00008° ≈ 9 m. maxPoints : plafond dur après RDP.
const DEFAULT_EPSILON = 0.00008
const DEFAULT_MAX_POINTS = 2000

/** Distance perpendiculaire d'un point p au segment [a, b] (plan local). */
function perpendicularDistance(p, a, b) {
  const dx = b[1] - a[1]
  const dy = b[0] - a[0]
  if (dx === 0 && dy === 0) {
    return Math.hypot(p[1] - a[1], p[0] - a[0])
  }
  const t = ((p[1] - a[1]) * dx + (p[0] - a[0]) * dy) / (dx * dx + dy * dy)
  const tt = Math.max(0, Math.min(1, t))
  const projLon = a[1] + tt * dx
  const projLat = a[0] + tt * dy
  return Math.hypot(p[1] - projLon, p[0] - projLat)
}

/** Ramer-Douglas-Peucker itératif. */
function rdp(points, epsilon) {
  const n = points.length
  const keep = new Array(n).fill(false)
  keep[0] = true
  keep[n - 1] = true

  const stack = [[0, n - 1]]
  while (stack.length) {
    const [start, end] = stack.pop()
    let maxDist = 0
    let index = -1
    for (let i = start + 1; i < end; i++) {
      const d = perpendicularDistance(points[i], points[start], points[end])
      if (d > maxDist) {
        maxDist = d
        index = i
      }
    }
    if (maxDist > epsilon && index !== -1) {
      keep[index] = true
      stack.push([start, index], [index, end])
    }
  }
  return points.filter((_, i) => keep[i])
}

/**
 * Simplifie une trace [[lat, lon], ...].
 * Renvoie la trace originale telle quelle si elle est déjà courte.
 */
export function simplifyTrack(points, epsilon = DEFAULT_EPSILON, maxPoints = DEFAULT_MAX_POINTS) {
  if (!Array.isArray(points) || points.length <= 2) return points

  let simplified = rdp(points, epsilon)

  // Plafond dur : si encore trop de points, on décime régulièrement.
  if (simplified.length > maxPoints) {
    const step = Math.ceil(simplified.length / maxPoints)
    const last = simplified.length - 1
    simplified = simplified.filter((_, i) => i % step === 0 || i === last)
  }
  return simplified
}
