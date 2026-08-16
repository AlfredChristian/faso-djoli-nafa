# Faso Djoli Nafa — Backend Django

Backend REST pour la PWA de coordination des dons de sang (Burkina Faso).
Construit pour matcher **exactement** les appels mockés dans `src/services/api.js` du frontend.

## Endpoints

| Frontend (mock) | Endpoint réel | Méthode |
|---|---|---|
| `registerDonor(data)` | `/api/donors/register/` | POST |
| `getMyProfile()` | `/api/donors/me/` | GET |
| `publishNeed(data)` | `/api/needs/` | POST |
| `getNeeds()` | `/api/needs/` | GET |

Les champs des réponses (`dernierDon`, `nombreDons`, `viesAidees`, etc.) sont
volontairement en camelCase pour matcher 1:1 ce que le frontend attend déjà.

## Installation

### 1. Prérequis
- Python 3.11+
- PostgreSQL installé et démarré

### 2. Créer la base de données PostgreSQL
```bash
psql -U postgres -c "CREATE DATABASE faso_djoli_nafa;"
```

### 3. Installer les dépendances
```bash
python -m venv venv
source venv/bin/activate  # Windows : venv\Scripts\activate
pip install -r requirements.txt
```

### 4. Configurer les variables d'environnement
```bash
cp .env.example .env
# Puis éditer .env avec tes identifiants PostgreSQL (DB_USER, DB_PASSWORD...)
```
Charge le `.env` avec `python-dotenv` en ajoutant ces 2 lignes en haut de
`config/settings.py` si ce n'est pas déjà fait :
```python
from dotenv import load_dotenv
load_dotenv()
```

### 5. Migrations
```bash
python manage.py makemigrations
python manage.py migrate
```

### 6. Créer un compte admin (pour l'interface Django Admin)
```bash
python manage.py createsuperuser
```

### 7. Lancer le serveur
```bash
python manage.py runserver
```
L'API est disponible sur `http://localhost:8000/api/`
L'admin Django sur `http://localhost:8000/admin/`

## Connecter le frontend

Dans `src/services/api.js`, remplace les fonctions mockées par de vrais appels `fetch` :

```javascript
const API_URL = "http://localhost:8000/api"

export async function registerDonor(data) {
  const res = await fetch(`${API_URL}/donors/register/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  return res.json()
}

export async function publishNeed(data) {
  const res = await fetch(`${API_URL}/needs/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  return res.json()
}

export async function getNeeds() {
  const res = await fetch(`${API_URL}/needs/`)
  return res.json()
}

export async function getMyProfile() {
  const res = await fetch(`${API_URL}/donors/me/`)
  return res.json()
}
```

## Ce qui n'est PAS encore fait (à prévoir ensuite)

- **Authentification** : `getMyProfile()` retourne actuellement le dernier
  donneur inscrit en base (pas de notion d'utilisateur connecté). Il faudra
  ajouter l'auth par téléphone + code SMS (Module manquant dans le cahier des
  charges) et lier ce endpoint à `request.user`.
- **Comptes hôpitaux avec validation admin** (`hopital` est actuellement un
  simple champ texte libre dans `BloodRequest`, pas un compte lié).
- **Module 3 — Moteur de compatibilité/alerte** : identification automatique
  des donneurs compatibles + éligibles + proches lors d'une publication de besoin.
- **Module 4 — Canal SMS** (Africa's Talking ou opérateur local).
- **Module 5 — PWA** : ce backend ne gère pas ça, c'est côté frontend
  (`vite-plugin-pwa`, déjà dans le `package.json`).

## Structure du projet

```
backend/
  config/          # settings, urls racine
  donors/          # modèle Donor, inscription, profil
  needs/           # modèle BloodRequest, publication/liste des besoins
  manage.py
  requirements.txt
  .env.example
```
