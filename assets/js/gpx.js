/**
 * gpx.js — Parsing et extraction des données GPX
 */

const GPXParser = {

  /**
   * Parse un fichier GPX (File object) et retourne les données du trajet.
   * @param {File} file
   * @returns {Promise<{name: string, points: Array<[number, number]>, distance: number}>}
   */
  parse(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const xml = new DOMParser().parseFromString(e.target.result, 'application/xml');
          const trkpts = xml.querySelectorAll('trkpt');

          if (trkpts.length === 0) {
            reject(new Error('Aucun point de trajet trouvé dans ce fichier GPX.'));
            return;
          }

          const points = Array.from(trkpts).map(pt => [
            parseFloat(pt.getAttribute('lat')),
            parseFloat(pt.getAttribute('lon')),
          ]);

          const name = xml.querySelector('name')?.textContent?.trim()
            || file.name.replace('.gpx', '');

          resolve({
            name,
            points,
            distance: this._calculateDistance(points),
          });
        } catch (err) {
          reject(new Error('Fichier GPX invalide.'));
        }
      };

      reader.onerror = () => reject(new Error('Impossible de lire le fichier.'));
      reader.readAsText(file);
    });
  },

  /**
   * Calcule la distance totale d'un trajet en kilomètres.
   * @param {Array<[number, number]>} points
   * @returns {number}
   */
  _calculateDistance(points) {
    let total = 0;
    for (let i = 1; i < points.length; i++) {
      total += this._haversine(points[i - 1], points[i]);
    }
    return Math.round(total * 10) / 10;
  },

  /**
   * Formule de Haversine — distance en km entre deux coordonnées.
   * @param {[number, number]} a
   * @param {[number, number]} b
   * @returns {number}
   */
  _haversine([lat1, lon1], [lat2, lon2]) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1 * Math.PI / 180) *
      Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  },
};
