import { beforeEach, describe, expect, it } from "vitest";
import { hashToken } from "@/lib/server/subscription-tokens";
import {
  confirmSubscription,
  createSubscription,
  reconsentSubscription,
  unsubscribe,
  type SubscriptionServiceDeps,
} from "@/lib/server/subscription-service";
import type { ConsumedToken, SubscriptionStore } from "@/lib/server/subscription-store";
import type { EmailProvider, SendEmailInput, SendEmailResult } from "@/lib/server/email-provider";
import type {
  CreateSubscriptionInput,
  SubscriptionRequestRecord,
  TokenPurpose,
} from "@/lib/server/subscription-types";
import { CURRENT_CONSENT_VERSION } from "@/lib/server/subscription-types";

/**
 * A real in-memory implementation of the same interface the Postgres store
 * implements — not a mock of specific calls, so the service logic under
 * test is exercised exactly as it would be against a real database. This
 * needs no network or database and is what makes these tests possible
 * without the DATABASE_URL/RESEND_API_KEY this sandbox cannot reach anyway.
 */
class FakeSubscriptionStore implements SubscriptionStore {
  requests = new Map<string, SubscriptionRequestRecord>();
  tokens = new Map<string, { requestId: string; purpose: TokenPurpose; expiresAt: number; usedAt: number | null }>();
  private nextId = 1;

  async findByEmail(email: string, purpose: CreateSubscriptionInput["purpose"]) {
    for (const record of this.requests.values()) {
      if (record.normalizedEmail === email && record.purpose === purpose) return record;
    }
    return null;
  }

  async create(input: CreateSubscriptionInput) {
    const id = `req-${this.nextId++}`;
    const now = new Date().toISOString();
    const record: SubscriptionRequestRecord = {
      id,
      normalizedEmail: input.email,
      state: "pending",
      purpose: input.purpose,
      consentVersion: input.consentVersion,
      consentAt: now,
      source: input.source,
      optionalAgeBand: input.optionalAgeBand ?? null,
      optionalPath: input.optionalPath ?? null,
      confirmedAt: null,
      unsubscribedAt: null,
      createdAt: now,
      updatedAt: now,
    };
    this.requests.set(id, record);
    return record;
  }

  async markConfirmed(requestId: string) {
    const record = this.requests.get(requestId);
    if (record) {
      record.state = "confirmed";
      record.confirmedAt = new Date().toISOString();
      record.updatedAt = record.confirmedAt;
    }
  }

  async markUnsubscribed(requestId: string) {
    const record = this.requests.get(requestId);
    if (record) {
      record.state = "unsubscribed";
      record.unsubscribedAt = new Date().toISOString();
      record.updatedAt = record.unsubscribedAt;
    }
  }

  async reactivateAsPending(requestId: string) {
    const record = this.requests.get(requestId);
    if (record) {
      record.state = "pending";
      record.unsubscribedAt = null;
      record.confirmedAt = null;
      record.updatedAt = new Date().toISOString();
    }
  }

  async secondsSinceLastTouch(requestId: string) {
    const record = this.requests.get(requestId);
    if (!record) return Number.POSITIVE_INFINITY;
    return (Date.now() - new Date(record.updatedAt).getTime()) / 1000;
  }

  async touch(requestId: string) {
    const record = this.requests.get(requestId);
    if (record) record.updatedAt = new Date().toISOString();
  }

  async createToken(requestId: string, purpose: TokenPurpose, ttlMs: number) {
    const raw = `token-${this.nextId++}`;
    this.tokens.set(hashToken(raw), { requestId, purpose, expiresAt: Date.now() + ttlMs, usedAt: null });
    return raw;
  }

  async consumeToken(rawToken: string, purpose: TokenPurpose): Promise<ConsumedToken | null> {
    const entry = this.tokens.get(hashToken(rawToken));
    if (!entry || entry.purpose !== purpose || entry.expiresAt < Date.now()) return null;
    const request = this.requests.get(entry.requestId);
    if (!request) return null;
    const alreadyUsed = entry.usedAt !== null;
    if (!alreadyUsed) entry.usedAt = Date.now();
    return { request, alreadyUsed };
  }
}

