// Activités disponibles, avec icône et couleur de tracé associée
export const activities = [
  { id: 'velo',      label: 'Vélo',      icon: '🚴', color: '#e94560' },
  { id: 'course',    label: 'Course',    icon: '🏃', color: '#00b4d8' },
  { id: 'randonnee', label: 'Randonnée', icon: '🥾', color: '#06d6a0' },
  { id: 'trail',     label: 'Trail',     icon: '⛰️', color: '#f9a826' },
]

export const DEFAULT_ACTIVITY = activities[0].id

export function getActivity(id) {
  return activities.find((a) => a.id === id) ?? activities[0]
}
