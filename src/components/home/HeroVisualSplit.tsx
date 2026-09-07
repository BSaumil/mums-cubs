import Link from "next/link";
import { ResponsiveArt } from "@/components/media/ResponsiveArt";
import { Icon, type IconName } from "@/components/icons/Icon";
import type { VisualAsset } from "@/lib/types";

const FEATURES: { icon: IconName; label: string }[] = [
  { icon: "leaf", label: "Curious" },
  { icon: "sun", label: "Confident" },
  { icon: "heart", label: "Compassionate" },
  { icon: "group", label: "Connected" },
];

interface HeroVisualSplitProps {
  montessoriHero: VisualAsset;
  vedicHero: VisualAsset;
}

export function HeroVisualSplit({ montessoriHero, vedicHero }: HeroVisualSplitProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pt-16">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <p className="flex items-center gap-1.5 font-display text-base italic text-[var(--color-love)]">
            <Icon name="heart" className="h-4 w-4" />
            More than learning, a brighter tomorrow.
          </p>
          <h1 className="mt-2 text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl">
            Small Hands.
            <br />
            Big Possibilities.
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-[var(--text-secondary)]">
            A nurturing space where Montessori meets Vedic wisdom — for curious minds, kind hearts and a brighter
            tomorrow.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/discover"
              className="inline-flex min-h-11 items-center gap-2 rounded-capsule bg-wood-700 px-6 py-3 text-sm font-medium text-white shadow-resting transition-transform hover:-translate-y-0.5"
            >
              Explore the Learning Paths
              <Icon name="arrow-right" className="h-4 w-4" />
            </Link>
            <Link
              href="/philosophy"
              className="inline-flex min-h-11 items-center gap-2 rounded-capsule border border-[var(--color-ink-300)]/50 px-6 py-3 text-sm font-medium text-[var(--text-primary)] hover:border-wood-500"
            >
              Our Philosophy
            </Link>
          </div>
          <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
            {FEATURES.map((feature) => (
              <li key={feature.label} className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-wood-100 text-wood-700">
                  <Icon name={feature.icon} className="h-4.5 w-4.5" />
                </span>
                <span className="text-sm font-medium text-[var(--text-secondary)]">{feature.label}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative">
          <div className="relative aspect-[4/3] overflow-hidden rounded-hero shadow-floating">
            <ResponsiveArt asset={montessoriHero} fill priority sizes="(min-width: 1024px) 560px, 90vw" className="object-cover" />
          </div>
          <div className="absolute -bottom-8 -left-6 w-2/5 overflow-hidden rounded-panel shadow-floating ring-4 ring-[var(--color-canvas-50)] sm:-left-10">
            <ResponsiveArt asset={vedicHero} sizes="240px" className="aspect-video w-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
