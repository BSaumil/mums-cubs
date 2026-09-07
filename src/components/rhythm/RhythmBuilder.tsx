"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Icon, type IconName } from "@/components/icons/Icon";
import { track } from "@/lib/analytics";
import { DEFAULT_RHYTHM, type RhythmMoment } from "@/lib/content/rhythm-defaults";

const STORAGE_KEY = "mc-rhythm-builder";
const ADDED_MOMENT_ICON: IconName = "sun";

function loadRhythm(): RhythmMoment[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_RHYTHM;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : DEFAULT_RHYTHM;
  } catch {
    return DEFAULT_RHYTHM;
  }
}

/**
 * A reorderable, per-device rhythm builder: families start from the
 * illustrative example above and adapt it into their own. Nothing here
 * leaves localStorage.
 */
export function RhythmBuilder() {
  // null = not yet hydrated from localStorage (avoids an SSR/client mismatch).
  const [items, setItems] = useState<RhythmMoment[] | null>(null);
  const [draft, setDraft] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage only exists client-side; reading it during render would mismatch the server-rendered HTML.
    setItems(loadRhythm());
  }, []);

  function persist(next: RhythmMoment[]) {
    setItems(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Storage can fail (private browsing, quota) — the in-memory order still applies for this session.
    }
  }

  function move(index: number, direction: -1 | 1) {
    if (!items) return;
    const target = index + direction;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];
    persist(next);
    track("rhythm_reordered");
  }

  function remove(id: string) {
    if (!items) return;
    persist(items.filter((item) => item.id !== id));
    track("rhythm_customised", { action: "remove" });
  }

  function handleAdd(event: FormEvent) {
    event.preventDefault();
    const label = draft.trim();
    if (!label || !items) return;
    const moment: RhythmMoment = { id: `custom-${crypto.randomUUID()}`, label, icon: ADDED_MOMENT_ICON };
    persist([...items, moment]);
    setDraft("");
    track("rhythm_customised", { action: "add" });
  }

  function reset() {
    persist(DEFAULT_RHYTHM);
    track("rhythm_customised", { action: "reset" });
  }

  if (items === null) return null;

  return (
    <div className="mt-10 rounded-panel bg-surface-muted p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="font-display text-xl font-semibold">Build your own rhythm</h2>
          <p className="mt-1.5 max-w-lg text-sm text-[var(--text-secondary)]">
            Reorder, remove, or add moments until it matches your family&apos;s day. Saved only on this device —
            nothing is uploaded or shared.
          </p>
        </div>
        <button
          type="button"
          onClick={reset}
          className="shrink-0 text-xs font-medium text-[var(--text-subtle)] hover:text-wood-700"
        >
          Reset to example
        </button>
      </div>

      {items.length > 0 ? (
        <ol className="mt-5 space-y-2">
          {items.map((item, index) => (
            <li key={item.id} className="flex items-center gap-3 rounded-card bg-surface-raised p-3 shadow-resting">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-50 text-[var(--color-ink-700)]">
                <Icon name={item.icon} className="h-4.5 w-4.5" />
              </span>
              <span className="flex-1 text-sm font-medium text-[var(--text-primary)]">{item.label}</span>
              <div className="flex shrink-0 items-center gap-1">
                <button
                  type="button"
                  onClick={() => move(index, -1)}
                  disabled={index === 0}
                  aria-label={`Move ${item.label} earlier`}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-[var(--text-subtle)] hover:bg-wood-100 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <Icon name="chevron-down" className="h-4 w-4 rotate-180" />
                </button>
                <button
                  type="button"
                  onClick={() => move(index, 1)}
                  disabled={index === items.length - 1}
                  aria-label={`Move ${item.label} later`}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-[var(--text-subtle)] hover:bg-wood-100 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <Icon name="chevron-down" className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => remove(item.id)}
                  aria-label={`Remove ${item.label}`}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-[var(--text-subtle)] hover:bg-clay-50 hover:text-clay-700"
                >
                  <Icon name="close" className="h-4 w-4" />
                </button>
              </div>
            </li>
          ))}
        </ol>
      ) : (
        <p className="mt-5 text-sm text-[var(--text-subtle)]">Every moment removed — add one below to start again.</p>
      )}

      <form onSubmit={handleAdd} className="mt-4 flex gap-2">
        <label htmlFor="rhythm-add" className="sr-only">
          Add a moment to your rhythm
        </label>
        <input
          id="rhythm-add"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Add a moment (e.g. Bath time)"
          className="flex-1 rounded-capsule border border-[var(--color-ink-300)]/50 bg-surface-raised px-4 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-subtle)] focus-visible:border-focus"
        />
        <button
          type="submit"
          disabled={!draft.trim()}
          className="shrink-0 rounded-capsule bg-wood-700 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          Add
        </button>
      </form>
    </div>
  );
}
