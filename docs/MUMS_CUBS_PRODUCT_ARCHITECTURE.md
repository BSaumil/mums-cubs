# Mums & Cubs — Product Architecture

## Starting point

The repository was empty (no commits, no source files) at the start of this build. Everything described
below is new. This document reflects **P0** (foundation and primary experience) as implemented, plus
selected pieces of **P1** where they were cheap to include correctly. It does not claim P1/P2 items that
were not built — see [`MUMS_CUBS_BUILD_REPORT.md`](./MUMS_CUBS_BUILD_REPORT.md) for the honest split.

## Stack

- Next.js 16 (App Router, React 19, TypeScript strict)
- Tailwind CSS v4 (CSS-first `@theme` tokens in `src/app/globals.css`, no `tailwind.config.ts`)
- `next/font/google` for Fraunces (display) and Inter (body)
- Vitest + Testing Library for component/unit tests
- Playwright for critical-flow E2E tests

## Routing

```
/                           Homepage
/discover                   Path-choice hub
/discover/[path]            montessori | vedic | integrated
/curriculum                 Curriculum hub (filterable grid)
/curriculum/[slug]          One curriculum area — activities, materials, parent notes
/activities/[slug]          One activity — step-by-step visual sequence
/materials                  Full material gallery, filterable by category
/blog                       SEO article hub — 50 posts, filterable by category
/blog/[slug]                One article, with a related-curriculum-area link where relevant
/rhythm                     Daily rhythm dual-track timeline + reorderable rhythm builder
/parents                    Parent observation guidance, growth/rhythm tool teasers, digest preview, newsletter waitlist, community CTA
/philosophy                 Content-integrity framework (context labels)
/whole-child                Whole-Child map — 8 developmental domains × curriculum areas (ARIA tabs + panel)
/elements                   Five Elements (Pancha Mahabhuta) interactive grid — ARIA tabs + panel
/growth                     Private, per-device growth/milestone log
/search                     Site-wide search across curriculum, materials, activities, blog
```

All dynamic routes (`curriculum/[slug]`, `activities/[slug]`, `discover/[path]`, `blog/[slug]`) use
`generateStaticParams` and are prerendered (SSG) from the content fixtures. The homepage is
server-rendered on demand because it reads the `?path=` search param. `sitemap.ts` and `robots.ts`
cover every static and dynamic route, including all 50 blog posts.

## Data flow

Everything renders from a single typed content model (`src/lib/types.ts`) populated by fixtures in
`src/lib/content/`:

- `curriculum-areas.ts` — 9 curriculum areas (5 Montessori, 4 Vedic), each with 1–2 activities, each
  activity with 2–3 visual steps.
- `materials.ts` — 9 materials referenced by `materialIds` from curriculum areas.
- `learning-frameworks.ts` — the 3 `LearningFramework`s (montessori/vedic/integrated), derived from the
  curriculum areas rather than duplicated.
- `home.ts` — the two homepage hero assets.

No page hard-codes curriculum content in JSX; every card, tray, and gallery maps over this data, so a new
curriculum area or activity is a fixture addition, not a new component.

## Component hierarchy actually built

```
RootLayout
├── GlobalHeader (BrandMark, primary nav, MobileNav, "Join Our Community" CTA)
├── main
│   ├── HomePage: HeroVisualSplit, PathCards, PathNavigator, DiscoverySection ×2,
│   │              GlimpseGallery, MaterialGallery, CurriculumCTA
│   ├── CurriculumHubPage: CurriculumExplorer (path + age filters) → CurriculumAreaCard grid
│   ├── CurriculumAreaPage: hero, PhotoTray grid (activities), MaterialObjectCard grid, parent note
│   ├── ActivityPage: hero, ordered VisualStep list, materials, observable outcomes, safety notes
│   ├── MaterialsPage: MaterialGallery
│   ├── DiscoverPage / DiscoverPathPage: PathCards, principle cards, CurriculumAreaCard grid
│   ├── RhythmPage, ParentsPage, PhilosophyPage
└── VisualFooter
```

Reusable primitives: `PhotoTray`, `CurriculumAreaCard`, `MaterialObjectCard`, `VisualBadge`, `Icon`
(custom line-icon set), `ResponsiveArt` (the one place every image passes through `next/image`).

## Client-side tools added since the P0 build

All localStorage-backed, per-device, no-backend — each says so in its own copy:

- **Rhythm builder** (`/rhythm`) — reorder, add, remove moments; resets to the illustrative example.
- **Growth notes** (`/growth`) — dated, domain-tagged observations; explicitly framed as not a medical or
  developmental screening tool.
- **Newsletter waitlist + digest preview** (`/parents`) — email saved on-device only; digest is a live
  preview of what a real send would contain, not a real subscription (no email service is wired up — see
  `MUMS_CUBS_BLOCKERS.md`).
- **Mark-as-read** on blog posts, **light/dark theme** (persisted, system-preference-aware, no
  hydration-mismatch flash via a `beforeInteractive` init script).

## Not built (see `MUMS_CUBS_BLOCKERS.md` for genuine external blockers)

Sound/phonetics audio visualiser (needs real chanting/pronunciation recordings — a genuine content
blocker) and all P2 personalisation beyond what's listed above (child profiles across devices, longitudinal
progress visualisation tied to a real account system). The Whole-Child mind map, Daily Rhythm dual-track
timeline, and Five Elements grid that earlier revisions of this document listed as "not built" are now
implemented — see the routing table above.
