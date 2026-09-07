import type { Metadata } from "next";
import { curriculumAreas } from "@/lib/content/curriculum-areas";
import { ResponsiveArt } from "@/components/media/ResponsiveArt";

export const metadata: Metadata = {
  title: "For Parents",
  description: "What to observe at home, area by area — and how to join the Mums & Cubs community.",
};

export default function ParentsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-widest text-wood-700">For Parents</p>
      <h1 className="mt-2 text-4xl font-semibold text-[var(--text-primary)]">Watch, don&apos;t direct.</h1>
      <p className="mt-3 max-w-xl text-[var(--text-secondary)]">
        The most useful thing a parent can do at home is observe without correcting. Here is what to look for, area
        by area.
      </p>

      <div className="mt-8 relative aspect-square w-full max-w-sm overflow-hidden rounded-panel shadow-floating" data-testid="parents-character-visual">
        <ResponsiveArt
          asset={{
            id: "mc-real-character-development-1200",
            src: "/images/real/mc-real-character-development-1200.png",
            alt: "Two children sharing and building together — character development in action.",
            width: 1254,
            height: 1254,
            type: "photo",
            dominantTone: "wood",
            isPlaceholder: false,
          }}
          fill
          sizes="384px"
          className="object-cover"
        />
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {curriculumAreas.map((area) => (
          <div key={area.id} className="rounded-card bg-surface-raised p-5 shadow-resting">
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-subtle)]">{area.title}</p>
            <p className="mt-1.5 text-sm text-[var(--text-secondary)]">{area.parentObservation}</p>
          </div>
        ))}
      </div>

      <div className="mt-14 rounded-panel bg-wood-700 p-8 text-center text-white">
        <h2 className="font-display text-2xl font-semibold">Join Our Community</h2>
        <p className="mt-2 text-white/85">
          A private space for parents to ask questions, share observations, and hear from educators.
        </p>
      </div>
    </div>
  );
}
