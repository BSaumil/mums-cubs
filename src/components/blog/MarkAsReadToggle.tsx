"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/icons/Icon";

const STORAGE_KEY = "mc-blog-read";

function loadReadSlugs(): string[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function persistReadSlugs(slugs: string[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
  } catch {
    // Storage can fail (private browsing, quota) — the toggle still works for this view.
  }
}

export function isPostRead(slug: string): boolean {
  return loadReadSlugs().includes(slug);
}

/** A private, per-device reading list — no account, nothing sent anywhere. */
export function MarkAsReadToggle({ slug }: { slug: string }) {
  const [read, setRead] = useState<boolean | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reading localStorage can't happen during SSR render without a hydration mismatch
    setRead(loadReadSlugs().includes(slug));
  }, [slug]);

  if (read === null) return null;

  function toggle() {
    const slugs = loadReadSlugs();
    const next = read ? slugs.filter((item) => item !== slug) : [...slugs, slug];
    persistReadSlugs(next);
    setRead(!read);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={read}
      data-print-hide
      className={`inline-flex min-h-11 items-center gap-2 rounded-capsule border px-4 py-2 text-sm font-medium transition-colors ${
        read ? "border-transparent bg-leaf-100 text-leaf-700" : "border-[var(--color-ink-300)]/50 text-[var(--text-primary)] hover:border-wood-500"
      }`}
    >
      <Icon name={read ? "heart" : "book"} className="h-4 w-4" />
      {read ? "Read" : "Mark as read"}
    </button>
  );
}
