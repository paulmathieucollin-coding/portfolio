# Portfolio — Paul Mathieu Collin

Dossier actif : `/Users/pmc/Downloads/portfolio_final`

## Stack
React 18 · TypeScript · Vite · TailwindCSS v4 · Sanity CMS · GSAP · React Router v7

## Commandes utiles
```bash
npm run dev        # dev local → localhost:5173
npm run build      # build prod
git push origin main  # → Vercel rebuild automatique
cd studio && npm run dev  # Sanity Studio → localhost:3333
```

## Déploiement
- GitHub : `git@github.com:paulmathieucollin-coding/portfolio.git`
- Live : https://paulmathieucollin.fr
- Vercel : https://portfolio-silk-psi-83.vercel.app

## Sanity
- projectId : `nt5y9ye7` (hardcodé dans `src/lib/sanity.ts`)
- dataset : `production`

## Fichiers clés
| Fichier | Rôle |
|---|---|
| `src/app/components/ProjectShowcase.tsx` | Homepage complète (desktop + mobile) |
| `src/app/pages/ProjectDetail.tsx` | Page projet + "Voir aussi" |
| `src/lib/queries.ts` | GROQ queries Sanity |
| `src/types/project.ts` | Type SanityProject |
| `src/app/routes.ts` | Routes lazy + errorElement |
| `src/app/components/SmoothScroll.tsx` | Lenis (off sur mobile) |
| `src/app/components/ErrorBoundary.tsx` | Fallback erreurs React |

## Points importants
- GSAP : toujours vérifier `if (!ref.current) return` avant d'animer (crash mobile sinon)
- Lenis désactivé sur `window.matchMedia('(hover: none)')` (touch devices)
- CustomCursor désactivé sur mobile
- `FeaturedBackground` : orbe SVG 0→100% pendant chargement vidéo Mux
- Mobile home : featured screen → swipe haut → index panel (flex column, minHeight:0 requis)
- Pas de variable d'environnement — tout est hardcodé dans `src/lib/sanity.ts`

## Préférences
- Français uniquement
- Expliquer sans jargon (Paul n'est pas développeur)
- Autorisations permanentes : modifier le code, push git, publier
