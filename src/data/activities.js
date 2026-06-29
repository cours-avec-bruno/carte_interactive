// Activités disponibles, avec icône et couleur de trace associée.
// Couleurs pensées pour ressortir sur un fond de carte clair.
export const activities = [
  { id: 'velo',      label: 'Vélo',      icon: '🚴', color: '#3A7CA5' }, // bleu
  { id: 'course',    label: 'Course',    icon: '🏃', color: '#FC4C02' }, // orange
  { id: 'randonnee', label: 'Randonnée', icon: '🥾', color: '#2F5D50' }, // vert
  { id: 'trail',     label: 'Trail',     icon: '⛰️', color: '#A0522D' }, // terre
]

export const DEFAULT_ACTIVITY = activities[0].id

export function getActivity(id) {
  return activities.find((a) => a.id === id) ?? activities[0]
}
