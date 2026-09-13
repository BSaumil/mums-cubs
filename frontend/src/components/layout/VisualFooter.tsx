import Link from "next/link";
import { BrandMark } from "@/components/layout/BrandMark";

const COLUMNS = [
  {
    title: "Explore",
    links: [
      { href: "/curriculum", label: "Curriculum" },
      { href: "/materials", label: "Materials" },
      { href: "/rhythm", label: "Daily Rhythm" },
    ],
  },
  {
    title: "Paths",
    links: [
      { href: "/discover/montessori", label: "Montessori" },
      { href: "/discover/vedic", label: "Vedic" },
      { href: "/discover/integrated", label: "Integrated" },
    ],
  },
  {
    title: "Learn",
    links: [
      { href: "/philosophy", label: "Our Philosophy" },
      { href: "/parents", label: "For Parents" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/contact", label: "Contact" },
      { href: "/privacy", label: "Privacy" },
    ],
  },
];

export function VisualFooter() {
  return (
    <footer className="mt-24 border-t border-[var(--color-ink-300)]/30 bg-[var(--color-canvas-100)]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_repeat(4,1fr)]">
          <div>
            <BrandMark />
            <p className="mt-4 max-w-xs text-sm text-[var(--text-subtle)]">
              A nurturing space where Montessori meets Vedic wisdom — for curious minds, kind hearts and a brighter tomorrow.
            </p>
          </div>
          {COLUMNS.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-semibold text-[var(--text-primary)]">{column.title}</h3>
              <ul className="mt-3 space-y-2">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-[var(--text-subtle)] hover:text-[var(--text-primary)]">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-12 text-xs text-[var(--text-subtle)]">
          © {new Date().getFullYear()} Mums &amp; Cubs. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
