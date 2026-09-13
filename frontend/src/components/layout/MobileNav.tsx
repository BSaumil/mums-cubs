"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/icons/Icon";

interface MobileNavProps {
  items: { href: string; label: string }[];
}

export function MobileNav({ items }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
        className="flex h-11 w-11 items-center justify-center rounded-full text-[var(--text-primary)] hover:bg-[var(--color-wood-100)]"
      >
        <Icon name={open ? "close" : "menu"} className="h-6 w-6" />
      </button>
      {open ? (
        <div
          id="mobile-nav-panel"
          className="absolute inset-x-0 top-full border-b border-[var(--color-ink-300)]/30 bg-[var(--color-canvas-50)] px-4 pb-6 pt-2 shadow-floating"
        >
          <nav aria-label="Primary" className="flex flex-col gap-1">
            <Link
              href="/search"
              onClick={() => setOpen(false)}
              className="flex min-h-11 items-center gap-2 rounded-lg px-3 py-3 text-base font-medium text-[var(--text-primary)] hover:bg-[var(--color-wood-100)]"
            >
              <Icon name="search" className="h-4.5 w-4.5" />
              Search
            </Link>
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="min-h-11 rounded-lg px-3 py-3 text-base font-medium text-[var(--text-primary)] hover:bg-[var(--color-wood-100)]"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/parents"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-capsule bg-wood-700 px-5 py-3 text-center text-sm font-medium text-white"
            >
              For Parents
            </Link>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
