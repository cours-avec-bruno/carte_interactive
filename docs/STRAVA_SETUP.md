# Connexion Strava — guide de mise en place

La synchro Strava a besoin d'un **backend** (échange de token OAuth côté serveur).
GitHub Pages ne peut pas l'héberger : on utilise **Vercel**, qui sert à la fois le
frontend et les fonctions serverless du dossier `api/`.

> L'import de fichiers GPX continue de marcher partout, y compris sur GitHub Pages.
> Seule la synchro Strava nécessite le déploiement Vercel.

---

## 1. Créer une application Strava

1. Va sur https://www.strava.com/settings/api (connecté à ton compte Strava).
2. Crée une application :
   - **Application Name** : Carte Interactive (ou ce que tu veux)
   - **Category** : Visualizer
   - **Website** : l'URL de ton app (tu pourras la mettre à jour ensuite)
   - **Authorization Callback Domain** : `TON-APP.vercel.app`
     (⚠️ le **domaine seul**, sans `https://` ni chemin)
3. Note le **Client ID** et le **Client Secret**.

---

## 2. Déployer sur Vercel

1. Crée un compte sur https://vercel.com (connexion via GitHub, gratuit).
2. **Add New → Project**, importe le repo `carte_interactive`.
3. Vercel détecte Vite automatiquement (build `npm run build`, sortie `dist`).
4. Avant de déployer, ouvre **Environment Variables** et ajoute :

   | Name                   | Value              |
   | ---------------------- | ------------------ |
   | `STRAVA_CLIENT_ID`     | ton Client ID      |
   | `STRAVA_CLIENT_SECRET` | ton Client Secret  |

5. **Deploy**. Tu obtiens une URL du type `https://carte-interactive-xxx.vercel.app`.
6. Retourne dans les réglages Strava (étape 1) et vérifie que
   **Authorization Callback Domain** correspond bien à ce domaine `.vercel.app`.

---

## 3. Utilisation

1. Ouvre l'app sur son URL Vercel.
2. Clique **Se connecter avec Strava** → autorise l'accès.
3. Tu reviens sur l'app, clique **Importer depuis Strava**.
4. Coche les activités à importer → **Importer la sélection**.
   Les tracés apparaissent sur la carte et sont sauvegardés (localStorage).

---

## Notes techniques

- **Sécurité** : le `client_secret` reste côté serveur (variables Vercel), jamais
  dans le frontend ni le repo. La session Strava est stockée dans un cookie `httpOnly`.
- **Portée demandée** : `activity:read_all` (lecture des activités, y compris privées).
- **Tracés** : Strava renvoie un `summary_polyline` (tracé simplifié), décodé côté
  serveur en coordonnées GPS. C'est suffisant pour l'affichage ; ce n'est pas la
  trace haute résolution complète.
- **Volume** : jusqu'à ~500 activités récupérées (5 pages de 100). Ajustable dans
  `api/strava/activities.js`.
- **Développement local** : `npm run dev` ne sert PAS les fonctions `api/`.
  Pour tester le backend en local, utilise `vercel dev` (CLI Vercel) avec un fichier
  `.env` local (voir `.env.example`).
