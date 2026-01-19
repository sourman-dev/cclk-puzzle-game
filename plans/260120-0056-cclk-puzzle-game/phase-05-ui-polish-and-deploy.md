# Phase 5: UI Polish & Deploy

```yaml
status: done
priority: medium
estimated_files: 4
depends_on: phase-04
completed: 2026-01-20
```

## Overview

Polish UI animations, responsive testing, và deploy lên GitHub Pages.

## Context Links

- [Phase 4: Game Logic](./phase-04-game-logic.md)
- [Brainstorm Report](../reports/brainstorm-260120-0056-cclk-puzzle-game.md)

## Tasks

### 1. Animations & Transitions

**Card Flip Animation** - đã có trong GameCard.vue, cần verify:
- Flip duration: 500ms
- Smooth 3D transform
- Backface hidden

**Button Feedback**:
- Active scale: 0.95
- Transition duration: 150ms
- Correct/Wrong color change

**Modal Transitions**:
- Fade in/out backdrop
- Scale up modal content

### 2. Mobile Responsiveness

**Test Checklist**:
- [ ] iPhone SE (375px) - smallest target
- [ ] iPhone 14 (390px)
- [ ] iPhone 14 Pro Max (428px)
- [ ] iPad Mini (768px)

**Key Breakpoints**:
```css
/* Mobile (default): 3 columns */
.card-grid { grid-template-columns: repeat(3, 1fr); }

/* Tablet+ (640px): 6 columns */
@media (min-width: 640px) {
  .card-grid { grid-template-columns: repeat(6, 1fr); }
}
```

**Touch Targets**:
- Minimum 44x44px cho tất cả buttons
- Answer buttons: min-h-[52px]
- Hint button: min-h-[44px]

### 3. Vite Config for GitHub Pages

Update `vite.config.ts`:

```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  base: '/cclk-puzzle-game/', // GitHub repo name
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false
  }
})
```

### 4. tsconfig.app.json Path Alias

Update `tsconfig.app.json`:

```json
{
  "extends": "@vue/tsconfig/tsconfig.dom.json",
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "types": ["vite/client"],
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    },
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true
  },
  "include": ["src/**/*.ts", "src/**/*.tsx", "src/**/*.vue"]
}
```

### 5. GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v2
        with:
          version: 9

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm

      - run: pnpm install
      - run: pnpm run build

      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - uses: actions/deploy-pages@v4
        id: deployment
```

### 6. PWA Manifest (Optional)

Create `public/manifest.json`:

```json
{
  "name": "Châm Cứu Lục Khí - Puzzle Game",
  "short_name": "CCLK Game",
  "description": "Puzzle game học Châm Cứu Lục Khí",
  "start_url": "/cclk-puzzle-game/",
  "display": "standalone",
  "background_color": "#111827",
  "theme_color": "#3b82f6",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

Update `index.html`:
```html
<link rel="manifest" href="/cclk-puzzle-game/manifest.json" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
```

### 7. Final Polish

**Favicon**:
- Replace `/public/vite.svg` with game icon
- Add apple-touch-icon

**Meta Tags** (already in index.html):
- viewport with viewport-fit=cover
- theme-color
- description

**Error Handling**:
- Graceful fallback if localStorage unavailable
- Console.warn instead of throwing

## Files to Create/Modify

| File | Action |
|------|--------|
| `vite.config.ts` | Update base path, add alias |
| `tsconfig.app.json` | Add path alias |
| `.github/workflows/deploy.yml` | Create for auto-deploy |
| `public/manifest.json` | Create for PWA (optional) |
| `index.html` | Add PWA meta tags |

## Todo List

- [ ] Update `vite.config.ts` with base path and alias
- [ ] Update `tsconfig.app.json` with path alias
- [ ] Create GitHub Actions workflow
- [ ] Test mobile responsiveness on iPhone
- [ ] Verify all touch targets ≥ 44px
- [ ] Test dark/light mode transitions
- [ ] Run `pnpm build` successfully
- [ ] Deploy to GitHub Pages
- [ ] Test live deployment

## Success Criteria

- [ ] `pnpm build` succeeds without errors
- [ ] Game works on iPhone Safari
- [ ] Touch targets comfortable to tap
- [ ] Theme toggle smooth
- [ ] Card flip animation smooth
- [ ] GitHub Pages deployment live
- [ ] All 6 levels accessible
- [ ] Progress saves between sessions

## Deploy Commands

```bash
# Local development
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Deploy (if using gh-pages package)
pnpm add -D gh-pages
# Add to package.json scripts: "deploy": "gh-pages -d dist"
pnpm deploy
```

## Post-Deploy Verification

1. Open `https://<username>.github.io/cclk-puzzle-game/`
2. Test on mobile browser
3. Verify localStorage works
4. Play through Level 1 completely
5. Check settings persist after reload
6. Test dark mode toggle
