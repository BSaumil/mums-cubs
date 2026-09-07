# Mums & Cubs — Content Model

Types live in `src/lib/types.ts`; they match the directive's model (`LearningFramework`, `CurriculumArea`,
`Activity`, `VisualStep`, `VisualAsset`, plus `Material`, `Principle`, `CulturalContext`) with one addition
(`Material` isn't in the original directive's type list but is required by the "Live Material Gallery" —
modelled the same way as everything else: typed, fixture-driven, no hard-coded JSX).

## Content-integrity labelling

Every `CurriculumArea` and `Activity` carries a `contextLabel: ContextLabel`
(`"Montessori Practice" | "Gurukul-Inspired Practice" | "Cultural / Philosophical Framework" |
"Mathematical Method" | "Modern Developmental Learning" | "Family Activity"`). `/philosophy` renders the
full label legend plus one worked example (Pancha Mahabhuta, explicitly framed as a cultural/philosophical
lens, not a scientific claim) — this is the mechanism that satisfies the directive's Section 1
content-integrity rule in the actual UI, not just in a design doc.

## Fixtures

| File | Contents |
|---|---|
| `curriculum-areas.ts` | 9 `CurriculumArea` objects (Practical Life, Sensorial, Language, Mathematics, Culture & Science, Mental Mathematics & Number Sense, Chanting/Rhythm & Phonetics, Nature Connection, Dinacharya/Daily Rhythm), each with real lead sentences, developmental domains, 1–2 activities with 2–3 `VisualStep`s each, a parent-observation sentence, and cross-links via `relatedAreas`. |
| `materials.ts` | 9 `Material` objects, each tied to a category used by the gallery filter (`practical`, `sensorial`, `language`, `math`, `nature`, `sound`, `rhythm`) and referenced by `materialIds` from the areas above. |
| `learning-frameworks.ts` | 3 `LearningFramework`s, derived (`.filter()`) from `curriculumAreas` rather than duplicated — there is exactly one source of truth per curriculum area. |
| `home.ts` | The homepage's two large hero `VisualAsset`s. |

## Data-integrity tests

`src/lib/content/content-model.test.ts` (part of the Vitest suite, run on every quality-gate pass) checks
that the fixtures stay internally consistent as they grow: every `materialIds` entry resolves, no duplicate
area/activity/material slugs or ids, activity steps are sequential, `relatedAreas` links resolve, and every
`VisualAsset.alt` is non-trivial (> 10 characters — a cheap proxy against `alt="child"`-style placeholders).

## Known simplification vs. the directive

`SkillTag` is used by `PhotoTray` as specified, but curriculum areas don't yet carry a distinct
`developmentalDomains`-to-`SkillTag` mapping beyond what's shown — skill tags currently come from an
activity's own `contextLabel`, not a richer taxonomy. Fine for 9 areas; would need a proper tag vocabulary
before this scales to dozens.
