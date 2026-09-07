import Image from "next/image";
import Link from "next/link";

export function BrandMark() {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="Mums & Cubs home">
      <Image
        src="/brand/mc-logo-icon-square.png"
        alt="Mums & Cubs logo — a mother bear hugging her cub"
        width={44}
        height={44}
        className="h-11 w-11 rounded-full"
        priority
      />
      <span className="leading-tight">
        <span className="block font-display text-lg font-semibold text-[var(--text-primary)]">Mums &amp; Cubs</span>
        <span className="block text-[11px] tracking-wide text-[var(--text-subtle)]">Rooted Learning · Brighter Tomorrows</span>
      </span>
    </Link>
  );
}
