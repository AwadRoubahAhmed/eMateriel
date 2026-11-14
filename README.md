# eMatériel — boutique en ligne de matériel électronique

Application e-commerce full stack réalisée pendant ma formation de développeur web et web mobile chez **Simplon.co**, et présentée devant un jury.

## Fonctionnalités

**Côté client**
- Catalogue de produits par catégories, fiche produit détaillée.
- Panier et création de commandes (commande + lignes de commande).
- Inscription, connexion et déconnexion.
- Formulaire de contact, FAQ, page « À propos ».
- Pages légales : mentions légales et politique de confidentialité.

**Côté administrateur**
- Tableau de bord protégé par rôle.
- Gestion complète des produits (ajout, modification, suppression) avec upload d'images.
- Gestion complète des catégories.

## Stack technique

| Couche | Technologies |
|---|---|
| Front-end | React 19, TypeScript, Vite 7 (React Server Components via `@vitejs/plugin-rsc`), React Router 7, CSS Modules |
| Formulaires | React Hook Form, validateurs maison |
| Back-end | Node.js, Express 5, TypeScript (tsx) |
| Bases de données | **MySQL** (produits, commandes, utilisateurs) et **MongoDB** (messages de contact) |
| Sécurité | Mots de passe hachés avec **Argon2**, JWT signé avec `jose` (expiration 2 h), middleware d'autorisation par rôle, garde de routes côté front |
| Fichiers | Upload d'images avec Multer |
| Tests | Vitest + Supertest (tests d'intégration de l'API), rapport de couverture |
| CI | GitHub Actions : installation, build, création d'une base MySQL de test, exécution des tests à chaque push |
| Environnement | Docker Compose (MySQL, MongoDB, Node), Biome |

## Architecture

### Back-end en couches

```
code/server/
├── core/          # configuration Express
├── router/        # routes REST : produits, catégories, commandes, lignes de commande,
│                  # moyens de paiement, avis, utilisateurs, rôles, contact, sécurité
├── controller/    # traitement des requêtes HTTP
├── repository/    # accès aux données (MySQL et MongoDB)
├── service/       # connexions MySQL / MongoDB, gestion des fichiers
└── middleware/    # vérification du JWT et des rôles
```

### Front-end

```
code/src/
├── pages/        # pages publiques et pages d'administration
├── components/   # composants réutilisables (navbar, produits, catégories, auth, admin…)
├── layouts/      # gabarits public / admin
├── services/     # appels à l'API, gestion du jeton
├── context/      # contexte d'authentification
└── utils/        # validateurs et messages d'erreur
```

### Modélisation des données

Base conçue avec la méthode Merise (dossier [`code/merise`](code/merise)).
Tables MySQL : `role`, `user`, `category`, `product`, `orders`, `line_order`, `payment_method`, `notice`.

## Lancer le projet en local

Prérequis : Docker et Docker Compose.

```bash
# 1. Démarrer MySQL, MongoDB et le conteneur Node
docker compose -f docker-compose.dev.yaml up -d

# 2. Créer la base MySQL et insérer les données de démonstration
docker compose -f docker-compose.dev.yaml exec mysql sh -c "mysql -uroot -proot < emateriel.dev.sql && mysql -uroot -proot emateriel_dev < insert.dev.sql"

# 3. Lancer l'API (port 3000)
docker compose -f docker-compose.dev.yaml exec node sh -c "npm install && npm run server"

# 4. Dans un autre terminal, lancer le front (port 5173)
docker compose -f docker-compose.dev.yaml exec node sh -c "npm run dev -- --host"
```

### Tests

```bash
npm run test           # tests d'intégration de l'API
npm run test:coverage  # avec rapport de couverture
```

Les tests utilisent une base dédiée (`emateriel_test`), créée automatiquement par la CI.

## Ce que ce projet m'a appris

- Concevoir une base relationnelle avec Merise, puis l'exploiter depuis une API en couches.
- Combiner une base SQL et une base NoSQL selon la nature des données.
- Sécuriser une application : hachage Argon2, JWT, autorisation par rôle.
- Mettre en place une intégration continue qui construit et teste le projet à chaque push.

## Auteur

**Awad Ahmed** — Développeur Full Stack · [LinkedIn](https://www.linkedin.com/in/awad-dev) · [GitHub](https://github.com/AwadRoubahAhmed)