class FakeEmailProvider implements EmailProvider {
  sent: SendEmailInput[] = [];
  nextResult: SendEmailResult = { ok: true, providerMessageId: "fake-1" };

  async send(input: SendEmailInput) {
    this.sent.push(input);
    return this.nextResult;
  }
}

let store: FakeSubscriptionStore;
let email: FakeEmailProvider;
let deps: SubscriptionServiceDeps;

beforeEach(() => {
  store = new FakeSubscriptionStore();
  email = new FakeEmailProvider();
  deps = { store, email, siteOrigin: "https://example.test" };
});

describe("createSubscription", () => {
  it("rejects an invalid email and persists nothing", async () => {
    const result = await createSubscription(deps, { email: "not-an-email", purpose: "marketing_digest", source: "website" });
    expect(result.kind).toBe("invalid_email");
    expect(store.requests.size).toBe(0);
    expect(email.sent).toHaveLength(0);
  });

  it("creates a pending request with the current consent version and sends one confirmation email", async () => {
    const result = await createSubscription(deps, { email: "Parent@Example.com", purpose: "marketing_digest", source: "website" });
    expect(result.kind).toBe("pending_sent");

    const record = await store.findByEmail("parent@example.com", "marketing_digest");
    expect(record?.state).toBe("pending");
    expect(record?.consentVersion).toBe(CURRENT_CONSENT_VERSION);
    expect(email.sent).toHaveLength(1);
    expect(email.sent[0].to).toBe("parent@example.com");
  });

  it("does not create a second subscriber or send a second email on a duplicate submit", async () => {
    await createSubscription(deps, { email: "parent@example.com", purpose: "marketing_digest", source: "website" });
    const secondResult = await createSubscription(deps, { email: "parent@example.com", purpose: "marketing_digest", source: "website" });

    // Cooldown applies immediately after the first send, so a same-second duplicate is rate-limited, not a fresh send.
    expect(secondResult.kind).toBe("rate_limited");
    expect(store.requests.size).toBe(1);
    expect(email.sent).toHaveLength(1);
  });

  it("reports already_confirmed and sends no email once a request has been confirmed", async () => {
    await createSubscription(deps, { email: "parent@example.com", purpose: "marketing_digest", source: "website" });
    const record = await store.findByEmail("parent@example.com", "marketing_digest");
    await store.markConfirmed(record!.id);

    const result = await createSubscription(deps, { email: "parent@example.com", purpose: "marketing_digest", source: "website" });
    expect(result.kind).toBe("already_confirmed");
    expect(email.sent).toHaveLength(1); // only the original confirmation email
  });

  it("never silently reactivates a previously unsubscribed address", async () => {
    await createSubscription(deps, { email: "parent@example.com", purpose: "marketing_digest", source: "website" });
    const record = await store.findByEmail("parent@example.com", "marketing_digest");
    await store.markUnsubscribed(record!.id);

    const result = await createSubscription(deps, { email: "parent@example.com", purpose: "marketing_digest", source: "website" });
    expect(result.kind).toBe("previously_unsubscribed");
    expect((await store.findByEmail("parent@example.com", "marketing_digest"))?.state).toBe("unsubscribed");
    expect(email.sent).toHaveLength(1); // still just the original — no email sent on the blocked duplicate
  });

  it("reports delivery_failed and does not claim success when the email provider fails", async () => {
    email.nextResult = { ok: false, errorCode: "network_error" };
    const result = await createSubscription(deps, { email: "parent@example.com", purpose: "marketing_digest", source: "website" });
    expect(result.kind).toBe("delivery_failed");
  });

  it("rejects an optional age band outside the allowlist", async () => {
    const result = await createSubscription(deps, {
      email: "parent@example.com",
      purpose: "marketing_digest",
      source: "website",
      optionalAgeBand: "not-a-real-band",
    });
    expect(result.kind).toBe("invalid_input");
  });
});

