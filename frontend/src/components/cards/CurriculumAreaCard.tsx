import Link from "next/link";
import { ResponsiveArt } from "@/components/media/ResponsiveArt";
import { VisualBadge } from "@/components/ui/VisualBadge";
import type { CurriculumArea } from "@/lib/types";

export function CurriculumAreaCard({ area, priority }: { area: CurriculumArea; priority?: boolean }) {
  return (
    <Link
      href={`/curriculum/${area.slug}`}
      className="group block overflow-hidden rounded-card bg-surface-raised shadow-resting transition-shadow duration-[var(--duration-hover)] ease-[var(--ease-standard)] hover:shadow-tray focus-visible:shadow-tray"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <ResponsiveArt
          asset={area.heroAsset}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 360px, 90vw"
          className="object-cover transition-transform duration-[var(--duration-zoom)] ease-[var(--ease-standard)] group-hover:scale-[1.04]"
        />
        <div className="absolute left-3 top-3">
          <VisualBadge label={area.visualBadge} paradigm={area.paradigm} />
        </div>
      </div>
      <div className="p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-[var(--text-subtle)]">{area.contextLabel}</p>
        <h3 className="mt-1 text-lg font-semibold text-[var(--text-primary)]">{area.title}</h3>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">{area.leadSentence}</p>
      </div>
    </Link>
  );
}
