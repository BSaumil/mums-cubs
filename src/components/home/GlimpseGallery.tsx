import Link from "next/link";
import { ResponsiveArt } from "@/components/media/ResponsiveArt";
import type { CurriculumArea } from "@/lib/types";

const CAPTIONS: Record<string, string> = {
  "practical-life": "Independence in action",
  sensorial: "Refining the senses",
  language: "Words open worlds",
  mathematics: "Numbers make sense",
  "culture-science": "A bigger, brighter world",
  "daily-rhythm": "A rhythm, not a rigid schedule",
};

export function GlimpseGallery({ areas }: { areas: CurriculumArea[] }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-semibold text-[var(--text-primary)] sm:text-4xl">A Glimpse Into Their World</h2>
          <p className="mt-2 text-[var(--text-secondary)]">Real materials. Real moments. Real growth.</p>
        </div>
        <Link href="/curriculum" className="text-sm font-medium text-[var(--text-primary)] hover:underline">
          View Gallery →
        </Link>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {areas.map((area) => (
          <Link key={area.id} href={`/curriculum/${area.slug}`} className="group block">
            <div className="relative aspect-square overflow-hidden rounded-card shadow-resting">
              <ResponsiveArt
                asset={area.heroAsset}
                fill
                sizes="(min-width: 1024px) 180px, 45vw"
                className="object-cover transition-transform duration-[var(--duration-zoom)] group-hover:scale-[1.05]"
              />
            </div>
            <p className="mt-2 text-sm font-semibold text-[var(--text-primary)]">{area.title}</p>
            <p className="text-xs text-[var(--text-subtle)]">{CAPTIONS[area.slug] ?? area.leadSentence}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
