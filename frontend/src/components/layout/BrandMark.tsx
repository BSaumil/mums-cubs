import Link from "next/link";

export function BrandMark() {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label="Mums & Cubs home">
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-wood-100 text-wood-700">
        <svg viewBox="0 0 40 40" className="h-7 w-7" fill="none" aria-hidden="true">
          <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="1.75" />
          <circle cx="14" cy="15" r="3.4" fill="none" stroke="currentColor" strokeWidth="1.75" />
          <circle cx="26" cy="15" r="3.4" fill="none" stroke="currentColor" strokeWidth="1.75" />
          <path d="M12 27c1.5-4 4.5-6 8-6s6.5 2 8 6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        </svg>
      </span>
      <span className="leading-tight">
        <span className="block font-display text-lg font-semibold text-[var(--text-primary)]">Mums &amp; Cubs</span>
        <span className="block text-[11px] tracking-wide text-[var(--text-subtle)]">Rooted Learning · Brighter Tomorrows</span>
      </span>
    </Link>
  );
}
