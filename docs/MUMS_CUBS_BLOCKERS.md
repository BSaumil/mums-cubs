# Mums & Cubs — Known Blockers

Genuine external blockers, kept out of the codebase rather than faked. Per the project's content-integrity
rule, nothing here is worked around with fabricated content, a fake backend, or a UI that implies a
capability that doesn't exist. Each item below is either documented in-product (the UI says plainly what
is and isn't real) or requires a real-world resource this environment cannot produce.

## Content blockers

- **Production photography — still open, and a prior claim that this was resolved was wrong.** A parallel
  build pass (commits from `emergent-agent-e1` / `github@emergent.sh`) replaced the placeholder SVGs with
  files under `frontend/public/images/real/`, and that pass's own notes (`memory/PRD.md`) log them as "20
  real branded lifestyle photos supplied by user." On inspection, these are AI-generated composite graphics
  — baked-in logos, taglines, icon badges, and in one case a visible typo ("Small Rindels Big Tomorrows").
  They are not photographs of real people, real homes, or real materials. The 2026-09-13 repair pass fixed
  the copy that claimed otherwise (the homepage gallery no longer says "Real Families, Real Moments" — see
  the P0 section below) and corrected the same content-integrity contrast bug this caused twice
  (`CurriculumCTA.tsx`, `parents/page.tsx`) where a heading in the brand's default sage-green rendered at
  1.06:1 contrast on the image's dark overlay. The underlying blocker is unchanged: no real, rights-cleared,
  text-free photography exists, and a business decision is needed on whether to commission real photography,
  license stock, or keep AI-generated illustration with permanently honest labelling.
- **Chanting / pronunciation audio.** The Vedic "Sound, Rhythm & Phonetics" curriculum area and its
  activities describe chanting and pronunciation practice in text only. An audio player or waveform
  visualiser needs real recordings from someone qualified to produce them — not a synthesized
  text-to-speech stand-in, which would misrepresent the practice.
- **Testimonials / reviews / research citations.** None exist anywhere on the site. Any claim of
  "families say…", a star rating, or a cited study would be fabricated. This will only change when real
  testimonials are collected with consent, or a specific, checkable citation is available.
- **"Seven Days of Small Discoveries" guide (P2 guided journey).** The repair directive references this
  guide as a resource to use "after editorial approval," but its content was not supplied in this session.
  The three-step Start Here journey (age band → optional path → one activity) can be built from data already
  in the codebase without it; a downloadable/printable guide artifact specifically cannot, without either
  the real guide text or editorial sign-off on a substitute.

## P0 lead capture — built, but gated on real credentials

The fake local-only waitlist (localStorage "Saved on this device," announced as if it were a real signup)
has been replaced. What exists now:

- **Honest fallback, live today.** `NewsletterSignup` renders "Email signup is not available yet. You can
  explore the activities now." with no form at all when the backend isn't configured — verified by screenshot
  and by `POST /api/subscribe` returning `503 {"code":"not_configured"}` in this exact environment (no
  `DATABASE_URL` or `RESEND_API_KEY` set here).
- **A complete, tested implementation, not yet turned on.** `frontend/src/lib/server/subscription-*` and
  `frontend/src/app/api/subscribe/**` implement the full double opt-in flow from the directive: normalized +
  bounded email validation, an allowlist for optional age band / path, high-entropy tokens (stored only as a
  SHA-256 hash, never raw), a 24h confirm token and a long-lived unsubscribe token, idempotent confirm/
  unsubscribe, non-enumerating responses, a resend cooldown, and — critically — a previously-unsubscribed
  address is never silently reactivated; only an explicit "yes, sign me up again" reconsent action can do
  that. 14 unit tests (`subscription-service.test.ts`) exercise this against a real in-memory implementation
  of the same store interface Postgres uses, so the business logic is verified without needing a database.
