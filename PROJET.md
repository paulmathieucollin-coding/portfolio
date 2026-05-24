# Portfolio — paulmathieucollin.fr
## Instructions générales du projet

---

## Présentation

Portfolio personnel de Paul Mathieu Collin (photographe / vidéaste / directeur).
Site minimaliste, éditorial, inspiré du style emmiwu.com.

**URL live :** https://paulmathieucollin.fr
**URL Vercel :** https://portfolio-silk-psi-83.vercel.app
**GitHub :** https://github.com/paulmathieucollin-coding/portfolio
**Sanity Studio :** https://www.sanity.io/manage (projet : nt5y9ye7)

---

## Stack technique

| Outil | Usage |
|---|---|
| React 18 + TypeScript | Framework UI |
| Vite 6 | Build tool |
| TailwindCSS v4 | Styles utilitaires |
| Sanity CMS | Gestion du contenu (projets) |
| GSAP + ScrollTrigger | Animations |
| React Router v7 | Navigation SPA |
| Lenis | Smooth scroll |
| Geist (variable font) | Typographie (GeistSans + GeistMono) |
| Vercel | Hébergement / déploiement |
| GitHub | Dépôt de code |
| OVH | DNS du domaine paulmathieucollin.fr |

---

## Structure des dossiers

```
portfolio_final/
├── src/
│   ├── app/
│   │   ├── App.tsx                  ← Point d'entrée React + Router + CustomCursor
│   │   ├── components/
│   │   │   ├── Header.tsx           ← Navigation principale
│   │   │   ├── Footer.tsx           ← Pied de page
│   │   │   ├── Hero.tsx             ← Section hero de la homepage
│   │   │   ├── ProjectGrid.tsx      ← Grille des projets (fetch Sanity)
│   │   │   ├── VideoPlayer.tsx      ← Player vidéo (YouTube / Vimeo / MP4)
│   │   │   ├── GlassButton.tsx      ← Bouton glassmorphism (variantes black/white)
│   │   │   ├── CustomCursor.tsx     ← Curseur rond 5px blanc (mix-blend-mode: difference)
│   │   │   ├── SmoothScroll.tsx     ← Wrapper Lenis pour scroll fluide
│   │   │   └── figma/
│   │   │       └── ImageWithFallback.tsx  ← Image avec fallback
│   │   └── pages/
│   │       ├── Home.tsx             ← Page d'accueil
│   │       ├── ProjectDetail.tsx    ← Page détail d'un projet
│   │       └── Contact.tsx          ← Page contact
│   ├── lib/
│   │   ├── sanity.ts               ← Client Sanity (projectId hardcodé)
│   │   └── queries.ts              ← Requêtes GROQ
│   ├── types/
│   │   └── project.ts              ← Types TypeScript (SanityProject, SanityVideo...)
│   └── styles/
│       ├── fonts.css               ← @font-face Geist (depuis node_modules)
│       ├── theme.css               ← Variables CSS (couleurs, fonts)
│       └── index.css               ← CSS global (cursor: none, reset...)
├── studio/                         ← Sanity Studio (CMS)
│   ├── sanity.config.ts
│   └── schemas/
│       └── project.ts              ← Schéma du type "project"
├── vercel.json                     ← Config Vercel (outputDir + SPA rewrites)
├── .env                            ← Variables locales (non commitées)
└── .gitignore
```

---

## Palette de couleurs

| Nom | Valeur | Usage |
|---|---|---|
| Cream (fond) | `#f8f4ee` | Background global |
| Deep Black | `#111111` | Texte principal |
| Pure White | `#ffffff` | Texte sur fond sombre |
| Orange (CTA) | `#FF5500` | Boutons, accents, hover |
| Muted | `#efe9e0` | Fonds secondaires |
| Muted Foreground | `#6b6560` | Texte secondaire |

---

## Typographie

- **GeistSans** (variable) — tous les textes
- **GeistMono** — logo, labels, tags (police monospace)
- Source : package npm `geist`, chargé via `@font-face` dans `fonts.css`

---

## Sanity CMS

**Projet ID :** `nt5y9ye7`
**Dataset :** `production`
**URL de gestion :** https://www.sanity.io/manage/personal/project/nt5y9ye7

