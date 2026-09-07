import Link from "next/link";
import { Icon } from "@/components/icons/Icon";
import { ResponsiveArt } from "@/components/media/ResponsiveArt";

export function CurriculumCTA() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
      <div className="relative flex flex-col items-center gap-6 overflow-hidden rounded-hero px-8 py-14 text-center text-white sm:px-16" data-testid="homepage-cta-banner">
        <ResponsiveArt
          asset={{
            id: "mc-gen-community-join-1024",
            src: "/images/real/mc-gen-community-join-1024.jpg",
            alt: "Parents and children sitting together on a rug, sharing a storybook.",
            width: 1024,
            height: 1024,
            type: "photo",
            dominantTone: "wood",
            isPlaceholder: false,
          }}
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[var(--color-ink-900)]/55" />
        <h2 className="relative max-w-xl font-display text-3xl font-semibold sm:text-4xl">
          Raising capable minds. Grounded hearts.
        </h2>
        <p className="relative max-w-md text-white/85">
          Walk through every curriculum area, filtered by age and by path, in one visual hub.
        </p>
        <Link
          href="/curriculum"
          className="relative inline-flex min-h-11 items-center gap-2 rounded-capsule bg-white px-6 py-3 text-sm font-semibold text-wood-700 transition-transform hover:-translate-y-0.5"
        >
          Explore the Curriculum Hub
          <Icon name="arrow-right" className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
