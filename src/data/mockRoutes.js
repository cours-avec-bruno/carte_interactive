// Circuits fictifs par région et activité
// Chaque circuit contient : nom, distance (km), dénivelé (m), type, tracé (coordonnées lat/lon)

export const mockRoutes = {
  'Auvergne-Rhône-Alpes': {
    velo: [
      {
        id: 'ara-v1',
        name: 'Tour du Vercors',
        distance: 92,
        elevation: 1840,
        type: 'vélo',
        color: '#e94560',
        path: [
          [45.05, 5.53], [45.08, 5.48], [45.12, 5.41], [45.18, 5.38],
          [45.22, 5.43], [45.19, 5.52], [45.13, 5.58], [45.07, 5.60], [45.05, 5.53],
        ],
      },
      {
        id: 'ara-v2',
        name: 'Montée de l\'Alpe d\'Huez',
        distance: 14,
        elevation: 1120,
        type: 'vélo',
        color: '#f77f00',
        path: [
          [45.06, 6.06], [45.08, 6.05], [45.10, 6.04], [45.12, 6.04],
          [45.13, 6.05], [45.15, 6.06],
        ],
      },
    ],
    course: [
      {
        id: 'ara-c1',
        name: 'Berges du Rhône – Lyon',
        distance: 12,
        elevation: 45,
        type: 'course',
        color: '#00b4d8',
        path: [
          [45.74, 4.83], [45.75, 4.84], [45.76, 4.85], [45.77, 4.86],
          [45.78, 4.85], [45.77, 4.83], [45.75, 4.82], [45.74, 4.83],
        ],
      },
    ],
    randonnee: [
      {
        id: 'ara-r1',
        name: 'GR5 – Belledonne',
        distance: 28,
        elevation: 1650,
        type: 'randonnée',
        color: '#06d6a0',
        path: [
          [45.28, 5.95], [45.30, 5.97], [45.32, 6.00], [45.35, 6.02],
          [45.37, 6.05], [45.35, 6.08], [45.32, 6.10],
        ],
      },
    ],
    trail: [
      {
        id: 'ara-t1',
        name: 'Trail du Pilat',
        distance: 35,
        elevation: 1200,
        type: 'trail',
        color: '#9b5de5',
        path: [
          [45.37, 4.68], [45.39, 4.70], [45.41, 4.72], [45.43, 4.71],
          [45.44, 4.69], [45.42, 4.66], [45.40, 4.65], [45.37, 4.68],
        ],
      },
    ],
  },

  'Bretagne': {
    velo: [
      {
        id: 'bre-v1',
        name: 'Tour de la Presqu\'île de Crozon',
        distance: 65,
        elevation: 580,
        type: 'vélo',
        color: '#e94560',
        path: [
          [48.24, -4.49], [48.22, -4.42], [48.20, -4.38], [48.17, -4.40],
          [48.15, -4.46], [48.17, -4.52], [48.21, -4.55], [48.24, -4.49],
        ],
      },
    ],
    course: [
      {
        id: 'bre-c1',
        name: 'Bords de Vilaine – Rennes',
        distance: 10,
        elevation: 30,
        type: 'course',
        color: '#00b4d8',
        path: [
          [48.09, -1.68], [48.10, -1.70], [48.11, -1.72], [48.12, -1.70],
          [48.11, -1.67], [48.10, -1.65], [48.09, -1.68],
        ],
      },
    ],
    randonnee: [
      {
        id: 'bre-r1',
        name: 'Sentier des Douaniers – GR34',
        distance: 22,
        elevation: 310,
        type: 'randonnée',
        color: '#06d6a0',
        path: [
          [48.68, -2.00], [48.67, -1.95], [48.65, -1.90], [48.63, -1.87],
          [48.61, -1.85], [48.60, -1.83],
        ],
      },
    ],
    trail: [
      {
        id: 'bre-t1',
        name: 'Trail des Monts d\'Arrée',
        distance: 42,
        elevation: 820,
        type: 'trail',
        color: '#9b5de5',
        path: [
          [48.37, -3.88], [48.39, -3.85], [48.38, -3.80], [48.36, -3.77],
          [48.33, -3.80], [48.34, -3.86], [48.37, -3.88],
        ],
      },
    ],
  },

  'Île-de-France': {
    velo: [
      {
        id: 'idf-v1',
        name: 'Véloscénie – Forêt de Rambouillet',
        distance: 55,
        elevation: 220,
        type: 'vélo',
        color: '#e94560',
        path: [
          [48.64, 1.82], [48.62, 1.85], [48.60, 1.90], [48.61, 1.95],
          [48.63, 1.99], [48.66, 1.97], [48.67, 1.92], [48.65, 1.87], [48.64, 1.82],
        ],
      },
    ],
    course: [
      {
        id: 'idf-c1',
        name: 'Bois de Vincennes',
        distance: 8,
        elevation: 20,
        type: 'course',
        color: '#00b4d8',
        path: [
          [48.83, 2.43], [48.84, 2.45], [48.83, 2.47], [48.82, 2.46],
          [48.82, 2.44], [48.83, 2.43],
        ],
      },
    ],
    randonnee: [
      {
        id: 'idf-r1',
        name: 'GR1 – Forêt de Fontainebleau',
        distance: 18,
        elevation: 180,
        type: 'randonnée',
        color: '#06d6a0',
        path: [
          [48.40, 2.70], [48.41, 2.73], [48.42, 2.76], [48.41, 2.80],
          [48.39, 2.82], [48.37, 2.80], [48.38, 2.75], [48.39, 2.72],
        ],
      },
    ],
    trail: [
      {
        id: 'idf-t1',
        name: 'Trail des 3 Forêts',
        distance: 30,
        elevation: 350,
        type: 'trail',
        color: '#9b5de5',
        path: [
          [48.57, 2.62], [48.59, 2.65], [48.60, 2.70], [48.58, 2.74],
          [48.55, 2.72], [48.54, 2.67], [48.57, 2.62],
        ],
      },
    ],
  },

  'Provence-Alpes-Côte d\'Azur': {
    velo: [
      {
        id: 'paca-v1',
        name: 'Route du Ventoux',
        distance: 21,
        elevation: 1610,
        type: 'vélo',
        color: '#e94560',
        path: [
          [44.17, 5.28], [44.19, 5.27], [44.21, 5.26], [44.23, 5.26],
          [44.17, 5.28],
        ],
      },
    ],
    course: [
      {
        id: 'paca-c1',
        name: 'Corniche Kennedy – Marseille',
        distance: 9,
        elevation: 60,
        type: 'course',
        color: '#00b4d8',
        path: [
          [43.27, 5.36], [43.28, 5.35], [43.29, 5.34], [43.30, 5.34],
          [43.31, 5.35], [43.30, 5.37], [43.29, 5.38],
        ],
      },
    ],
    randonnee: [
      {
        id: 'paca-r1',
        name: 'Calanques – Marseille à Cassis',
        distance: 20,
        elevation: 800,
        type: 'randonnée',
        color: '#06d6a0',
        path: [
          [43.21, 5.42], [43.20, 5.45], [43.19, 5.48], [43.20, 5.52],
          [43.22, 5.54], [43.23, 5.53],
        ],
      },
    ],
    trail: [
      {
        id: 'paca-t1',
        name: 'Ultra Trail des Écrins',
        distance: 50,
        elevation: 3200,
        type: 'trail',
        color: '#9b5de5',
        path: [
          [44.90, 6.35], [44.93, 6.38], [44.95, 6.42], [44.92, 6.47],
          [44.88, 6.45], [44.86, 6.40], [44.88, 6.36], [44.90, 6.35],
        ],
      },
    ],
  },

  'Occitanie': {
    velo: [
      {
        id: 'occ-v1',
        name: 'Canal du Midi à vélo',
        distance: 80,
        elevation: 95,
        type: 'vélo',
        color: '#e94560',
        path: [
          [43.61, 1.44], [43.56, 1.60], [43.50, 1.80], [43.44, 2.00],
          [43.38, 2.20], [43.32, 2.40], [43.28, 2.55],
        ],
      },
    ],
    course: [
      {
        id: 'occ-c1',
        name: 'Berges de la Garonne – Toulouse',
        distance: 11,
        elevation: 25,
        type: 'course',
        color: '#00b4d8',
        path: [
          [43.60, 1.44], [43.61, 1.43], [43.62, 1.42], [43.63, 1.43],
          [43.63, 1.45], [43.62, 1.46], [43.61, 1.45],
        ],
      },
    ],
    randonnee: [
      {
        id: 'occ-r1',
        name: 'Tour du Carlit – Pyrénées',
        distance: 32,
        elevation: 1450,
        type: 'randonnée',
        color: '#06d6a0',
        path: [
          [42.56, 1.93], [42.58, 1.96], [42.60, 1.99], [42.59, 2.03],
          [42.56, 2.04], [42.54, 2.01], [42.55, 1.96], [42.56, 1.93],
        ],
      },
    ],
    trail: [
      {
        id: 'occ-t1',
        name: 'Ut4M – Pyrénées Audoises',
        distance: 48,
        elevation: 2600,
        type: 'trail',
        color: '#9b5de5',
        path: [
          [42.72, 2.28], [42.74, 2.32], [42.76, 2.36], [42.74, 2.40],
          [42.71, 2.38], [42.69, 2.33], [42.71, 2.29], [42.72, 2.28],
        ],
      },
    ],
  },

  'Nouvelle-Aquitaine': {
    velo: [
      {
        id: 'naq-v1',
        name: 'La Vélodyssée – Côte Atlantique',
        distance: 70,
        elevation: 110,
        type: 'vélo',
        color: '#e94560',
        path: [
          [45.65, -1.15], [45.50, -1.12], [45.35, -1.10], [45.20, -1.08],
          [45.05, -1.06], [44.90, -1.07], [44.75, -1.10],
        ],
      },
    ],
    course: [
      {
        id: 'naq-c1',
        name: 'Quais de Bordeaux',
        distance: 13,
        elevation: 15,
        type: 'course',
        color: '#00b4d8',
        path: [
          [44.84, -0.57], [44.85, -0.56], [44.86, -0.56], [44.87, -0.57],
          [44.86, -0.59], [44.85, -0.59], [44.84, -0.58],
        ],
      },
    ],
    randonnee: [
      {
        id: 'naq-r1',
        name: 'GR10 – Pic du Midi d\'Ossau',
        distance: 25,
        elevation: 1380,
        type: 'randonnée',
        color: '#06d6a0',
        path: [
          [42.84, -0.44], [42.86, -0.42], [42.88, -0.40], [42.90, -0.42],
          [42.89, -0.46], [42.87, -0.48], [42.85, -0.46], [42.84, -0.44],
        ],
      },
    ],
    trail: [
      {
        id: 'naq-t1',
        name: 'Trail du Vignoble Bordelais',
        distance: 38,
        elevation: 490,
        type: 'trail',
        color: '#9b5de5',
        path: [
          [44.98, -0.28], [44.96, -0.24], [44.94, -0.21], [44.91, -0.22],
          [44.90, -0.26], [44.92, -0.30], [44.95, -0.31], [44.98, -0.28],
        ],
      },
    ],
  },
}

export const regions = Object.keys(mockRoutes)

export const activities = [
  { id: 'velo',      label: 'Vélo',       icon: '🚴', key: 'velo' },
  { id: 'course',    label: 'Course',     icon: '🏃', key: 'course' },
  { id: 'randonnee', label: 'Randonnée',  icon: '🥾', key: 'randonnee' },
  { id: 'trail',     label: 'Trail',      icon: '⛰️', key: 'trail' },
]

export function getRoutes(region, activity) {
  return mockRoutes[region]?.[activity] ?? []
}
