import Image from "next/image";
import Link from "next/link";

/** Compact header/footer mark: the approved bear-and-cub emblem, no wordmark. */
export function BrandMark() {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label="Mums & Cubs home">
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-wood-100">
        <Image
          src="/brand/mums-cubs-logo-mark.svg"
          alt=""
          width={44}
          height={44}
          className="h-8 w-8 object-contain"
          unoptimized
          priority
        />
      </span>
      <span className="leading-tight">
        <span className="block font-display text-lg font-semibold text-[var(--text-heading)]">Mums &amp; Cubs</span>
        <span className="block text-[11px] tracking-wide text-[var(--text-subtle)]">Rooted Learning · Brighter Tomorrows</span>
      </span>
    </Link>
  );
}
