// Régions disponibles, avec un centre approximatif pour recentrer la carte
export const regions = [
  { id: 'auvergne-rhone-alpes',       name: 'Auvergne-Rhône-Alpes',        center: [45.5, 4.9] },
  { id: 'bretagne',                   name: 'Bretagne',                    center: [48.2, -2.9] },
  { id: 'ile-de-france',              name: 'Île-de-France',               center: [48.7, 2.4] },
  { id: 'provence-alpes-cote-dazur',  name: 'Provence-Alpes-Côte d\'Azur', center: [43.9, 6.1] },
  { id: 'occitanie',                  name: 'Occitanie',                   center: [43.7, 2.3] },
  { id: 'nouvelle-aquitaine',         name: 'Nouvelle-Aquitaine',          center: [44.8, -0.6] },
]

export const DEFAULT_REGION = regions[0].id

export function getRegion(id) {
  return regions.find((r) => r.id === id) ?? regions[0]
}
