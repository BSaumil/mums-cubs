# Mums & Cubs — Design System

## Tokens

All tokens live as CSS custom properties in `src/app/globals.css` (`:root`) and are re-exposed to
Tailwind utilities via `@theme inline` (Tailwind v4's CSS-first config — there is no `tailwind.config.ts`).
Colour, radius, shadow and semantic surface/text values match the directive's spec exactly
(`colors`, `radius`, `--shadow-*` blocks). Using them:

- `bg-wood-700`, `text-saffron-700`, `bg-surface-muted`, `text-[var(--text-secondary)]` — generated
  Tailwind utilities from the token names.
- `rounded-card`, `rounded-tray`, `rounded-panel`, `rounded-hero`, `rounded-capsule` — radius scale.
- `shadow-resting`, `shadow-tray`, `shadow-floating` — via `--shadow-*` CSS vars applied through
  `box-shadow: var(--shadow-tray)`-style utilities (arbitrary-value Tailwind classes).
- Motion durations/easing are CSS vars (`--duration-hover`, `--ease-standard`, …) consumed via
  Tailwind's arbitrary-value syntax, e.g. `duration-[var(--duration-hover)]`.

## Typography

- Display/editorial: **Fraunces** (`--font-fraunces`), applied to all headings via `@layer base`.
- Interface: **Inter** (`--font-inter`), the body default.
- No Devanagari type is used yet — no Sanskrit/Devanagari copy exists in this pass's content.

The directive's full numeric type scale (display-xl…micro) was not wired up as named utilities; headings
use Tailwind's default `text-*` scale (`text-4xl`, `text-3xl`, …) chosen to match the scale's intent. A
follow-up could promote the exact px/line-height pairs to named `@theme` font-size tokens if the team wants
pixel-exact parity with the spec table.

## Paradigm differentiation

Every paradigm-linked badge (`VisualBadge`) pairs three signals, never colour alone: a colour (wood/
montessori vs saffron/vedic vs leaf/integrated), a distinct icon (jug vs sun vs globe), and a text label.
Contrast for every badge combination was checked against WCAG AA (≥ 4.5:1 for the ~12px badge text) — see
`docs/MUMS_CUBS_ACCESSIBILITY.md`.

## Motion

`prefers-reduced-motion: reduce` collapses all animation/transition durations to ~0 globally
(`globals.css`). No parallax, confetti, or bouncing easing is used anywhere; the one approved easing curve
(`cubic-bezier(.22,.61,.36,1)`) is the default for hover/zoom/overlay transitions.

## Iconography

`src/components/icons/Icon.tsx` is a small hand-authored line-icon set (rounded caps/joins, 1.75 stroke,
minimal internal detail) covering the directive's core subjects actually needed by this build: leaf, heart,
group, sun, moon, jug, book, globe, wave, plus functional icons (menu, close, search, arrow, chevron). No
third-party icon library is used anywhere in the product UI.

## What intentionally deviates from the literal spec

- Tailwind v4's CSS-first theme replaces the `tailwind.config.ts` + `colors.ts` export shown in the
  directive — the token *values* are identical, only the mechanism differs, because the installed Tailwind
  version doesn't use a JS config by default.
- Organic asymmetric image corners (`30px 18px 30px 18px`) were not applied; every image uses the named
  radius scale uniformly. This is a minor polish item, not a structural gap.
