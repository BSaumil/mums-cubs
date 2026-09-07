"use client";

import { useState, type FormEvent } from "react";
import { track } from "@/lib/analytics";

const STORAGE_KEY = "mc-digest-waitlist";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const trimmed = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError("That doesn't look like a valid email address.");
      return;
    }
    setError(null);

    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const list: string[] = raw ? JSON.parse(raw) : [];
      if (!list.includes(trimmed)) {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...list, trimmed]));
      }
    } catch {
      // Storage can fail (private browsing, quota) — the confirmation still shows for this session.
    }

    track("newsletter_signup");
    setSaved(true);
  }

  if (saved) {
    return (
      <div className="rounded-card bg-leaf-100 p-5 text-sm text-leaf-700">
        Saved on this device. Weekly digest emails aren&apos;t live yet — this confirms what we&apos;ll ask for the
        moment they are, and nothing has been sent anywhere in the meantime.
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
          className="w-full rounded-capsule border border-[var(--color-ink-300)]/50 bg-surface-raised px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-subtle)] focus-visible:border-focus"
        />
        {error ? <p className="mt-1.5 text-xs text-clay-700">{error}</p> : null}
      </div>
      <button
        type="submit"
        className="min-h-11 shrink-0 rounded-capsule bg-wood-700 px-5 py-2.5 text-sm font-medium text-white"
      >
        Join the waitlist
      </button>
    </form>
  );
}
