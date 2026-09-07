# Mums & Cubs — Build Report

## What existed before

Nothing. `bsaumil/mums-cubs` had zero commits and zero files. This is a greenfield P0 build, not a
migration or refactor of an existing product.

## What was built (P0, plus select P1 pieces)

- Next.js 16 + React 19 + TypeScript-strict + Tailwind v4 app, scaffolded via `create-next-app` and then
  fully built out.
- Full semantic design-token system (colour, radius, shadow, motion, typography) matching the directive's
  spec, wired through Tailwind v4's CSS-first `@theme`.
- A typed content model (`LearningFramework`, `CurriculumArea`, `Activity`, `VisualStep`, `Material`,
  `VisualAsset`, …) with real fixture data: 9 curriculum areas (5 Montessori, 4 Vedic), 12 activities with
  27 visual steps between them, 9 materials — every area/activity/material carries real, specific copy, not
  lorem ipsum.
- A generated, art-directed placeholder image pipeline (30 SVGs, five brand tones, a shared icon language)
  since no production photography or consent existed to draw on — a genuine external blocker, handled per
  the directive's Blocker Policy: documented, isolated, and never allowed to block implementation.
- 9 route templates, 32 total prerendered pages: homepage, discover hub + 3 path pages, curriculum hub +
  9 area pages, 10 activity pages, materials, rhythm, parents, philosophy.
- Reusable component library: `PhotoTray`, `CurriculumAreaCard`, `MaterialObjectCard`, `VisualBadge`, a
  custom `Icon` set, `ResponsiveArt` (the single `next/image` chokepoint), `GlobalHeader`/`MobileNav`/
  `VisualFooter`, `PathNavigator`, `CurriculumExplorer` (path + age filters), `MaterialGallery` (category
  filter).
- Content-integrity labelling (`ContextLabel`) surfaced in the actual UI via `/philosophy`, not just
  described in a doc.
- Accessibility: skip link, landmarks, real alt text, verified colour contrast (two token misuses caught
  and fixed), `aria-current`/`aria-pressed` used correctly instead of fake ARIA-tab roles, reduced-motion
  support, 44px minimum hit targets.
- Automated tests: 21 Vitest unit/data-integrity tests, 8 Playwright E2E tests covering path switching,
  curriculum/material filtering, activity navigation, 404 handling, skip link, and mobile nav.
- Full quality gate green: `eslint`, `tsc --noEmit`, `vitest run`, `playwright test`, `next build` (32/32
  routes prerender successfully).

## Architecture decisions worth flagging

- **Path state via URL, not client state.** "Pick Your Path" is `<Link href="/?path=montessori">`, read
  server-side via the page's `searchParams` prop. Shareable, no client JS, and the directive explicitly
  prefers server rendering over client state where both work equally well.
- **Filters are real toggle buttons, not fake tabs.** Curriculum/material filters use `aria-pressed` on
  plain `<button>`s. An earlier draft used `role="tablist"`/`role="tab"` for Pick Your Path, which was
  wrong (that's link navigation, not a tabpanel widget) and would have confused screen readers; caught and
  fixed during the accessibility pass rather than shipped.
- **One `next/image` chokepoint.** Every image in the product renders through `ResponsiveArt`, so the
  eventual swap from placeholder SVGs to production photography touches only content fixtures, never
  component code.
- **Frameworks are derived, not duplicated.** `learningFrameworks` filters `curriculumAreas` by paradigm
  rather than maintaining a second copy of the same data — one source of truth.

## Validation performed

| Check | Result |
|---|---|
| `npx eslint .` | Pass, 0 warnings |
| `npx tsc --noEmit` | Pass, 0 errors |
| `npx vitest run` | 21/21 tests pass (5 files) |
| `npx playwright test` | 8/8 tests pass (3 files) |
| `npx next build` | 32/32 routes build and prerender |
| Visual QA | Homepage, curriculum hub, curriculum detail, materials, discover/vedic, activity detail, rhythm, philosophy inspected at 375/768/1440px via real Chromium screenshots, not just "build passes" |
| Colour contrast | Computed WCAG contrast ratio for every token pairing used as text; 2 failing combinations found and fixed |

## Performance & accessibility notes

- Server Components by default; the only Client Components are `MobileNav`, `MaterialGallery`, and
  `CurriculumExplorer` — each for genuine local interaction (menu toggle, category/age/path filtering),
  matching the directive's list of acceptable client-side exceptions.
- Next's own dev-mode warnings were treated as real signal, not noise: an unmarked LCP image on the
  curriculum hub got `priority` on its first card; a `scroll-behavior: smooth` warning was resolved by
  adding `data-scroll-behavior="smooth"` to `<html>`. Both fixed, not suppressed.
- No client bundle audit tool (e.g. `@next/bundle-analyzer`) was run; bundle size was not numerically
  measured against the sub-2.5s LCP / sub-0.05 CLS budget, only reasoned about qualitatively (three small
  client islands, SVG placeholders instead of large photos for now).

## Key files changed

Everything under `src/`, `public/images/placeholders/`, `scripts/generate-placeholders.mjs`,
`e2e/`, `docs/`, plus config: `vitest.config.ts`, `vitest.setup.ts`, `playwright.config.ts`,
`package.json`.

## Tests executed

- `src/components/ui/VisualBadge.test.tsx`
- `src/components/cards/PhotoTray.test.tsx`
- `src/components/curriculum/CurriculumExplorer.test.tsx`
- `src/components/home/MaterialGallery.test.tsx`
- `src/lib/content/content-model.test.ts`
- `e2e/homepage.spec.ts`, `e2e/curriculum.spec.ts`, `e2e/navigation.spec.ts`

## Known external blockers

- No production photography or photography consent exists → every image is a clearly labelled placeholder
  (see asset manifest). This cannot be resolved from within this environment; it needs a real photo shoot
  or a licensed stock/illustration budget and sign-off from the product owner.

## Not built (P1/P2 — scoped out of this pass, not silently dropped)

Interactive Whole-Child mind map, animated dual-track Daily Rhythm timeline, Five Elements interactive
grid, sound/phonetics audio visualiser, customisable rhythm builder, saved-activity/observation-journal/
child-profile personalisation, analytics event wiring, and the full numeric type-scale tokens. None of
these were faked or stubbed with placeholder interactivity — `/rhythm` and `/philosophy` say plainly that
the customisable builder is "planned next" rather than pretending to be one.

## Definition of Done

**PARTIAL.** P0 (architecture, design system, homepage, curriculum hub, accessibility baseline,
performance basics, full QA/test/build gate, documentation) is complete and passes every applicable check
in Section 38. P1's interactive modules (mind map, rhythm timeline, elements grid, sound visualiser) and
all of P2 (personalisation) are not implemented — this was a scope decision made explicit with the user
before starting (see conversation), not a discovered limitation. They remain clearly documented as future
work rather than claimed as done.
