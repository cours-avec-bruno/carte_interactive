# Architecture du projet

## Structure des dossiers

```
carte_interactive/
├── index.html              ← page principale, point d'entrée HTML
├── .gitignore
├── assets/
│   ├── css/
│   │   └── style.css       ← styles globaux (layout, sidebar, carte)
│   ├── js/
│   │   ├── app.js          ← coordination UI ↔ carte (point d'entrée JS)
│   │   ├── map.js          ← logique Leaflet (init, tracés, marqueurs)
│   │   └── gpx.js          ← parsing XML, calcul de distance (Haversine)
│   └── icons/              ← icônes personnalisées pour les marqueurs
└── data/
    └── gpx/                ← fichiers GPX (ignorés par git par défaut)
```

## Responsabilités des modules JS

| Fichier | Rôle |
|---------|------|
| `app.js` | Point d'entrée. Gère les événements UI (upload, clic, suppression) et coordonne les deux autres modules. |
| `map.js` | Encapsule tout ce qui touche à Leaflet : initialisation de la carte, ajout/suppression de polylignes, recentrage. |
| `gpx.js` | Parse les fichiers GPX (XML), extrait les coordonnées `trkpt`, calcule la distance totale via la formule de Haversine. |

## Bibliothèques utilisées

- **[Leaflet.js](https://leafletjs.com/)** v1.9.4 — affichage de la carte et des tracés
- **OpenStreetMap** — fond de carte (tuiles)

## Flux de données

```
Fichier GPX (File)
  → GPXParser.parse()          → { name, points[], distance }
  → MapController.addTrajet()  → { color, layer (Polyline) }
  → App.renderSidebar()        → mise à jour de la liste latérale
```
