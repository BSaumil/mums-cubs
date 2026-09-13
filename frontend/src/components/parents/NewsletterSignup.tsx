"use client";

import { useState, type FormEvent } from "react";
import { track } from "@/lib/analytics";

type ViewState =
  | { kind: "form" }
  | { kind: "submitting" }
  | { kind: "pending_sent" }
  | { kind: "already_confirmed" }
  | { kind: "previously_unsubscribed" }
  | { kind: "rate_limited" }
  | { kind: "delivery_failed" }
  | { kind: "error" };

/**
 * A real, server-backed subscription form — no localStorage fake-success.
 * When email capture isn't configured (no DATABASE_URL + email provider),
 * this renders the honest fallback instead of pretending to collect anything.
 */
export function NewsletterSignup({ configured }: { configured: boolean }) {
  const [email, setEmail] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);
  const [state, setState] = useState<ViewState>({ kind: "form" });

  if (!configured) {
    return (
      <div className="rounded-card bg-surface-muted p-5 text-sm text-[var(--text-secondary)]">
        Email signup is not available yet. You can explore the activities now.
      </div>
    );
  }

  async function submit(email: string, reconsent: boolean) {
    setState({ kind: "submitting" });
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, purpose: "marketing_digest", reconsent }),
      });
      const body: { code?: string } = await response.json().catch(() => ({}));
      switch (body.code) {
        case "pending_sent":
          setState({ kind: "pending_sent" });
          track("newsletter_signup");
          return;
        case "already_confirmed":
          setState({ kind: "already_confirmed" });
          return;
        case "previously_unsubscribed":
          setState({ kind: "previously_unsubscribed" });
          return;
        case "rate_limited":
          setState({ kind: "rate_limited" });
          return;
        case "invalid_email":
          setValidationError("That doesn't look like a valid email address.");
          setState({ kind: "form" });
          return;
        default:
          setState({ kind: "delivery_failed" });
      }
    } catch {
      setState({ kind: "error" });
    }
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const trimmed = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setValidationError("That doesn't look like a valid email address.");
      return;
    }
    setValidationError(null);
    void submit(trimmed, false);
  }

  if (state.kind === "pending_sent") {
    return (
      <div className="rounded-card bg-leaf-100 p-5 text-sm text-leaf-700">
        Check your email to confirm — we&apos;ve sent a confirmation link to {email}. You won&apos;t be added to
        anything until you click it.
      </div>
    );
  }

  if (state.kind === "already_confirmed") {
    return <div className="rounded-card bg-leaf-100 p-5 text-sm text-leaf-700">You&apos;re already on the list.</div>;
  }

  if (state.kind === "previously_unsubscribed") {
    return (
      <div className="rounded-card bg-surface-muted p-5 text-sm text-[var(--text-secondary)]">
        <p>You previously unsubscribed this address. We won&apos;t sign it back up unless you ask us to.</p>
        <button
          type="button"
          onClick={() => void submit(email.trim(), true)}
          className="mt-3 min-h-11 rounded-capsule bg-wood-700 px-4 py-2 text-sm font-medium text-white"
        >
          Yes, sign me up again
        </button>
      </div>
    );
  }

  if (state.kind === "rate_limited") {
    return (
      <div className="rounded-card bg-surface-muted p-5 text-sm text-[var(--text-secondary)]">
        We just sent a confirmation link to this address — check your email, or try again in a minute.
      </div>
    );
  }

  if (state.kind === "delivery_failed" || state.kind === "error") {
    return (
      <div className="rounded-card bg-clay-50 p-5 text-sm text-clay-700">
        Something went wrong sending your confirmation email. Nothing was saved — please try again shortly.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row sm:items-start">
      <div className="flex-1">
        <label htmlFor="digest-email" className="sr-only">
          Email address
        </label>
        <input
          id="digest-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          disabled={state.kind === "submitting"}
          className="w-full rounded-capsule border border-[var(--color-ink-300)]/50 bg-surface-raised px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-subtle)] focus-visible:border-focus"
        />
        {validationError ? <p className="mt-1.5 text-xs text-clay-700">{validationError}</p> : null}
      </div>
      <button
        type="submit"
        disabled={state.kind === "submitting"}
        className="min-h-11 shrink-0 rounded-capsule bg-wood-700 px-5 py-2.5 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        {state.kind === "submitting" ? "Sending…" : "Join the waitlist"}
      </button>
    </form>
  );
}
