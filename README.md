# Francis Reuben R — Portfolio

Personal portfolio website built with Vite, React, TypeScript, Tailwind CSS v4, and HashRouter for GitHub Pages deployment.

## Stack

- **Vite** — build tool
- **React 19** — UI framework
- **TypeScript** — type safety
- **Tailwind CSS v4** — styling with `@theme` tokens
- **React Router** — HashRouter for SPA routing on GitHub Pages
- **Framer Motion** — restrained cinematic animations
- **Lucide React** — icons

## Project structure

```
src/
  main.tsx          — entry point with HashRouter
  App.tsx           — route definitions
  index.css         — Tailwind import + design tokens + keyframes
  components/
    Nav.tsx         — scroll-aware glassmorphic nav
    Hero.tsx        — parallax, scramble text, domain rotator, count-up stats
    Marquee.tsx     — infinite scrolling domain marquee
    Projects.tsx    — featured scroll + standard grid + compact list
    TechStack.tsx   — grouped skills with proficiency bars
    Achievements.tsx — academics + competitions
    Contact.tsx     — footer with CTA and social links
    Cursor.tsx      — custom cursor with magnetic hover
    ScrollProgress.tsx — top progress bar
  data/
    projects.ts     — all project metadata with scores and tiers
  lib/
    utils.ts        — shadcn utility (cn)
public/
  favicon.svg
  .nojekyll        — disables Jekyll processing on GitHub Pages
```

## Development

```bash
npm install
npm run dev        # http://localhost:5173
```

## Build

```bash
npm run build      # → dist/ (static export)
```

## Deploy to GitHub Pages

### GitHub Actions (`.github/workflows/deploy.yml`)

The included workflow builds and deploys automatically on every push to `main`.

1. Go to **Settings → Pages** in your repository
2. Set **Source** to "GitHub Actions"
3. Push to `main` — the workflow will build and deploy

### Manual deploy

```bash
npm run build
npx gh-pages -d dist
```

### Important: HashRouter

This site uses `HashRouter` because GitHub Pages does not support SPA route fallback. All routes are relative (`./`) to work from any subdirectory.

## Design direction

- **Base**: near-black (`#0c0b0a`)
- **Accent**: ember orange (`#e85c3a`)
- **Typography**: Inter (body), Syne (headings), JetBrains Mono (labels)
- **Motion**: parallax, scramble text, count-up, scroll-jack featured cards, hover glow, custom cursor
- **Responsive**: mobile-optimized with native horizontal scroll for featured cards, 2×2 stat grid, collapsible nav

## Credits

Design and code by Francis Reuben R.
