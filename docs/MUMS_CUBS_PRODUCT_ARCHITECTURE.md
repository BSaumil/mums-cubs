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
/rhythm                     Daily rhythm example sequence
/parents                    Parent observation guidance + community CTA
/philosophy                 Content-integrity framework (context labels)
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

## Not built in this pass (see build report for the full list)

Interactive Whole-Child mind map, animated Daily Rhythm dual-track timeline, Five Elements interactive
grid, sound/phonetics audio visualiser, and all P2 personalisation (saved activities, child profiles,
progress visualisation). `/rhythm` and `/philosophy` exist with real, honest content but are intentionally
static rather than faking an interactive feature that wasn't built.
