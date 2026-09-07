import Link from "next/link";

/**
 * Simplified emblem in the brand's own palette: a mother bear (Earth Brown)
 * curved around a smaller cub (Sand) peeking out below. This is a redrawn
 * approximation of the illustrated logo in the brand style guide, not a
 * trace of it — swap the <svg> below for the real exported mark (SVG/PNG)
 * the moment it's available and nothing else needs to change.
 */
function BearMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true">
      <circle cx="18" cy="16" r="7.5" fill="var(--color-wood-500)" />
      <circle cx="46" cy="16" r="7.5" fill="var(--color-wood-500)" />
      <path
        d="M32 6c11.6 0 19 8.2 19 19.5S43.6 45 32 45 13 36.7 13 25.5 20.4 6 32 6Z"
        fill="var(--color-wood-500)"
      />
      <ellipse cx="32" cy="29" rx="8.5" ry="6.5" fill="var(--color-canvas-200)" />
      <path d="M27.5 28.5c1-1 3-1 4 0" stroke="var(--color-wood-700)" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M23 20.5c1.4-1.6 3.4-1.6 4.6-.4M36.4 20.1c1.2-1.2 3.2-1.2 4.6.4" stroke="var(--color-wood-700)" strokeWidth="1.6" strokeLinecap="round" />
      <path
        d="M16 41c2-6 8-9.5 16-9.5S46 35 48 41c1.6 4.8-2.2 12-16 12S14.4 45.8 16 41Z"
        fill="var(--color-wood-500)"
      />
      <circle cx="32" cy="46" r="10.5" fill="var(--color-canvas-200)" />
      <circle cx="24.5" cy="38.5" r="4" fill="var(--color-canvas-200)" />
      <circle cx="39.5" cy="38.5" r="4" fill="var(--color-canvas-200)" />
      <path d="M28.5 47c1.2-1 2.8-1 4 0" stroke="var(--color-wood-700)" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M25.5 43.2c.9-1 2.2-1 3 0M35.5 43.2c.8-1 2.1-1 3 0" stroke="var(--color-wood-700)" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

export function BrandMark() {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label="Mums & Cubs home">
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-wood-100">
        <BearMark className="h-8 w-8" />
      </span>
      <span className="leading-tight">
        <span className="block font-display text-lg font-semibold text-[var(--text-heading)]">Mums &amp; Cubs</span>
        <span className="block text-[11px] tracking-wide text-[var(--text-subtle)]">Rooted Learning · Brighter Tomorrows</span>
      </span>
    </Link>
  );
}
