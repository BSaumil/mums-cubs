export type SubscriptionState = "pending" | "confirmed" | "unsubscribed";
export type SubscriptionPurpose = "guide_delivery" | "marketing_digest";

/** Small allowlist — never free text, per the P0 lead-capture spec. */
export const AGE_BAND_OPTIONS = ["18m-3", "3-6", "6-9", "9-12"] as const;
export type OptionalAgeBand = (typeof AGE_BAND_OPTIONS)[number];

export const PATH_OPTIONS = ["montessori", "vedic", "integrated"] as const;
export type OptionalPath = (typeof PATH_OPTIONS)[number];

export interface SubscriptionRequestRecord {
  id: string;
  normalizedEmail: string;
  state: SubscriptionState;
  purpose: SubscriptionPurpose;
  consentVersion: string;
  consentAt: string;
  source: string;
  optionalAgeBand: OptionalAgeBand | null;
  optionalPath: OptionalPath | null;
  confirmedAt: string | null;
  unsubscribedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

/**
 * Submitting a form for a given `purpose` IS the consent for that purpose —
 * there is currently only one signup form (the digest waitlist, purpose
 * "marketing_digest"), so there is no separate marketing checkbox to record.
 * If a "guide_delivery" form is built later with its own optional marketing
 * opt-in, that consent gets its own field here rather than overloading this
 * one — a checkbox for one purpose must never imply consent for the other.
 */
export interface CreateSubscriptionInput {
  email: string;
  purpose: SubscriptionPurpose;
  consentVersion: string;
  source: string;
  optionalAgeBand?: OptionalAgeBand;
  optionalPath?: OptionalPath;
}

export type TokenPurpose = "confirm" | "unsubscribe";

export interface ScopedTokenRecord {
  requestId: string;
  tokenHash: string;
  purpose: TokenPurpose;
  expiresAt: string;
  usedAt: string | null;
}

/** The current consent-copy version — bump this whenever the wording adults see changes. */
export const CURRENT_CONSENT_VERSION = "2026-09-13.v1";

export const MAX_EMAIL_LENGTH = 254;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizeEmail(raw: string): string | null {
  const trimmed = raw.trim().toLowerCase();
  if (trimmed.length === 0 || trimmed.length > MAX_EMAIL_LENGTH) return null;
  if (!EMAIL_PATTERN.test(trimmed)) return null;
  return trimmed;
}
