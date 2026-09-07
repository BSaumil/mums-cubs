import type { Metadata } from "next";
import Link from "next/link";
import { RhythmBuilder } from "@/components/rhythm/RhythmBuilder";
import { RhythmTimeline } from "@/components/rhythm/RhythmTimeline";
import { getCurriculumAreaBySlug } from "@/lib/content/curriculum-areas";
import { DEFAULT_RHYTHM } from "@/lib/content/rhythm-defaults";

export const metadata: Metadata = {
  title: "Daily Rhythm",
  description: "A sunrise-to-sunset example rhythm — a scaffold for families to adapt, not a schedule to follow exactly.",
};

const dailyRhythmArea = getCurriculumAreaBySlug("daily-rhythm");

export default function RhythmPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-ink-700)]">Gurukul-Inspired Practice</p>
      <h1 className="mt-2 text-4xl font-semibold">Dinacharya / Daily Rhythm</h1>
      <p className="mt-3 text-[var(--text-secondary)]">
        Repeated rhythms help children understand sequence, transition and rest. What follows is one illustrative
        example — every family&apos;s rhythm looks different, and this is a scaffold to adapt, not a schedule to
        enforce.
      </p>

      <RhythmTimeline moments={DEFAULT_RHYTHM} />

      <RhythmBuilder />

      {dailyRhythmArea?.activities[0] ? (
        <p className="mt-6 text-sm text-[var(--text-secondary)]">
          See a rhythm moment in practice:{" "}
          <Link href={`/activities/${dailyRhythmArea.activities[0].slug}`} className="font-medium text-wood-700 hover:underline">
            {dailyRhythmArea.activities[0].title}
          </Link>
        </p>
      ) : null}
    </div>
  );
}
