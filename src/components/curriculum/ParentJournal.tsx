"use client";

import { useEffect, useState, type FormEvent } from "react";
import { track } from "@/lib/analytics";

interface JournalEntry {
  id: string;
  date: string; // ISO date, day precision
  note: string;
}

const MAX_NOTE_LENGTH = 500;

function storageKey(areaSlug: string) {
  return `mc-journal:${areaSlug}`;
}

function loadEntries(areaSlug: string): JournalEntry[] {
  try {
    const raw = window.localStorage.getItem(storageKey(areaSlug));
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

/**
 * A private, per-device observation log against one curriculum area's
 * parent-observation guidance. Nothing here leaves localStorage — there is
 * no backend yet, and a child's observations are exactly the kind of data
 * this product should not send anywhere by default.
 */
export function ParentJournal({ areaSlug }: { areaSlug: string }) {
  // null = not yet hydrated from localStorage (avoids an SSR/client mismatch).
  const [entries, setEntries] = useState<JournalEntry[] | null>(null);
  const [draft, setDraft] = useState("");

  useEffect(() => {
    // Reading localStorage during render would mismatch the server-rendered
    // (window-less) HTML, so this genuinely has to happen post-hydration —
    // not a fetch this component could otherwise avoid.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEntries(loadEntries(areaSlug));
  }, [areaSlug]);

  function persist(next: JournalEntry[]) {
    setEntries(next);
    try {
      window.localStorage.setItem(storageKey(areaSlug), JSON.stringify(next));
    } catch {
      // Storage can fail (private browsing, quota) — the in-memory state
      // still reflects the change for this session, so we don't block the UI.
    }
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const note = draft.trim();
    if (!note) return;

    const entry: JournalEntry = { id: crypto.randomUUID(), date: new Date().toISOString(), note };
    persist([entry, ...(entries ?? [])]);
    setDraft("");
    track("parent_observation_saved", { areaSlug });
  }

  function handleDelete(id: string) {
    persist((entries ?? []).filter((entry) => entry.id !== id));
  }

  if (entries === null) return null;

  return (
    <div className="mt-6 border-t border-[var(--color-ink-300)]/40 pt-6">
      <h3 className="text-sm font-semibold text-[var(--text-primary)]">Your notes</h3>
      <p className="mt-1 text-xs text-[var(--text-subtle)]">
        Saved only on this device — never uploaded, synced, or shared.
      </p>

      <form onSubmit={handleSubmit} className="mt-3">
        <label htmlFor={`journal-${areaSlug}`} className="sr-only">
          Add a dated observation for {areaSlug}
        </label>
        <textarea
          id={`journal-${areaSlug}`}
          value={draft}
          onChange={(event) => setDraft(event.target.value.slice(0, MAX_NOTE_LENGTH))}
          placeholder="What did you notice today?"
          rows={2}
          maxLength={MAX_NOTE_LENGTH}
          className="w-full resize-none rounded-card border border-[var(--color-ink-300)]/50 bg-surface-raised p-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-subtle)] focus-visible:border-focus"
        />
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xs text-[var(--text-subtle)]">{draft.length}/{MAX_NOTE_LENGTH}</span>
          <button
            type="submit"
            disabled={!draft.trim()}
            className="min-h-9 rounded-capsule bg-wood-700 px-4 py-1.5 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            Save note
          </button>
        </div>
      </form>

      {entries.length > 0 ? (
        <ul className="mt-5 space-y-3">
          {entries.map((entry) => (
            <li key={entry.id} className="flex items-start justify-between gap-3 rounded-card bg-surface-raised p-3 text-sm shadow-resting">
              <div>
                <p className="text-xs font-medium text-[var(--text-subtle)]">{formatDate(entry.date)}</p>
                <p className="mt-1 text-[var(--text-primary)]">{entry.note}</p>
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
        <p className="mt-4 text-sm text-[var(--text-subtle)]">No notes yet for this area.</p>
      )}
    </div>
  );
}
