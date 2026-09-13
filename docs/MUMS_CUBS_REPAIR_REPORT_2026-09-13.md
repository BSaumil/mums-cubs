# Mums & Cubs — Repair & Upgrade Report (2026-09-13)

Executed against `Mums_Cubs_Claude_Code_Repair_and_Upgrade_2026-09-12.md` in priority order. This did not
touch production; see **Deployment status** below.

## 0. Repository state at the start of this pass

Before any of the work below, `main` had moved since the last Claude Code session: a parallel build pass
from another AI agent (`emergent-agent-e1` / `github@emergent.sh`) had merged in that session's PR and
restructured the repository from a root-level Next.js app into `frontend/` + `backend/` (a FastAPI health
stub) + `memory/` (that agent's own PRD/notes), consistent with a different platform's supervisor layout.
All work below was done inside `frontend/`, on a new branch (`work/repair-p0-p1`) off the current `main`.

## 1. Reproduced findings and root causes

| # | Finding | Root cause | File(s) |
|---|---|---|---|
| 1 | `/materials` → Sound filter shows no cards, no explanation | `Material["category"]` type included `"sound"`, but zero fixture materials used it — Sound Cylinders was `"sensorial"` only | `src/lib/types.ts`, `src/lib/content/materials.ts`, `src/components/home/MaterialGallery.tsx` |
| 2 | Header "Join Our Community" led to a page with no real joining action | The panel was a static banner with no backing feature | `src/components/layout/GlobalHeader.tsx`, `MobileNav.tsx`, `src/app/parents/page.tsx` |
| 3 | Homepage/gallery claims "Real Families, Real Moments" | Images at `public/images/real/*.png` are AI-generated composite graphics (baked-in logos/taglines, one with a visible typo), not photographs; a parallel agent's own notes mislabeled them as real | `src/components/home/RealMomentsGallery.tsx` |
| 4 | Newsletter waitlist announces success but stores nothing real | `NewsletterSignup` wrote the email to `localStorage` and showed "Saved on this device" | `src/components/parents/NewsletterSignup.tsx` |
| 5 | Community panel heading unreadable (audit flagged, not measured) | `<h2>` on a dark image overlay inherited the site's default sage-green heading colour with no override — **measured contrast 1.06:1** (needs 4.5:1) | `src/app/parents/page.tsx` — and the identical bug, not previously flagged, in `src/components/home/CurriculumCTA.tsx` |
| 6 | No Contact/Privacy routes | Never built | — |
| 7 | Homepage response has no canonical link or `og:image` | `metadataBase` pointed at a placeholder domain (`mumsandcubs.example.com`) and no root `opengraph-image.tsx` existed | `src/app/layout.tsx` |

## 2. Changed files and resulting behaviour

**P0 — material taxonomy (audit-named defect #1):**
- `src/lib/types.ts` — added `tags?: string[]` to `Material`, distinct from `category`.
- `src/lib/content/materials.ts` — Sound Cylinders keeps `category: "sensorial"` (its real pedagogical
  home) and gains `tags: ["sound"]`.
- `src/components/home/MaterialGallery.tsx` — filter matches `category === active || tags?.includes(active)`;
  added an empty state ("No materials match this filter yet." + a real "View all materials" reset button)
  inside an `aria-live="polite"` region.
- Result: Sound → shows Sound Cylinders (labelled Sensorial); Sensorial still shows it too; an
  unreachable filter now shows the empty state and reset instead of a silent blank grid.

**P0 — lead capture (audit-named defect #2, the largest change):**
- New: `src/lib/server/subscription-types.ts`, `subscription-tokens.ts`, `subscription-store.ts`
  (interface + Postgres implementation), `subscription-service.ts` (the business logic, store/email
  injected for testability), `email-provider.ts` (Resend REST API via `fetch`, no SDK dependency),
  `migrations/001_subscription_requests.sql`.
- New: `src/app/api/subscribe/route.ts` (POST — create/resend/reconsent),
  `api/subscribe/confirm/[token]/route.ts`, `api/subscribe/unsubscribe/[token]/route.ts`.
- New: `src/app/subscribe/confirmed/page.tsx`, `subscribe/unsubscribed/page.tsx` (noindexed result pages).
- Changed: `src/components/parents/NewsletterSignup.tsx` — real fetch to `/api/subscribe`, every
  documented state handled (pending, already-confirmed, previously-unsubscribed-with-explicit-reconsent,
  rate-limited, delivery-failed); the honest fallback ("Email signup is not available yet. You can explore
  the activities now.") renders with **no form at all** when unconfigured.
  `src/app/parents/page.tsx` — checks `isPersistenceConfigured() && isEmailConfigured()` server-side and
  passes it down; surrounding copy no longer claims local-only storage.
- Result in this environment (no `DATABASE_URL`/`RESEND_API_KEY`): `POST /api/subscribe` returns
  `503 {"code":"not_configured"}`, verified live; the UI shows the honest fallback, verified by screenshot.

**P0 — honest CTAs and trust copy:**
- `GlobalHeader.tsx`, `MobileNav.tsx` — "Join Our Community" → "For Parents".
- `parents/page.tsx` — hero "Watch, don't direct." → "Observe first. Help when needed." with the
  directive's exact supporting copy; community banner → "Community features are planned"; contrast bug
  fixed (`text-white` added, 1.06:1 → 8.13:1, matching `CurriculumCTA.tsx`'s fix).
- `RealMomentsGallery.tsx` — "Real Families, Real Moments" → "Learning moments to explore" / "Illustrative
  scenes of hands-on learning and family routines."
- New: `src/app/privacy/page.tsx`, `src/app/contact/page.tsx` — accurate to current behaviour, no
  fabricated legal boilerplate, no bracketed placeholders; linked from a new "Company" footer column.

**P1 — accessibility:** contrast fixes above; verified keyboard operability + visible focus on the Sound
filter (Tab → Enter activates it, `outline-style: solid` present); verified `aria-live` regions; no
horizontal overflow at 360/390/768/1440px on `/`, `/materials`, `/parents`, `/curriculum` (measured, not
assumed).

**P1 — metadata:**
- New: `src/lib/site-config.ts` — `SITE_URL` (overridable via `NEXT_PUBLIC_SITE_URL`, defaults to
  `https://mumsncubs.com`, the domain named in the directive) and `isProductionDeployment()` (reads
  Vercel's own `VERCEL_ENV`).
- `layout.tsx`, `sitemap.ts`, `structured-data.ts` — now use `SITE_URL` instead of the placeholder domain.
- `robots.ts` — non-production deployments now return `disallow: /` with no sitemap link, instead of
  always allowing indexing.
- New: `src/app/opengraph-image.tsx` — the homepage had no OG image; added one in the same style as the
  existing per-post/per-area ones. (Caught and fixed a real Satori/`next/og` rendering error during this:
  a multi-child `<div>` needs an explicit `display` value or the build fails.)
- Added `alternates: { canonical }` to all 14 static routes' metadata and all 4 dynamic
  `generateMetadata` functions (blog posts, curriculum areas, activities, discover paths).
- API routes build confirm/unsubscribe links from `SITE_URL`, never from the request's own Host header —
  closes a host-header-injection vector in emailed links.

## 3. Tests executed and actual outcomes

| Check | Result |
|---|---|
| `npx tsc --noEmit` | Pass, 0 errors |
| `yarn lint` (eslint) | Pass, 0 errors (1 pre-existing unrelated warning in `curriculum-areas.ts`, not touched by this pass) |
| `yarn test` (vitest) | **67/67 pass** (53 pre-existing + 14 new `subscription-service.test.ts`, covering: invalid email rejected with nothing persisted; duplicate submit creates no second row and sends no second email; already-confirmed reports as such with no re-send; previously-unsubscribed never silently reactivated; explicit reconsent does reactivate; delivery failure reports failure, not success; confirm/unsubscribe are idempotent; an unsubscribed address blocks a stale confirm token) |
| `npx playwright test` | **13/13 pass** |
| `npm run build` | Pass — 157/157 routes build and prerender, including the new API routes and OG image |
| Manual verification | `POST /api/subscribe` → `503 not_configured` (curled live); honest-fallback UI screenshotted with zero form fields rendered; Sound filter screenshotted before/after; contrast measured numerically (not estimated) for both dark-panel headings before and after; keyboard activation of the Sound filter confirmed via Playwright; no horizontal overflow measured at 360/390/768/1440px |
| **Not executable here** | The Resend HTTP call and any real Postgres connection — this sandbox's outbound network is allowlisted and does not reach `api.resend.com` or any SMTP host (confirmed by direct `curl`/TCP test, not assumed). The business logic these wrap is covered by the unit tests above using a real in-memory implementation of the same store/email interfaces. |

## 4. Screenshots

Captured during this session (desktop viewport unless noted): `/materials` with Sound filter active
(Sound Cylinders shown, labelled Sensorial); `/parents` full page before and after the copy/contrast
changes; the community banner and homepage `CurriculumCTA` banner before/after the contrast fix; the
`NewsletterSignup` honest-fallback state with no form present; `/` and `/materials` at 360/390/768/1440px
(no overflow). Dark-theme screenshots were not re-captured in this pass; the theme toggle and dark-mode
tokens were unchanged by this work.

## 5. Environment variables, required services, and unresolved owner decisions

**Environment variable names only — no values, no secrets:**
- `DATABASE_URL` — Postgres connection string. Required for lead capture to activate.
- `RESEND_API_KEY`, `EMAIL_FROM_ADDRESS` — required for lead capture's email side to activate.
- `NEXT_PUBLIC_SITE_URL` — optional, defaults to `https://mumsncubs.com`.
- `VERCEL_ENV` — set automatically by Vercel; not something to configure manually.

**Required services:** a Postgres database (any provider); Resend (or a swap to another HTTP-based email
API — the `EmailProvider` interface makes this a one-file change).

**Unresolved owner decisions** (cannot be made from inside this codebase):
1. Photography: commission real photography, license stock, or keep AI-generated illustration with
   permanent honest labelling — a real reputational/brand decision for a children's product.
2. What address/form to use for `/contact`.
3. Whether/how to build a real community feature, and with what moderation policy.
4. Payment processor choice, approved pricing, and Stripe (or equivalent) test-mode credentials before any
   P2 payments work can start.
5. Whether to supply the "Seven Days of Small Discoveries" guide content (or approve a substitute) for the
   P2 guided journey's downloadable artifact.

## 6. Deployment status

**Not deployed.** All work is committed to branch `work/repair-p0-p1`, not merged to `main`. This is
deliberate, not an oversight: `main` is being actively developed on by a second, independent AI agent in
this same repository, and this pass touches security-relevant code (email token handling, the production
domain) and product-facing trust copy — exactly the kind of production change the directive requires
"actual user authorisation" for. A pull request should be opened for human review before merge.

A previous, separate Claude Code session did install the Vercel GitHub App and successfully deploy this
repository — but that was against the pre-restructure, root-level layout. The current Vercel project's Root
Directory has not been re-verified against the new `frontend/` layout (see `MUMS_CUBS_BLOCKERS.md`), and no
deployment was attempted in this session.

## 7. Rollback instructions

Nothing has been merged or deployed, so rollback is simply: do not merge `work/repair-p0-p1`, or delete the
branch. If it has already been merged by the time this is read: `git revert` the merge commit (a straight
revert is safe — this branch adds new files and makes scoped edits to existing ones; it does not delete or
rename anything another branch depends on). The one non-code change to be aware of on rollback: if
`DATABASE_URL`/`RESEND_API_KEY` were set and real signups were collected before a rollback, reverting the
code does not delete that data — the Postgres table (`subscription_requests`) would need its own decision
about retention, per the consent/retention policy the owner sets.
