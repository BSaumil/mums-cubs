# Mums & Cubs — Known Blockers

Genuine external blockers, kept out of the codebase rather than faked. Per the project's content-integrity
rule, nothing here is worked around with fabricated content, a fake backend, or a UI that implies a
capability that doesn't exist. Each item below is either documented in-product (the UI says plainly what
is and isn't real) or requires a real-world resource this environment cannot produce.

## Content blockers

- **Production photography.** Every visual asset is a generated placeholder SVG (`public/images/placeholders/`),
  each carrying `isPlaceholder: true` in its `VisualAsset` record and labelled as such in the visual asset
  manifest. Resolving this needs a real photo shoot (or a licensed stock/illustration budget) and consent
  for any photos of real children, then a fixture-only swap — no component code depends on the placeholder
  pipeline.
- **Chanting / pronunciation audio.** The Vedic "Sound, Rhythm & Phonetics" curriculum area and its
  activities describe chanting and pronunciation practice in text only. An audio player or waveform
  visualiser needs real recordings from someone qualified to produce them — not a synthesized
  text-to-speech stand-in, which would misrepresent the practice.
- **Testimonials / reviews / research citations.** None exist anywhere on the site. Any claim of
  "families say…", a star rating, or a cited study would be fabricated. This will only change when real
  testimonials are collected with consent, or a specific, checkable citation is available.

## Business / infrastructure blockers

- **Email sending.** The newsletter waitlist (`/parents`) and digest preview save an email to
  `localStorage` only and say so explicitly ("nothing is sent anywhere yet"). Sending a real weekly digest
  needs an email service provider (transactional email API, list management, unsubscribe handling) — a
  real vendor decision and account, not something to stub with a fake "Subscribed!" message.
- **Materials marketplace links.** Materials are described and illustrated but not sold through this site.
  Linking "Buy this material" to a real product needs an actual retail relationship or affiliate agreement.
- **Referral program.** Would need a backend (unique codes, attribution, reward fulfillment) — no backend
  exists yet, and building one to game a proposed roadmap enhancement rather than a real need would be
  premature.
- **Premium membership / payments.** Needs a payment processor (Stripe or similar), real pricing decided by
  the business, and a subscription/entitlement backend. None of this exists; no paywall or "Upgrade" button
  should appear that isn't backed by real billing.
- **Hindi / professional translation.** Any bilingual content needs a professional or fluent-speaker
  translation pass, not machine translation presented as authoritative — especially for Vedic/Sanskrit
  terms, where a wrong gloss would misrepresent the tradition.
- **Expert partnerships, workshops, B2B relationships.** These require real people and real institutional
  relationships (guest educators, workshop hosts, school/daycare partnerships) that can't be created from
  inside this codebase.
- **Vercel deployment.** `mcp__Vercel__create_git_project` fails with "you need to install the GitHub
  integration first" — the Vercel GitHub App isn't installed for this GitHub account/org. Resolving this
  needs a human to install the Vercel GitHub App from the Vercel dashboard; deployment was explicitly set
  aside for this build pass per the active goal and can be retried once the App is installed.

## What is genuinely done, not blocked

Everything else in the roadmap that could be built honestly with real content and no external dependency —
JSON-LD/OG images/sitemap, global search, print stylesheets, light/dark theme, the reorderable rhythm
builder, the growth/milestone log, the Whole-Child map, the dual-track rhythm timeline, and the Five
Elements grid — is implemented and covered by the test suite, not stubbed.