### Lancer le Studio en local
```bash
cd studio
npm run dev
# → http://localhost:3333
```

### Schéma d'un projet (type `project`)

| Champ | Type | Description |
|---|---|---|
| `title` | string | Nom du projet |
| `slug` | slug | URL du projet (ex: `lumiere-brute`) |
| `category` | string | `Photo`, `Vidéo` ou `Direction` |
| `year` | number | Année du projet |
| `mainImage` | image | Photo principale (hero) |
| `description` | text | Résumé court |
| `challenge` | text | Section "Enjeu" |
| `approach` | text | Section "Approche" |
| `gallery` | image[] | Galerie photos |
| `videos` | object[] | Vidéos (url + aspectRatio + titre) |

### Ajouter un projet
1. Aller sur https://www.sanity.io/manage → ouvrir le Studio
2. Cliquer "New document" → "Project"
3. Remplir les champs, publier

### CORS autorisés (Sanity)
- `http://localhost:3333`
- `http://localhost:5173`
- `https://portfolio-silk-psi-83.vercel.app`
- `https://paulmathieucollin.fr`
- `https://www.paulmathieucollin.fr`

Si tu ajoutes un nouveau domaine Vercel de preview, il faut l'ajouter ici :
```bash
cd studio
npx sanity cors add https://NOUVEAU-DOMAINE.vercel.app
```

---

## Développement local

```bash
cd portfolio_final
npm install
npm run dev
# → http://localhost:5173
```

Le fichier `.env` doit exister à la racine (déjà présent, non committé) :
```
VITE_SANITY_PROJECT_ID=nt5y9ye7
VITE_SANITY_DATASET=production
```
Note : ces valeurs sont aussi hardcodées dans `src/lib/sanity.ts` donc le `.env` n'est plus critique.

---

## Déploiement

Le déploiement est **automatique** : chaque `git push` sur la branche `main` déclenche un nouveau build sur Vercel.

```bash
# Depuis le dossier portfolio_final
git add .
git commit -m "description du changement"
git push origin main
# → Vercel rebuilde automatiquement (~1 min)
```

### Vercel — config
- **outputDirectory :** `dist`
- **Rewrites SPA :** `/(.*) → /` (pour que React Router fonctionne)
- **Env vars sur Vercel :** `VITE_SANITY_PROJECT_ID` et `VITE_SANITY_DATASET` (dans le dashboard Vercel → Settings → Environment Variables)

---

## DNS — OVH → Vercel

| Type | Nom | Valeur |
|---|---|---|
| A | `@` (apex) | `216.198.79.1` |
| CNAME | `www` | `ced4e4fdda7b61ba.vercel-dns-017.com` |

---

## Player Vidéo

Le composant `VideoPlayer` supporte 3 types d'URL :
- **YouTube** : `https://youtube.com/watch?v=...` ou `https://youtu.be/...`
- **Vimeo** : `https://vimeo.com/...`
- **MP4 direct** : toute autre URL (player natif avec contrôles glass)

Les formats d'aspect ratio disponibles : `16/9`, `9/16`, `4/3`, `1/1`

---

## Points importants à retenir

1. **Ne pas mettre de variables d'env dans le code Sanity** — le `projectId` est hardcodé dans `src/lib/sanity.ts` car Vite compile les env vars au build, et Vercel ne les avait pas.
2. **Le `.env` local est gitignored** — ne jamais le committer.
3. **React Router v7 = SPA** — le `vercel.json` avec les rewrites est obligatoire sinon les URLs directes donnent 404.
4. **Après chaque changement de schéma Sanity**, penser à mettre à jour `src/types/project.ts` et `src/lib/queries.ts` aussi.
5. **SSH GitHub** — la clé ed25519 est configurée sur ce Mac pour pousser sur `paulmathieucollin-coding/portfolio`.

---

## Commandes utiles

```bash
# Lancer le site en local
npm run dev

# Lancer le Studio Sanity
cd studio && npm run dev

# Builder pour vérifier que ça compile
npm run build

# Pousser une mise à jour en ligne
git add . && git commit -m "message" && git push origin main

# Voir les origines CORS Sanity
cd studio && npx sanity cors list

# Ajouter une origine CORS
cd studio && npx sanity cors add https://DOMAINE
```
