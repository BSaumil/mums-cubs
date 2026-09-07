"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { VisualBadge } from "@/components/ui/VisualBadge";
import { searchContent, KIND_LABEL } from "@/lib/content/search-index";

export function SiteSearch() {
  const [query, setQuery] = useState("");
  const results = useMemo(() => searchContent(query), [query]);

  return (
    <div>
      <label htmlFor="site-search-input" className="sr-only">
        Search the site
      </label>
      <input
        id="site-search-input"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search curriculum areas, activities, materials and articles…"
        className="w-full rounded-capsule border border-[var(--color-ink-300)]/50 bg-surface-raised px-5 py-3 text-base text-[var(--text-primary)] placeholder:text-[var(--text-subtle)] focus-visible:border-focus"
        autoFocus
      />

      <div className="mt-6" aria-live="polite">
        {query.trim() === "" ? (
          <p className="text-sm text-[var(--text-subtle)]">Start typing to search across the whole site.</p>
        ) : results.length === 0 ? (
          <p className="text-sm text-[var(--text-subtle)]">No results for “{query}” — try a different word.</p>
        ) : (
          <ul className="space-y-3">
            {results.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className="block rounded-card bg-surface-raised p-4 shadow-resting transition-shadow hover:shadow-tray focus-visible:shadow-tray"
                >
                  <div className="flex items-center justify-between gap-2">
                    <VisualBadge label={KIND_LABEL[item.kind]} paradigm={item.paradigm === "integrated" ? undefined : item.paradigm} />
                  </div>
                  <h2 className="mt-2 text-base font-semibold text-[var(--text-primary)]">{item.title}</h2>
                  <p className="mt-1 text-sm text-[var(--text-secondary)]">{item.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
