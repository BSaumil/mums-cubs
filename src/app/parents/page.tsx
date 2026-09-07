import type { Metadata } from "next";
import { curriculumAreas } from "@/lib/content/curriculum-areas";

export const metadata: Metadata = {
  title: "For Parents",
  description: "What to observe at home, area by area — and how to join the Mums & Cubs community.",
};

export default function ParentsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-widest text-wood-700">For Parents</p>
      <h1 className="mt-2 text-4xl font-semibold">Watch, don&apos;t direct.</h1>
      <p className="mt-3 max-w-xl text-[var(--text-secondary)]">
        The most useful thing a parent can do at home is observe without correcting. Here is what to look for, area
        by area.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {curriculumAreas.map((area) => (
          <div key={area.id} className="rounded-card bg-surface-raised p-5 shadow-resting">
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-subtle)]">{area.title}</p>
            <p className="mt-1.5 text-sm text-[var(--text-secondary)]">{area.parentObservation}</p>
          </div>
        ))}
      </div>

      <div className="mt-14 rounded-panel bg-wood-700 p-8 text-center text-white">
        <h2 className="font-display text-2xl font-semibold text-white">Join Our Community</h2>
        <p className="mt-2 text-white/85">
          A private space for parents to ask questions, share observations, and hear from educators.
        </p>
      </div>
    </div>
  );
}
