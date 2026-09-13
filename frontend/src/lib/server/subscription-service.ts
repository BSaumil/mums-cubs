import type { EmailProvider } from "@/lib/server/email-provider";
import type { SubscriptionStore } from "@/lib/server/subscription-store";
import {
  AGE_BAND_OPTIONS,
  CURRENT_CONSENT_VERSION,
  MAX_EMAIL_LENGTH,
  PATH_OPTIONS,
  normalizeEmail,
  type OptionalAgeBand,
  type OptionalPath,
  type SubscriptionPurpose,
} from "@/lib/server/subscription-types";

export interface SubscriptionServiceDeps {
  store: SubscriptionStore;
  email: EmailProvider;
  /** Absolute origin used to build confirm/unsubscribe links — see SITE_URL in src/lib/site-config.ts. */
  siteOrigin: string;
}

const CONFIRM_TOKEN_TTL_MS = 24 * 60 * 60 * 1000;
const UNSUBSCRIBE_TOKEN_TTL_MS = 180 * 24 * 60 * 60 * 1000;
const RESEND_COOLDOWN_SECONDS = 60;

export type CreateSubscriptionResult =
  | { kind: "pending_sent" }
  | { kind: "already_confirmed" }
  | { kind: "previously_unsubscribed" }
  | { kind: "rate_limited" }
  | { kind: "invalid_email" }
  | { kind: "invalid_input" }
  | { kind: "delivery_failed" };

export interface CreateSubscriptionRequest {
  email: string;
  purpose: SubscriptionPurpose;
  source: string;
  optionalAgeBand?: string;
  optionalPath?: string;
}

function isValidAgeBand(value: string | undefined): value is OptionalAgeBand {
  return value === undefined || (AGE_BAND_OPTIONS as readonly string[]).includes(value);
}

function isValidPath(value: string | undefined): value is OptionalPath {
  return value === undefined || (PATH_OPTIONS as readonly string[]).includes(value);
}

async function sendConfirmationEmail(
  deps: SubscriptionServiceDeps,
  requestId: string,
  email: string,
): Promise<boolean> {
  const token = await deps.store.createToken(requestId, "confirm", CONFIRM_TOKEN_TTL_MS);
  const confirmUrl = `${deps.siteOrigin}/api/subscribe/confirm/${token}`;
  const result = await deps.email.send({
    to: email,
    subject: "Confirm your Mums & Cubs email",
    text: `Confirm your email to finish signing up: ${confirmUrl}\n\nIf you didn't request this, you can ignore this message.`,
    html: `<p>Confirm your email to finish signing up:</p><p><a href="${confirmUrl}">${confirmUrl}</a></p><p>If you didn't request this, you can ignore this message.</p>`,
  });
  return result.ok;
}

/**
 * The full P0 lead-capture flow, with the store and email provider injected
 * so this can be exercised in tests with fakes — no network or database
 * required to verify the business rules (validation, non-enumeration,
 * duplicate/unsubscribe handling, rate limiting).
 */
export async function createSubscription(
  deps: SubscriptionServiceDeps,
  input: CreateSubscriptionRequest,
): Promise<CreateSubscriptionResult> {
  const email = normalizeEmail(input.email);
  if (!email || input.email.length > MAX_EMAIL_LENGTH) return { kind: "invalid_email" };
  if (!isValidAgeBand(input.optionalAgeBand) || !isValidPath(input.optionalPath)) return { kind: "invalid_input" };

  const existing = await deps.store.findByEmail(email, input.purpose);

  if (!existing) {
    const created = await deps.store.create({
      email,
      purpose: input.purpose,
      consentVersion: CURRENT_CONSENT_VERSION,
      source: input.source,
      optionalAgeBand: input.optionalAgeBand as OptionalAgeBand | undefined,
      optionalPath: input.optionalPath as OptionalPath | undefined,
    });
    const sent = await sendConfirmationEmail(deps, created.id, email);
    return sent ? { kind: "pending_sent" } : { kind: "delivery_failed" };
  }

  if (existing.state === "confirmed") {
    return { kind: "already_confirmed" };
  }

  if (existing.state === "unsubscribed") {
    // Never silently reactivate a duplicate submit — the caller must go through the explicit reconsent action.
    return { kind: "previously_unsubscribed" };
  }

  // existing.state === "pending": resend, but rate-limited.
  const secondsSinceLastTouch = await deps.store.secondsSinceLastTouch(existing.id);
  if (secondsSinceLastTouch < RESEND_COOLDOWN_SECONDS) {
    return { kind: "rate_limited" };
  }
  await deps.store.touch(existing.id);
  const sent = await sendConfirmationEmail(deps, existing.id, email);
  return sent ? { kind: "pending_sent" } : { kind: "delivery_failed" };
}

/** Explicit reconsent — the only path that may bring an unsubscribed address back to pending. */
export async function reconsentSubscription(
  deps: SubscriptionServiceDeps,
  input: { email: string; purpose: SubscriptionPurpose; source: string },
): Promise<CreateSubscriptionResult> {
  const email = normalizeEmail(input.email);
  if (!email) return { kind: "invalid_email" };

  const existing = await deps.store.findByEmail(email, input.purpose);
  if (!existing || existing.state !== "unsubscribed") {
    // Nothing to reconsent to — fall back to the normal flow so the response shape stays consistent.
    return createSubscription(deps, { email, purpose: input.purpose, source: input.source });
  }

  await deps.store.reactivateAsPending(existing.id);
  const sent = await sendConfirmationEmail(deps, existing.id, email);
  return sent ? { kind: "pending_sent" } : { kind: "delivery_failed" };
}

export type ConfirmResult = "confirmed" | "already_confirmed" | "invalid_or_expired" | "blocked_by_unsubscribe";

export async function confirmSubscription(deps: SubscriptionServiceDeps, rawToken: string): Promise<ConfirmResult> {
  const consumed = await deps.store.consumeToken(rawToken, "confirm");
  if (!consumed) return "invalid_or_expired";
  if (consumed.request.state === "unsubscribed") return "blocked_by_unsubscribe";
  if (consumed.alreadyUsed || consumed.request.state === "confirmed") return "already_confirmed";

  await deps.store.markConfirmed(consumed.request.id);
  return "confirmed";
}

export type UnsubscribeResult = "unsubscribed" | "already_unsubscribed" | "invalid_or_expired";

export async function unsubscribe(deps: SubscriptionServiceDeps, rawToken: string): Promise<UnsubscribeResult> {
  const consumed = await deps.store.consumeToken(rawToken, "unsubscribe");
  if (!consumed) return "invalid_or_expired";
  if (consumed.request.state === "unsubscribed") return "already_unsubscribed";

  await deps.store.markUnsubscribed(consumed.request.id);
  return "unsubscribed";
}

export function issueUnsubscribeUrl(deps: SubscriptionServiceDeps, requestId: string): Promise<string> {
  return deps.store
    .createToken(requestId, "unsubscribe", UNSUBSCRIBE_TOKEN_TTL_MS)
    .then((token) => `${deps.siteOrigin}/api/subscribe/unsubscribe/${token}`);
}
