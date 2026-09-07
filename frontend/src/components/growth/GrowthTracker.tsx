"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Icon } from "@/components/icons/Icon";
import { track } from "@/lib/analytics";
import { DEVELOPMENT_DOMAINS, DOMAIN_ICON, DOMAIN_LABEL } from "@/lib/content/development-domains";
import type { DevelopmentDomain } from "@/lib/types";

const STORAGE_KEY = "mc-growth-log";
const MAX_NOTE_LENGTH = 300;

interface Milestone {
  id: string;
  date: string; // ISO date, day precision
  domain: DevelopmentDomain;
  note: string;
}

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

function loadMilestones(): Milestone[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

/**
 * A private, per-device log of small things a parent notices — sorted by
 * date, tagged to a developmental domain. Nothing here leaves localStorage,
 * and it is explicitly framed as observation, not screening: this is not a
 * substitute for a pediatrician's assessment.
 */
export function GrowthTracker() {
  // null = not yet hydrated from localStorage (avoids an SSR/client mismatch).
  const [milestones, setMilestones] = useState<Milestone[] | null>(null);
  const [date, setDate] = useState(todayIso());
  const [domain, setDomain] = useState<DevelopmentDomain>("cognitive");
  const [note, setNote] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage only exists client-side; reading it during render would mismatch the server-rendered HTML.
    setMilestones(loadMilestones());
  }, []);

  function persist(next: Milestone[]) {
    setMilestones(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Storage can fail (private browsing, quota) — the in-memory list still reflects the change for this session.
    }
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const trimmed = note.trim();
    if (!trimmed || !milestones) return;

    const milestone: Milestone = { id: crypto.randomUUID(), date, domain, note: trimmed };
    persist([milestone, ...milestones]);
    setNote("");
    track("milestone_noted", { domain });
  }

  function handleDelete(id: string) {
    if (!milestones) return;
    persist(milestones.filter((entry) => entry.id !== id));
  }

  if (milestones === null) return null;

  const sorted = [...milestones].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div>
      <div className="rounded-panel bg-surface-muted p-5 text-sm text-[var(--text-secondary)]">
        A gentle place to note what you notice — not a medical or developmental screening tool. If you have any
        concern about your child&apos;s development, talk to a pediatrician.
      </div>

      <form onSubmit={handleSubmit} className="mt-6 rounded-card bg-surface-raised p-5 shadow-resting">
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label htmlFor="milestone-date" className="text-xs font-semibold uppercase tracking-wide text-[var(--text-subtle)]">
              Date
            </label>
            <input
              id="milestone-date"
              type="date"
              value={date}
              max={todayIso()}
              onChange={(event) => setDate(event.target.value)}
              className="mt-1.5 block w-full rounded-capsule border border-[var(--color-ink-300)]/50 bg-surface-raised px-4 py-2 text-sm text-[var(--text-primary)]"
            />
          </div>
          <div>
            <label htmlFor="milestone-domain" className="text-xs font-semibold uppercase tracking-wide text-[var(--text-subtle)]">
              Area
            </label>
            <select
              id="milestone-domain"
              value={domain}
              onChange={(event) => setDomain(event.target.value as DevelopmentDomain)}
              className="mt-1.5 block w-full rounded-capsule border border-[var(--color-ink-300)]/50 bg-surface-raised px-4 py-2 text-sm text-[var(--text-primary)]"
            >
              {DEVELOPMENT_DOMAINS.map((option) => (
                <option key={option} value={option}>
                  {DOMAIN_LABEL[option]}
                </option>
              ))}
            </select>
          </div>
        </div>

        <label htmlFor="milestone-note" className="mt-3 block text-xs font-semibold uppercase tracking-wide text-[var(--text-subtle)]">
          What did you notice?
        </label>
        <textarea
          id="milestone-note"
          value={note}
          onChange={(event) => setNote(event.target.value.slice(0, MAX_NOTE_LENGTH))}
          placeholder="e.g. Buttoned their own coat for the first time"
          rows={2}
          maxLength={MAX_NOTE_LENGTH}
          className="mt-1.5 w-full resize-none rounded-card border border-[var(--color-ink-300)]/50 bg-surface-raised p-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-subtle)] focus-visible:border-focus"
        />
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xs text-[var(--text-subtle)]">{note.length}/{MAX_NOTE_LENGTH}</span>
          <button
            type="submit"
            disabled={!note.trim()}
            className="min-h-9 rounded-capsule bg-wood-700 px-4 py-1.5 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            Save
          </button>
        </div>
      </form>

      {sorted.length > 0 ? (
        <ul className="mt-6 space-y-3">
          {sorted.map((entry) => (
            <li key={entry.id} className="flex items-start gap-3 rounded-card bg-surface-raised p-4 shadow-resting">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-50 text-[var(--color-ink-700)]">
                <Icon name={DOMAIN_ICON[entry.domain]} className="h-4.5 w-4.5" />
              </span>
              <div className="flex-1">
                <p className="text-xs font-medium text-[var(--text-subtle)]">
                  {formatDate(entry.date)} · {DOMAIN_LABEL[entry.domain]}
                </p>
                <p className="mt-1 text-sm text-[var(--text-primary)]">{entry.note}</p>
              </div>
              <button
                type="button"
                onClick={() => handleDelete(entry.id)}
                aria-label={`Delete note from ${formatDate(entry.date)}`}
                className="shrink-0 text-xs font-medium text-[var(--text-subtle)] hover:text-clay-700"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-6 text-sm text-[var(--text-subtle)]">No notes yet — save your first observation above.</p>
      )}
    </div>
  );
}
