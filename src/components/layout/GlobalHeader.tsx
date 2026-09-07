import Link from "next/link";
import { BrandMark } from "@/components/layout/BrandMark";
import { MobileNav } from "@/components/layout/MobileNav";

const NAV_ITEMS = [
  { href: "/discover", label: "Discover" },
  { href: "/curriculum", label: "Curriculum" },
  { href: "/materials", label: "Materials" },
  { href: "/blog", label: "Blog" },
  { href: "/rhythm", label: "Daily Rhythm" },
  { href: "/parents", label: "For Parents" },
];

export function GlobalHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-ink-300)]/30 bg-[var(--color-canvas-50)]/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <BrandMark />
        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-4 lg:flex">
          <Link
            href="/parents"
            className="rounded-capsule bg-wood-700 px-5 py-2.5 text-sm font-medium text-white shadow-resting transition-transform hover:-translate-y-0.5"
          >
            Join Our Community
          </Link>
        </div>
        <MobileNav items={NAV_ITEMS} />
      </div>
    </header>
  );
}
