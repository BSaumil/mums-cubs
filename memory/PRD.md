# Mums & Cubs — PRD / Memory

## Original ask
Greenfield Next.js site for "Mums & Cubs" — a Montessori + Vedic/Gurukul-inspired parenting & curriculum brand. P0 build was done on branch `claude/md-file-review-image-c0y6lu` (GitHub `BSaumil/mums-cubs`) and merged into this workspace's `main`.

## Architecture
- Next.js 16 (App Router) + React 19 + TypeScript + Tailwind v4, located at `/app/frontend` (relocated from repo root to match supervisor's `frontend` service).
- No backend needed by the app; a minimal FastAPI stub lives at `/app/backend` (health check only) purely to satisfy supervisor.
- Content is code-defined (no DB) in `/app/frontend/src/lib/content/*.ts`: `curriculum-areas.ts` (9 areas, 12 activities/27 steps), `materials.ts` (9 materials), `learning-frameworks.ts` (montessori/vedic/integrated), `home.ts`, `real-moments.ts`.

## What's been implemented (by date)
- **2026-09-07 (later)**: Synced second upstream update (`61e850c`) into `main` — resolved a large structural merge (upstream commits at repo root `src/`, our workspace at `frontend/src/`). Brought in: CI workflow, 50-post SEO blog hub, site search, ParentJournal, GrowthTracker, RhythmBuilder/RhythmTimeline, NewsletterSignup/DigestPreview, Five Elements grid, Whole-Child map, ThemeToggle (light/dark), official brand palette + real vector logo (`/brand/mums-cubs-logo-mark.svg`), SEO infra (sitemap/robots/manifest/opengraph). Manually merged conflicts in `BrandMark`, `parents/page.tsx`, `page.tsx`, `discover/[path]/page.tsx`, `rhythm/page.tsx` to preserve all our real-photo work. Added `allowedDevOrigins` to `next.config.ts` to fix blocked HMR/CSS on preview domain.
- **2026-09-07**: Synced/merged upstream `main` (P0 Next.js build) into workspace; restructured into `/app/frontend` + `/app/backend` for supervisor compatibility.
- **2026-09-07**: Replaced ALL placeholder SVG imagery with 20 real branded lifestyle photos supplied by user, mapped to exact content matches:
  - All 9 curriculum area heroes (practical-life, sensorial, language, mathematics, culture-science, mental-mathematics, sound-phonetics, nature, daily-rhythm) now use real photos.
  - Homepage hero (overview), Montessori/Vedic PathCards, several activity visuals (pouring, pink tower, sandpaper letters, golden beads, landform, nature walk, morning rhythm, chanting) updated.
  - Added `RealMomentsGallery` (20-photo grid) on homepage; added Pancha Mahabhuta tradition visual (philosophy + discover/vedic pages); Gratitude & Mindfulness visual on `/philosophy`; Character Development visual on `/parents`.
- **2026-09-07**: Generated 8 new brand-styled hero banners (Gemini image gen, matching official logo/palette) for previously text-only pages: `/discover`, `/discover/montessori`, `/discover/vedic` (v2), `/discover/integrated`, `/curriculum`, `/materials`, Buttoning Frame activity, and a "Join Our Community" banner (used on homepage CTA + `/parents`). Also added the real Daily Rhythm photo as hero on `/rhythm`.
- **2026-09-07**: Replaced placeholder nav/footer logo with real official logo (cropped from user-supplied brand guide) in `BrandMark.tsx` + generated real `favicon.ico`. Removed outdated "placeholder art" note from footer.

- **2026-09-07 (makeover)**: Fixed image-crop/legibility issues introduced by the new real photos: `CurriculumAreaPage` hero previously overlaid HTML title/badge text directly on top of branded photos that already had baked-in text, causing double-text collisions — restructured to the "banner above heading" pattern used elsewhere (no overlay). Softened aggressive crops sitewide: hub hero banners (`/discover`, `/curriculum`, `/materials`, `/discover/[path]`) went from `16/9→21/9` (heavy crop, cut off icon rows) to `square on mobile → 16/9 on desktop` (full image on mobile, gentle crop on desktop). `CurriculumAreaCard` grid thumbnail eased from `3/2` to `4/3`.

## Known gaps / not yet real photos
- Montessori's `sensorial` sound-cylinders material, `nature-collection-tray`, `wooden-abacus`, `rhythm-cards` materials — still placeholder SVGs (Materials Hub gallery).
- No dedicated Montessori hub page hero photo distinct from generated banner (reused generated banner only).

## Backlog / next
- Swap remaining material product-shot placeholders (9 materials) for real/generated photos.
- Interactive Five Elements grid, animated rhythm timeline, sound visualiser (P1, previously deferred by original build).
- Personalization/profiles, analytics (P2).
