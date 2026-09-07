# Mums & Cubs — Visual Asset Manifest

## Status: 100% placeholder

No production photography exists yet (genuine external blocker — no real photography or consent was
provided to this session; see the Blocker Policy in the build report). Every image referenced by the
content fixtures is a generated, art-directed **placeholder**, clearly isolated from any future production
assets:

- All 30 files live under `public/images/placeholders/` — a separate directory from wherever production
  photography will land (e.g. `public/images/production/`), so nothing needs to move for either to coexist.
- Every corresponding `VisualAsset` fixture sets `isPlaceholder: true` and `type: "illustration"`, so a
  future data migration can find and replace every placeholder with `grep -r isPlaceholder src/lib/content`.
- No image bakes in caption text (the directive explicitly disallows unreadable generated labels) — each
  is a two-stop gradient in one of the five brand tones (wood/clay/leaf/saffron/sky) plus one line-icon
  from the shared icon language. This keeps them tasteful rather than looking like broken photography.
- The footer states outright: *"Illustrative imagery shown is temporary placeholder art pending production
  photography."*

## How they're generated

`scripts/generate-placeholders.mjs` is the single source of truth: a `MANIFEST` array of
`{ file, tone, icon, w, h }` entries, each rendered to a standalone SVG (gradient background + centred
icon) via a small template function. Run `node scripts/generate-placeholders.mjs` after editing the
manifest to regenerate every file. Aspect ratios follow the directive's photography direction: 4:5 for
activities, 3:2 for curriculum-area "environments", 1:1 for materials, 16:9 for hero imagery.

## Naming convention

`mc-{paradigm}-{category}-{subject}-{variant}-{size}.svg`, e.g.
`mc-montessori-mathematics-golden-beads-activity-960.svg`,
`mc-vedic-hero-sunrise-wide-1600.svg`.

## Full inventory (30 files)

| File | Used by |
|---|---|
| `mc-montessori-hero-pouring-wide-1600.svg` | Homepage hero (Montessori side) |
| `mc-vedic-hero-sunrise-wide-1600.svg` | Homepage hero (Vedic side), Discover → Integrated tile |
| `mc-montessori-practical-life-hero-1200.svg` | Practical Life area hero, glimpse gallery, path card |
| `mc-montessori-sensorial-hero-1200.svg` | Sensorial area hero, glimpse gallery |
| `mc-montessori-language-hero-1200.svg` | Language area hero, glimpse gallery |
| `mc-montessori-mathematics-hero-1200.svg` | Mathematics area hero, glimpse gallery |
| `mc-montessori-culture-science-hero-1200.svg` | Culture & Science area hero, glimpse gallery, Discover hub integrated tile |
| `mc-vedic-mental-mathematics-hero-1200.svg` | Mental Mathematics area hero |
| `mc-vedic-sound-phonetics-hero-1200.svg` | Chanting/Phonetics area hero |
| `mc-vedic-nature-hero-1200.svg` | Nature Connection area hero |
| `mc-vedic-daily-rhythm-hero-1200.svg` | Daily Rhythm area hero, glimpse gallery |
| `mc-montessori-practical-life-pouring-activity-960.svg` | "Pouring Water" activity + steps |
| `mc-montessori-practical-life-buttoning-activity-960.svg` | "Buttoning Frame" activity + steps |
| `mc-montessori-sensorial-pink-tower-activity-960.svg` | "Building the Pink Tower" activity + steps |
| `mc-montessori-language-sandpaper-letters-activity-960.svg` | "Tracing Sandpaper Letters" activity + steps |
| `mc-montessori-mathematics-golden-beads-activity-960.svg` | "Exploring Golden Beads" activity + steps |
| `mc-montessori-culture-science-landform-activity-960.svg` | "Exploring the Landform Tray" activity + steps |
| `mc-vedic-mental-mathematics-pattern-activity-960.svg` | "Seeing Number Patterns" activity + steps |
| `mc-vedic-sound-phonetics-chanting-activity-960.svg` | "Rhythmic Chanting Practice" activity + steps |
| `mc-vedic-nature-observation-activity-960.svg` | "Seasonal Nature Walk" activity + steps |
| `mc-vedic-daily-rhythm-morning-activity-960.svg` | "Building a Morning Rhythm" activity + steps |
| `mc-montessori-material-golden-beads-800.svg` | Golden Beads material card |
| `mc-montessori-material-pink-tower-800.svg` | Pink Tower material card |
| `mc-montessori-material-sandpaper-letters-800.svg` | Sandpaper Letters material card |
| `mc-montessori-material-sound-cylinders-800.svg` | Sound Cylinders material card |
| `mc-montessori-material-globe-800.svg` | Globe & Landform Tray material card |
| `mc-vedic-material-wooden-abacus-800.svg` | Wooden Abacus material card |
| `mc-shared-material-nature-tray-800.svg` | Nature Collection Tray material card |
| `mc-montessori-material-pouring-set-800.svg` | Pouring Set material card |
| `mc-vedic-material-rhythm-cards-800.svg` | Daily Rhythm Cards material card |

## Replacement checklist (when production photography arrives)

1. Shoot/source real photography matching the alt text and dominant tone already written for each asset
   (the alt text was written first, as a brief, not as a caption for the placeholder).
2. Drop files under `public/images/production/…` using the same naming convention.
3. Update each fixture's `src`, drop `isPlaceholder`, and set `type: "photo"`.
4. Re-run `npm run test` — the content-model integrity test will still pass unchanged (it only checks
   structure, not asset type), and no component code needs to change.
