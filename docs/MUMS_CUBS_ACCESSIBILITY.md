# Mums & Cubs — Accessibility

Target: WCAG 2.2 AA. This is a status report of what was actually verified, not a checklist of intent.

## Verified

- **Skip link**: first focusable element on every page, jumps to `#main-content`. Covered by an E2E test
  (`e2e/navigation.spec.ts`).
- **Landmarks**: `<header>`, `<nav aria-label="Primary">`, `<main id="main-content">`, `<footer>` on every
  page via the root layout.
- **Heading hierarchy**: one `<h1>` per page (verified manually across all 9 route templates); sections use
  `<h2>`/`<h3>` in document order, not styled-to-look-like-a-heading `<div>`s.
- **Focus states**: a global `:focus-visible` outline (`--focus` / sky-500, 2px, 3px offset) applies to
  every interactive element by default; interactive cards additionally raise/darken on
  `group-focus-visible`, not only `group-hover`, so keyboard users see the same feedback as mouse users.
- **Alt text**: every `VisualAsset` has a specific, descriptive `alt` (e.g. *"Child using both hands to pour
  water between two small ceramic jugs"*, never `alt="child"`). Enforced going forward by a Vitest check
  (`content-model.test.ts`) that rejects any asset with a trivially short `alt`.
- **Colour contrast**: every token pairing actually used for text (badge text on its background, eyebrow
  labels, body copy) was computed against the WCAG contrast formula and confirmed ≥ 4.5:1 for small text /
  ≥ 3:1 for graphical icons. Two combinations specified loosely during design (a `saffron-600` eyebrow
  label at 3.67:1, a `sky-500` label/icon at ~2.8–3.0:1) failed this check during the pass and were
  corrected to `saffron-700` / `ink-700` before shipping — see the design system doc for the token
  rationale.
- **No colour-only meaning**: every paradigm indicator (`VisualBadge`) pairs colour + icon + text label.
- **Reduced motion**: `prefers-reduced-motion: reduce` collapses all transition/animation durations
  site-wide (`globals.css`), verified by reading the compiled CSS; no JS-driven motion exists yet to
  separately gate (the mind map / rhythm timeline / audio visualiser that would need it are not built —
  see build report).
- **Keyboard interaction**: Pick Your Path (real links, native keyboard support), curriculum/material
  filters (real `<button>`s with `aria-pressed`, native keyboard support, no custom widget/roving-tabindex
  needed because there's no fake tab semantics), mobile menu (button with `aria-expanded`/`aria-controls`).
  Covered by E2E tests that literally press Tab/Enter rather than just clicking.
- **Hit targets**: every interactive control (nav links, filter buttons, CTAs) is `min-h-11` (44px) per the
  directive's minimum.
- **Landmark correctness fix made during this pass**: Pick Your Path was initially marked up as
  `role="tablist"`/`role="tab"` even though it's plain navigation between URLs, not a tabpanel widget. Real
  ARIA tabs require roving-tabindex arrow-key navigation that wasn't implemented, so the fake roles would
  have been actively misleading to screen reader users. Fixed to a plain `<nav>` with `aria-current`.

## Not yet verified

- No automated axe/Lighthouse-CI accessibility scan is wired into the test suite — contrast and semantics
  were checked by direct calculation and manual review, not by an automated a11y linter. Adding
  `@axe-core/playwright` to the E2E suite would be the natural next step.
- No manual screen-reader pass (VoiceOver/NVDA) was performed — this environment has no way to drive one.
  Keyboard-only and programmatic (role/name/state) checks stand in for it here.
- Audio (sound/phonetics visualiser) accessibility requirements — transcript, visible controls, no
  autoplay — are moot because that P1 component wasn't built.
