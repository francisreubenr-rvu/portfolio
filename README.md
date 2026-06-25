# Francis Reuben R — Portfolio

Personal portfolio website. Next.js 16 · Tailwind CSS v4 · shadcn/ui · Framer Motion.
Static-exported for GitHub Pages.

---

## Dev

```bash
npm install
npm run dev        # http://localhost:3000
```

## Build

```bash
npm run build      # → out/ (static export)
```

## Deploy to GitHub Pages

**1. Set base path** (replace `portfolio` with your repo name):

```bash
NEXT_PUBLIC_BASE_PATH=/portfolio npm run build
# or shorthand:
npm run deploy:pages   # uses /portfolio — edit package.json if your repo name differs
```

**2. Push the `out/` folder:**

```bash
npx gh-pages -d out
```

**3. GitHub Settings → Pages → Source: `gh-pages` branch / root**

### GitHub Actions (`.github/workflows/deploy.yml`)

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: write
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: npm }
      - run: npm ci
      - run: npm run build
        env:
          NEXT_PUBLIC_BASE_PATH: /portfolio   # ← change to your repo name
      - uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```

---

## Project data

Edit `src/data/projects.ts` to update projects, links, descriptions, and tier classifications.
Replace all `"#"` link placeholders with real GitHub/demo URLs.

## Structure

```
src/
  app/
    globals.css       design tokens, typography, base styles
    layout.tsx        fonts (Syne + Inter + JetBrains Mono), metadata
    page.tsx          page composition
  components/
    Nav.tsx           scroll-aware navigation
    Hero.tsx          name, stats, CTA
    Projects.tsx      filterable grid (featured / standard / compact)
    FeaturedProject.tsx  large cards
    ProjectCard.tsx      medium cards
    CompactProject.tsx   dense list rows
    TechStack.tsx     grouped skill display
    Achievements.tsx  academic record + competition history
    Contact.tsx       footer, email, social links
  data/
    projects.ts       all project metadata with scores and tiers
PROJECTS.md           full project inventory and scoring breakdown
```