- **What's actually missing:**
  - `DATABASE_URL` — a Postgres connection string. `frontend/src/lib/server/migrations/001_subscription_requests.sql`
    has the schema (reversible — DROP statements included, commented out). Any Postgres works; Vercel
    Postgres/Neon/Supabase are the obvious fits given the app is deployed on Vercel.
  - `RESEND_API_KEY` and `EMAIL_FROM_ADDRESS` — the email side calls Resend's REST API directly (no SDK
    dependency). **This has not been exercised against the live API.** This development sandbox's outbound
    network is allowlisted and does not include `api.resend.com` or any SMTP port — confirmed by direct
    test (`curl` to Resend and to a test SMTP host both failed at the network layer, not the application
    layer). The code is written correctly against Resend's documented API shape, but verify it with a real
    key before relying on it.
  - `NEXT_PUBLIC_SITE_URL` — optional; defaults to the production domain named in the repair directive
    (`https://mumsncubs.com`) via `frontend/src/lib/site-config.ts`. Confirmation/unsubscribe links are
    always built from this trusted value, never from the incoming request's Host header (that would be a
    host-header-injection vector in an emailed link).
  - Rate limiting is minimal: a 60-second cooldown on resends, tracked via the request row's own
    `updated_at`. There is no IP-based limiting or CAPTCHA — acceptable for a low-traffic launch, worth
    revisiting if abuse shows up.

## Business / infrastructure blockers

- **Materials marketplace links.** Materials are described and illustrated but not sold through this site.
  Linking "Buy this material" to a real product needs an actual retail relationship or affiliate agreement.
- **Referral program.** Would need a backend (unique codes, attribution, reward fulfillment) — no backend
  exists yet, and building one to game a proposed roadmap enhancement rather than a real need would be
  premature.
- **Premium membership / payments (P2, explicitly not built).** The directive is direct about this: "Never
  grant paid access based solely on a frontend success URL," "complete sandbox purchase, webhook signature
  verification, replay/idempotency tests, entitlement assignment, failed renewal, cancellation, refund and
  accounting reconciliation" before activating anything commercial. None of that can be built or tested
  without a real (even if sandbox/test-mode) payment processor account. Needed before this can start:
  Stripe (or equivalent) test-mode secret key, publishable key, webhook signing secret, and an approved
  price/product configuration — plus a business decision on the actual price (the directive explicitly
  says AUD 24/month is a candidate, not an approved price to publish). No paywall, "Upgrade," or pricing
  page exists in the codebase, which is the correct state until this is resolved.
- **Hindi / professional translation.** Any bilingual content needs a professional or fluent-speaker
  translation pass, not machine translation presented as authoritative — especially for Vedic/Sanskrit
  terms, where a wrong gloss would misrepresent the tradition.
- **Expert partnerships, workshops, B2B relationships.** These require real people and real institutional
  relationships (guest educators, workshop hosts, school/daycare partnerships) that can't be created from
  inside this codebase.
- **A real Contact channel.** `/contact` now exists but honestly states that a monitored address isn't set
  up yet, rather than publishing an unmonitored one. Needs a business decision on what address/form to use.
- **Community.** The `/parents` panel now says "Community features are planned" instead of implying an
  active space with a "Join Our Community" CTA that led nowhere. Building a real one needs a moderated
  platform (or a third-party community tool) and a moderation policy — not something to stand up as an
  unmoderated form to satisfy a label.

## Deployment note

A previous session installed the Vercel GitHub App and successfully deployed this repository. Since then, a
parallel build pass restructured the repository from a root-level Next.js app into `frontend/` + `backend/`
+ `memory/` (see `AGENTS.md`/`memory/PRD.md`). **The existing Vercel project's Root Directory setting has not
been re-verified against this new layout** — deployment was out of scope for this repair pass per the
active goal and was not touched. Before relying on the current production deployment, confirm the Vercel
project's Root Directory is set to `frontend`.

## What is genuinely done, not blocked

JSON-LD/OG images (including a new homepage `opengraph-image.tsx` — the audit noted the homepage response
had none)/sitemap/robots (now environment-aware: non-production deployments return `disallow: /` instead of
advertising a sitemap), global search, print stylesheets, light/dark theme, the reorderable rhythm builder,
the growth/milestone log, the Whole-Child map, the dual-track rhythm timeline, the Five Elements grid, the
Sound-filter/material-taxonomy fix, the P0 honest-copy changes, and the P0 lead-capture backend (code +
tests complete, gated on real credentials as above) — all implemented and covered by the test suite, not
stubbed.
