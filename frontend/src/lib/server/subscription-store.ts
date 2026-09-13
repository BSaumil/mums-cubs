import type {
  CreateSubscriptionInput,
  OptionalAgeBand,
  OptionalPath,
  SubscriptionRequestRecord,
  TokenPurpose,
} from "@/lib/server/subscription-types";

export interface ConsumedToken {
  request: SubscriptionRequestRecord;
  alreadyUsed: boolean;
}

/**
 * Storage boundary for lead capture. One real implementation
 * (PostgresSubscriptionStore, gated on DATABASE_URL) and, in tests, an
 * in-memory fake — never a silent in-memory fallback in a real request path,
 * since that would just move the "fake success" bug server-side.
 */
export interface SubscriptionStore {
  findByEmail(email: string, purpose: CreateSubscriptionInput["purpose"]): Promise<SubscriptionRequestRecord | null>;
  create(input: CreateSubscriptionInput): Promise<SubscriptionRequestRecord>;
  markConfirmed(requestId: string): Promise<void>;
  markUnsubscribed(requestId: string): Promise<void>;
  /** Explicit reconsent: a previously-unsubscribed address opts back in. Never triggered by a plain duplicate submit. */
  reactivateAsPending(requestId: string): Promise<void>;
  /** Cooldown check for resends — seconds since the request was last created/touched. */
  secondsSinceLastTouch(requestId: string): Promise<number>;
  /** Bumps updated_at without changing state — call on every confirmation resend so the cooldown actually limits repeat resends. */
  touch(requestId: string): Promise<void>;
  createToken(requestId: string, purpose: TokenPurpose, ttlMs: number): Promise<string>;
  /** Returns null if the token is unknown, wrong purpose, or expired. Idempotent: consuming an already-used token still returns the request. */
  consumeToken(rawToken: string, purpose: TokenPurpose): Promise<ConsumedToken | null>;
}

let pgPool: import("pg").Pool | null = null;

async function getPool() {
  if (pgPool) return pgPool;
  const { Pool } = await import("pg");
  pgPool = new Pool({ connectionString: process.env.DATABASE_URL, max: 3 });
  return pgPool;
}

function toRecord(row: {
  id: string;
  normalized_email: string;
  state: SubscriptionRequestRecord["state"];
  purpose: SubscriptionRequestRecord["purpose"];
  consent_version: string;
  consent_at: string;
  source: string;
  optional_age_band: string | null;
  optional_path: string | null;
  confirmed_at: string | null;
  unsubscribed_at: string | null;
  created_at: string;
  updated_at: string;
}): SubscriptionRequestRecord {
  return {
    id: row.id,
    normalizedEmail: row.normalized_email,
    state: row.state,
    purpose: row.purpose,
    consentVersion: row.consent_version,
    consentAt: row.consent_at,
    source: row.source,
    optionalAgeBand: (row.optional_age_band as OptionalAgeBand | null) ?? null,
    optionalPath: (row.optional_path as OptionalPath | null) ?? null,
    confirmedAt: row.confirmed_at,
    unsubscribedAt: row.unsubscribed_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export class PostgresSubscriptionStore implements SubscriptionStore {
  async findByEmail(email: string, purpose: CreateSubscriptionInput["purpose"]) {
    const pool = await getPool();
    const { rows } = await pool.query(
      `SELECT * FROM subscription_requests WHERE normalized_email = $1 AND purpose = $2 LIMIT 1`,
      [email, purpose],
    );
    return rows[0] ? toRecord(rows[0]) : null;
  }

  async create(input: CreateSubscriptionInput) {
    const pool = await getPool();
    const { rows } = await pool.query(
      `INSERT INTO subscription_requests
         (normalized_email, state, purpose, consent_version, consent_at, source, optional_age_band, optional_path)
       VALUES ($1, 'pending', $2, $3, now(), $4, $5, $6)
       RETURNING *`,
      [input.email, input.purpose, input.consentVersion, input.source, input.optionalAgeBand ?? null, input.optionalPath ?? null],
    );
    return toRecord(rows[0]);
  }

  async markConfirmed(requestId: string) {
    const pool = await getPool();
    await pool.query(
      `UPDATE subscription_requests SET state = 'confirmed', confirmed_at = now(), updated_at = now() WHERE id = $1`,
      [requestId],
    );
  }

  async markUnsubscribed(requestId: string) {
    const pool = await getPool();
    await pool.query(
      `UPDATE subscription_requests SET state = 'unsubscribed', unsubscribed_at = now(), updated_at = now() WHERE id = $1`,
      [requestId],
    );
  }

  async reactivateAsPending(requestId: string) {
    const pool = await getPool();
    await pool.query(
      `UPDATE subscription_requests
       SET state = 'pending', consent_at = now(), unsubscribed_at = NULL, confirmed_at = NULL, updated_at = now()
       WHERE id = $1`,
      [requestId],
    );
  }

  async secondsSinceLastTouch(requestId: string) {
    const pool = await getPool();
    const { rows } = await pool.query(
      `SELECT EXTRACT(EPOCH FROM (now() - updated_at)) AS seconds FROM subscription_requests WHERE id = $1`,
      [requestId],
    );
    return rows[0] ? Number(rows[0].seconds) : Number.POSITIVE_INFINITY;
  }

  async touch(requestId: string) {
    const pool = await getPool();
    await pool.query(`UPDATE subscription_requests SET updated_at = now() WHERE id = $1`, [requestId]);
  }

  async createToken(requestId: string, purpose: TokenPurpose, ttlMs: number) {
    const { generateToken, hashToken } = await import("@/lib/server/subscription-tokens");
    const pool = await getPool();
    const raw = generateToken();
    await pool.query(
      `INSERT INTO scoped_tokens (token_hash, request_id, purpose, expires_at)
       VALUES ($1, $2, $3, now() + ($4 || ' milliseconds')::interval)`,
      [hashToken(raw), requestId, purpose, ttlMs],
    );
    return raw;
  }

  async consumeToken(rawToken: string, purpose: TokenPurpose): Promise<ConsumedToken | null> {
    const { hashToken } = await import("@/lib/server/subscription-tokens");
    const pool = await getPool();
    const tokenHash = hashToken(rawToken);
    const { rows } = await pool.query(
      `SELECT st.used_at, sr.* FROM scoped_tokens st
       JOIN subscription_requests sr ON sr.id = st.request_id
       WHERE st.token_hash = $1 AND st.purpose = $2 AND st.expires_at > now()
       LIMIT 1`,
      [tokenHash, purpose],
    );
    const row = rows[0];
    if (!row) return null;

    const alreadyUsed = row.used_at !== null;
    if (!alreadyUsed) {
      await pool.query(`UPDATE scoped_tokens SET used_at = now() WHERE token_hash = $1`, [tokenHash]);
    }
    return { request: toRecord(row), alreadyUsed };
  }
}

/** True only when a real, durable store is actually configured — never a silent in-memory default in a live request. */
export function isPersistenceConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

let sharedStore: SubscriptionStore | null = null;
export function getSubscriptionStore(): SubscriptionStore {
  if (!sharedStore) sharedStore = new PostgresSubscriptionStore();
  return sharedStore;
}
