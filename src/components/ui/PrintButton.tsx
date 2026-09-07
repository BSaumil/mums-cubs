"use client";

import { Icon } from "@/components/icons/Icon";

/** A tiny client island — the only interaction is window.print(), no state to manage. */
export function PrintButton({ label = "Print this page" }: { label?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      data-print-hide
      className="inline-flex min-h-11 items-center gap-2 rounded-capsule border border-[var(--color-ink-300)]/50 px-4 py-2 text-sm font-medium text-[var(--text-primary)] hover:border-wood-500"
    >
      <Icon name="book" className="h-4 w-4" />
      {label}
    </button>
  );
}
