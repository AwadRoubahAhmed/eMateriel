# eMatériel — boutique en ligne de matériel électronique

Application e-commerce full stack réalisée pendant ma formation de développeur web et web mobile chez **Simplon.co**, puis finalisée pour une mise en ligne (sécurité, paiement, RGPD, référencement, accessibilité).

## Fonctionnalités

**Côté client**
- Catalogue par catégories et fiche produit (pages rendues côté serveur, visibles par les moteurs de recherche).
- Panier propre à chaque visiteur (gardé dans le navigateur, quantités limitées au stock).
- Commande avec adresse de livraison et **paiement par carte via Stripe Checkout** (mode test).
- Suivi des commandes dans « Mes commandes » (en attente, payée, expédiée, livrée, annulée).
- Inscription, connexion (session conservée), bouton œil sur les mots de passe.
- Formulaire de contact avec champ piège anti-robots, FAQ, page « À propos ».
- Pages légales : mentions légales, CGV, CGU, politique de confidentialité ; bandeau cookies conforme CNIL.

**Back-office administrateur** (`/admin`)
- Tableau de bord : commandes à expédier, chiffre d'affaires encaissé, stock faible, messages non lus.
- Commandes : liste, filtre par statut, détail, changement de statut (une annulation remet le stock).
- Produits : ajout, modification, suppression, image, **modification rapide du stock**.
- Catégories, utilisateurs (changement de rôle), messages de contact (lu / non lu, suppression).

## Stack technique

| Couche | Technologies |
|---|---|
| Front-end | React 19, TypeScript, Vite 7 (React Server Components via `@vitejs/plugin-rsc`), React Router 7.18, CSS Modules |
| Formulaires | React Hook Form (client) et **Zod** (validation côté serveur) |
| Back-end | Node.js 22, Express 5, TypeScript (tsx), un seul serveur pour l'API et le site |
| Base de données | **MySQL** (MariaDB compatible) |
| Paiement | Stripe Checkout (API HTTP, mode test uniquement) |
| Sécurité | mots de passe hachés (scrypt), JWT (`jose`, 2 h), rôles vérifiés par l'API, Helmet (CSP, HSTS), limitation des tentatives, HTTPS forcé, upload d'images contrôlé |
| Tests | Vitest + Supertest : 53 tests d'intégration de l'API sur une vraie base MySQL |
| CI | GitHub Actions : types, build, tests à chaque push et pull request |

## Architecture

```
code/
├── server/
│   ├── index.ts        # serveur unique : API + site (Vite en dev, build en prod)
│   ├── core/           # configuration Express (sécurité, erreurs)
│   ├── router/         # api_router (toutes les routes et leurs droits), seo_router (robots, sitemap)
│   ├── controller/     # traitement des requêtes
│   ├── repository/     # requêtes SQL (paramétrées)
│   ├── service/        # pool MySQL, JWT, Stripe
│   ├── middleware/     # vérification du JWT et du rôle
│   └── validation/     # schémas Zod
├── src/                # site React (pages, composants, layouts public / admin)
├── mysql/              # schema.sql + seed.sql (données de démonstration)
├── storage/images/     # images produits (hors du dossier public de Vite)
└── tests/              # tests de l'API
```

Base conçue avec la méthode Merise (dossier [`code/merise`](code/merise)).
Tables : `role`, `user`, `category`, `product`, `orders`, `line_order`, `payment_method`, `contact`.

Choix importants :
- **Le serveur recalcule tous les prix** à la commande : le navigateur n'envoie que les identifiants et les quantités.
- Le stock est vérifié et réservé dans une transaction (`SELECT … FOR UPDATE`), il est rendu si la commande est annulée.
- La commande passe en « payée » uniquement après vérification du paiement auprès de Stripe.

## Lancer le projet en local

Prérequis : Node.js 22 et un serveur MySQL 8 ou MariaDB 10.6+ (ou Docker : `docker-compose.dev.yaml`).

```bash
cd code
npm install

# 1. Variables d'environnement : copier les modèles puis remplir
cp .env.development.example .env.development   # JWT_SECRET, accès MySQL, clé Stripe de test
cp .env.test.example .env.test

# 2. Créer la base de développement (schéma + données de démonstration)
npm run db:reset

# 3. Lancer le site et l'API sur http://localhost:3000
npm run dev
```

Comptes de **test** créés par `mysql/test-users.sql` (chargé par `db:reset`, jamais en production) :
`admin@emateriel.test` / `Admin-Test-2026` et `client@emateriel.test` / `Client-Test-2026`.

Paiement de test : mettre une clé `sk_test_…` dans `STRIPE_SECRET_KEY`, puis payer avec la carte de test Stripe `4242 4242 4242 4242` (date future, CVC quelconque).

### Tests et vérifications

```bash
npm test            # tests de l'API (recrée la base emateriel_test)
npm run typecheck   # vérification TypeScript
npm run build       # build de production
```

### Production

```bash
VITE_SITE_URL=https://votre-domaine.fr npm run build
NODE_ENV=production npm start
```

Variables à définir chez l'hébergeur : `NODE_ENV=production`, `SITE_URL`, `MYSQL_*`, `JWT_SECRET` (32 caractères minimum), `STRIPE_SECRET_KEY`, `UPLOAD_DIR`, et au build `VITE_SITE_URL` (+ `VITE_CF_ANALYTICS_TOKEN` pour la mesure d'audience). Les informations légales de l'éditeur se complètent dans `code/src/data/legal.ts`.

Premier démarrage : avec `DB_AUTO_INIT=true`, le serveur crée les tables et le catalogue de démonstration si la base est vide, puis le compte administrateur défini par `ADMIN_EMAIL` / `ADMIN_PASSWORD`. Les comptes de test (`mysql/test-users.sql`) ne sont jamais chargés en production. Point d'entrée Node : `code/app.js`.

## Ce que ce projet m'a appris

- Concevoir une base relationnelle avec Merise, puis l'exploiter depuis une API en couches.
- Sécuriser une application : hachage des mots de passe (scrypt), JWT, autorisation par rôle côté serveur, validation Zod, prix recalculés côté serveur.
- Gérer un vrai parcours d'achat : panier, stock en transaction, paiement Stripe.
- Mettre en place une intégration continue qui vérifie les types, construit et teste le projet à chaque push.

## Auteur

**Awad Ahmed** — Développeur Full Stack · [LinkedIn](https://www.linkedin.com/in/awad-dev) · [GitHub](https://github.com/AwadRoubahAhmed)
