import type { Metadata } from "next";
import { PathCards } from "@/components/home/PathCards";
import Link from "next/link";
import { ResponsiveArt } from "@/components/media/ResponsiveArt";
import { Icon } from "@/components/icons/Icon";
import { homepageHeroAssets } from "@/lib/content/home";
import { getCurriculumAreaBySlug } from "@/lib/content/curriculum-areas";

export const metadata: Metadata = {
  title: "Discover",
  description: "Choose the Montessori path, the Vedic path, or an integrated view of both.",
};

const integratedAsset = getCurriculumAreaBySlug("culture-science")!.heroAsset;

export default function DiscoverPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-wood-700">Discover</p>
        <h1 className="mt-2 text-4xl font-semibold">Choose how you&apos;d like to explore.</h1>
        <p className="mt-3 text-[var(--text-secondary)]">
          Each path keeps its own integrity — nothing here is blended into a single blurred method.
        </p>
      </header>

      <div className="-mx-4 sm:-mx-6 lg:-mx-8">
        <PathCards montessoriHero={homepageHeroAssets.montessori} vedicHero={homepageHeroAssets.vedic} />
      </div>

      <Link
        href="/discover/integrated"
        className="group relative mt-2 block overflow-hidden rounded-panel shadow-tray transition-transform hover:-translate-y-1"
      >
        <div className="relative aspect-[21/9]">
          <ResponsiveArt asset={integratedAsset} fill sizes="100vw" className="object-cover transition-transform duration-[var(--duration-zoom)] group-hover:scale-[1.03]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink-900)]/75 via-[var(--color-ink-900)]/15 to-transparent" />
        </div>
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
          <div>
            <h2 className="font-display text-2xl font-semibold text-white">Integrated Path</h2>
            <p className="mt-1 text-sm text-white/85">Both paths, read through shared whole-child outcomes.</p>
          </div>
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-wood-700">
            <Icon name="arrow-right" className="h-5 w-5" />
          </span>
        </div>
      </Link>

      <Link
        href="/whole-child"
        className="mt-6 flex items-center justify-between gap-4 rounded-panel bg-surface-raised p-6 shadow-resting hover:shadow-tray"
      >
        <div>
          <h2 className="font-display text-xl font-semibold">Explore the Whole-Child map</h2>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            See how curriculum areas from both paths connect to eight developmental domains.
          </p>
        </div>
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-wood-100 text-wood-700">
          <Icon name="arrow-right" className="h-5 w-5" />
        </span>
      </Link>
    </div>
  );
}
