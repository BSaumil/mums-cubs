-- P0 lead capture schema. Run this once against DATABASE_URL before the
-- feature will report itself as configured. Written to be safe to re-run
-- (IF NOT EXISTS everywhere) and reversible (see the DROP statements at the
-- bottom, commented out — uncomment to roll back).

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS subscription_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  normalized_email TEXT NOT NULL,
  state TEXT NOT NULL CHECK (state IN ('pending', 'confirmed', 'unsubscribed')),
  purpose TEXT NOT NULL CHECK (purpose IN ('guide_delivery', 'marketing_digest')),
  consent_version TEXT NOT NULL,
  consent_at TIMESTAMPTZ NOT NULL,
  source TEXT NOT NULL,
  optional_age_band TEXT,
  optional_path TEXT,
  confirmed_at TIMESTAMPTZ,
  unsubscribed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- One row per email per purpose — a family can be on the marketing digest
-- and separately request a guide download without the two colliding.
CREATE UNIQUE INDEX IF NOT EXISTS subscription_requests_email_purpose_key
  ON subscription_requests (normalized_email, purpose);

CREATE TABLE IF NOT EXISTS scoped_tokens (
  token_hash TEXT PRIMARY KEY,
  request_id UUID NOT NULL REFERENCES subscription_requests(id) ON DELETE CASCADE,
  purpose TEXT NOT NULL CHECK (purpose IN ('confirm', 'unsubscribe')),
  expires_at TIMESTAMPTZ NOT NULL,
  used_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS scoped_tokens_request_id_idx ON scoped_tokens (request_id);

CREATE TABLE IF NOT EXISTS delivery_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id UUID NOT NULL REFERENCES subscription_requests(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('queued', 'sent', 'failed')),
  attempt_count INT NOT NULL DEFAULT 0,
  next_attempt_at TIMESTAMPTZ,
  provider_message_id TEXT,
  last_error_code TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS delivery_jobs_request_id_idx ON delivery_jobs (request_id);

-- Rollback (reversible per the directive's migration requirement):
-- DROP TABLE IF EXISTS delivery_jobs;
-- DROP TABLE IF EXISTS scoped_tokens;
-- DROP TABLE IF EXISTS subscription_requests;
