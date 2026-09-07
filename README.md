# Mums & Cubs

A visual-first educational platform bridging Montessori and Vedic/Gurukul-inspired learning.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run dev          # dev server
npm run build        # production build
npm run start        # serve the production build
npm run lint         # eslint
npm run test         # vitest unit/data-integrity tests
npm run test:e2e     # playwright end-to-end tests (spins up its own dev server on :3200)
```

Regenerate the placeholder image set (see `docs/MUMS_CUBS_VISUAL_ASSET_MANIFEST.md`):

```bash
node scripts/generate-placeholders.mjs
```

## Documentation

- [`docs/MUMS_CUBS_PRODUCT_ARCHITECTURE.md`](./docs/MUMS_CUBS_PRODUCT_ARCHITECTURE.md)
- [`docs/MUMS_CUBS_DESIGN_SYSTEM.md`](./docs/MUMS_CUBS_DESIGN_SYSTEM.md)
- [`docs/MUMS_CUBS_CONTENT_MODEL.md`](./docs/MUMS_CUBS_CONTENT_MODEL.md)
- [`docs/MUMS_CUBS_VISUAL_ASSET_MANIFEST.md`](./docs/MUMS_CUBS_VISUAL_ASSET_MANIFEST.md)
- [`docs/MUMS_CUBS_ACCESSIBILITY.md`](./docs/MUMS_CUBS_ACCESSIBILITY.md)
- [`docs/MUMS_CUBS_BUILD_REPORT.md`](./docs/MUMS_CUBS_BUILD_REPORT.md)