describe("reconsentSubscription", () => {
  it("brings a previously unsubscribed address back to pending only through the explicit reconsent path", async () => {
    await createSubscription(deps, { email: "parent@example.com", purpose: "marketing_digest", source: "website" });
    const record = await store.findByEmail("parent@example.com", "marketing_digest");
    await store.markUnsubscribed(record!.id);

    const result = await reconsentSubscription(deps, { email: "parent@example.com", purpose: "marketing_digest", source: "website" });
    expect(result.kind).toBe("pending_sent");
    expect((await store.findByEmail("parent@example.com", "marketing_digest"))?.state).toBe("pending");
  });
});

describe("confirmSubscription", () => {
  it("confirms a valid token", async () => {
    await createSubscription(deps, { email: "parent@example.com", purpose: "marketing_digest", source: "website" });
    const record = await store.findByEmail("parent@example.com", "marketing_digest");
    const rawConfirmToken = await store.createToken(record!.id, "confirm", 60_000);

    const result = await confirmSubscription(deps, rawConfirmToken);
    expect(result).toBe("confirmed");
    expect((await store.findByEmail("parent@example.com", "marketing_digest"))?.state).toBe("confirmed");
  });

  it("is idempotent — confirming the same token twice does not error and reports already_confirmed", async () => {
    await createSubscription(deps, { email: "parent@example.com", purpose: "marketing_digest", source: "website" });
    const record = await store.findByEmail("parent@example.com", "marketing_digest");
    const rawConfirmToken = await store.createToken(record!.id, "confirm", 60_000);

    expect(await confirmSubscription(deps, rawConfirmToken)).toBe("confirmed");
    expect(await confirmSubscription(deps, rawConfirmToken)).toBe("already_confirmed");
  });

  it("treats an unknown or expired token as invalid_or_expired", async () => {
    expect(await confirmSubscription(deps, "does-not-exist")).toBe("invalid_or_expired");
  });

  it("refuses to confirm a token for an address that has since unsubscribed", async () => {
    await createSubscription(deps, { email: "parent@example.com", purpose: "marketing_digest", source: "website" });
    const record = await store.findByEmail("parent@example.com", "marketing_digest");
    const rawConfirmToken = await store.createToken(record!.id, "confirm", 60_000);
    await store.markUnsubscribed(record!.id);

    const result = await confirmSubscription(deps, rawConfirmToken);
    expect(result).toBe("blocked_by_unsubscribe");
    expect((await store.findByEmail("parent@example.com", "marketing_digest"))?.state).toBe("unsubscribed");
  });
});

describe("unsubscribe", () => {
  it("unsubscribes a valid token and stops future confirmation", async () => {
    await createSubscription(deps, { email: "parent@example.com", purpose: "marketing_digest", source: "website" });
    const record = await store.findByEmail("parent@example.com", "marketing_digest");
    const rawUnsubToken = await store.createToken(record!.id, "unsubscribe", 60_000);

    expect(await unsubscribe(deps, rawUnsubToken)).toBe("unsubscribed");
    expect((await store.findByEmail("parent@example.com", "marketing_digest"))?.state).toBe("unsubscribed");
  });

  it("is idempotent on repeated unsubscribe", async () => {
    await createSubscription(deps, { email: "parent@example.com", purpose: "marketing_digest", source: "website" });
    const record = await store.findByEmail("parent@example.com", "marketing_digest");
    const rawUnsubToken = await store.createToken(record!.id, "unsubscribe", 60_000);

    expect(await unsubscribe(deps, rawUnsubToken)).toBe("unsubscribed");
    expect(await unsubscribe(deps, rawUnsubToken)).toBe("already_unsubscribed");
  });
});
