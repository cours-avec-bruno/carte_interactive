/**
 * map.js — Initialisation de la carte Leaflet et gestion des tracés
 */

const MapController = (() => {

  let map = null;
  // Palette de couleurs pour distinguer les trajets
  const COLORS = ['#e94560', '#00b4d8', '#06d6a0', '#ffd166', '#f77f00', '#9b5de5'];
  let colorIndex = 0;

  function init() {
    map = L.map('map').setView([46.8, 2.3], 6); // centré sur la France

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);
  }

  /**
   * Ajoute un tracé GPX sur la carte.
   * @param {{name: string, points: Array<[number, number]>, distance: number}} trajet
   * @returns {{ color: string, layer: L.Polyline }}
   */
  function addTrajet(trajet) {
    const color = COLORS[colorIndex % COLORS.length];
    colorIndex++;

    const layer = L.polyline(trajet.points, {
      color,
      weight: 4,
      opacity: 0.85,
    }).addTo(map);

    // Marqueurs de départ / arrivée
    const start = trajet.points[0];
    const end = trajet.points[trajet.points.length - 1];

    L.circleMarker(start, { radius: 7, color, fillColor: '#fff', fillOpacity: 1, weight: 2 })
      .bindPopup(`<b>Départ</b><br>${trajet.name}`)
      .addTo(map);

    L.circleMarker(end, { radius: 7, color, fillColor: color, fillOpacity: 1, weight: 2 })
      .bindPopup(`<b>Arrivée</b><br>${trajet.name}<br>${trajet.distance} km`)
      .addTo(map);

    map.fitBounds(layer.getBounds(), { padding: [40, 40] });

    return { color, layer };
  }

  /**
   * Supprime un tracé de la carte.
   * @param {L.Polyline} layer
   */
  function removeTrajet(layer) {
    map.removeLayer(layer);
  }

  /**
   * Centre la vue sur un tracé.
   * @param {L.Polyline} layer
   */
  function focusTrajet(layer) {
    map.fitBounds(layer.getBounds(), { padding: [40, 40] });
  }

  return { init, addTrajet, removeTrajet, focusTrajet };
})();
