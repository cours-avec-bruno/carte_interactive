/**
 * app.js — Point d'entrée, coordination entre la carte et l'interface
 */

const App = (() => {

  // Stockage des trajets chargés : { id, name, distance, color, layer }
  const trajets = [];
  let nextId = 1;

  function init() {
    MapController.init();

    document.getElementById('gpx-upload').addEventListener('change', (e) => {
      Array.from(e.target.files).forEach(loadFile);
      e.target.value = ''; // reset input pour permettre de recharger le même fichier
    });
  }

  async function loadFile(file) {
    try {
      const trajet = await GPXParser.parse(file);
      const { color, layer } = MapController.addTrajet(trajet);

      const id = nextId++;
      trajets.push({ id, name: trajet.name, distance: trajet.distance, color, layer });
      renderSidebar();
    } catch (err) {
      alert(`Erreur : ${err.message}`);
    }
  }

  function removeTrajet(id) {
    const index = trajets.findIndex(t => t.id === id);
    if (index === -1) return;
    MapController.removeTrajet(trajets[index].layer);
    trajets.splice(index, 1);
    renderSidebar();
  }

  function renderSidebar() {
    const list = document.getElementById('gpx-list');

    if (trajets.length === 0) {
      list.innerHTML = '<p class="empty-msg">Aucun trajet chargé.</p>';
      return;
    }

    list.innerHTML = trajets.map(t => `
      <div class="trajet-item" data-id="${t.id}">
        <span class="dot" style="background:${t.color}"></span>
        <span class="name" title="${t.name}">${t.name}</span>
        <span style="font-size:0.75rem;color:#aaa">${t.distance} km</span>
        <button class="remove-btn" data-id="${t.id}" title="Supprimer">✕</button>
      </div>
    `).join('');

    list.querySelectorAll('.trajet-item').forEach(el => {
      el.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-btn')) return;
        const t = trajets.find(t => t.id === parseInt(el.dataset.id));
        if (t) MapController.focusTrajet(t.layer);
      });
    });

    list.querySelectorAll('.remove-btn').forEach(btn => {
      btn.addEventListener('click', () => removeTrajet(parseInt(btn.dataset.id)));
    });
  }

  return { init };
})();

document.addEventListener('DOMContentLoaded', () => App.init());
