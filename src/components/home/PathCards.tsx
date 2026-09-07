import Link from "next/link";
import { ResponsiveArt } from "@/components/media/ResponsiveArt";
import { Icon } from "@/components/icons/Icon";
import type { VisualAsset } from "@/lib/types";

const CARDS: { href: string; title: string; description: string; assetKey: "montessori" | "vedic" }[] = [
  { href: "/discover/montessori", title: "The Montessori Path", description: "Hands-on. Child-led. Real-world skills.", assetKey: "montessori" },
  { href: "/discover/vedic", title: "The Vedic Path", description: "Inner strength. Ancient wisdom. Modern life.", assetKey: "vedic" },
];

export function PathCards({ montessoriHero, vedicHero }: { montessoriHero: VisualAsset; vedicHero: VisualAsset }) {
  const assets = { montessori: montessoriHero, vedic: vedicHero };

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-semibold sm:text-4xl">
          Two Beautiful Paths, One Brighter Tomorrow
        </h2>
        <p className="mt-3 text-[var(--text-secondary)]">
          Explore two time-tested approaches, designed to nurture the whole child.
        </p>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {CARDS.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="group relative block overflow-hidden rounded-panel shadow-tray transition-transform hover:-translate-y-1"
          >
            <div className="relative aspect-[16/10]">
              <ResponsiveArt asset={assets[card.assetKey]} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-[var(--duration-zoom)] group-hover:scale-[1.04]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink-900)]/75 via-[var(--color-ink-900)]/10 to-transparent" />
            </div>
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
              <div>
                <h3 className="font-display text-2xl font-semibold text-white">{card.title}</h3>
                <p className="mt-1 text-sm text-white/85">{card.description}</p>
              </div>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-wood-700 transition-transform group-hover:translate-x-0.5">
                <Icon name="arrow-right" className="h-5 w-5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
