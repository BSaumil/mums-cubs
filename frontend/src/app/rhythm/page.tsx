import type { Metadata } from "next";
import Link from "next/link";
import { Icon, type IconName } from "@/components/icons/Icon";
import { getCurriculumAreaBySlug } from "@/lib/content/curriculum-areas";

export const metadata: Metadata = {
  title: "Daily Rhythm",
  description: "A sunrise-to-sunset example rhythm — a scaffold for families to adapt, not a schedule to follow exactly.",
};

const CYCLE: { label: string; icon: IconName }[] = [
  { label: "Sunrise", icon: "sun" },
  { label: "Wake", icon: "sun" },
  { label: "Care of self", icon: "heart" },
  { label: "Movement", icon: "group" },
  { label: "Focused learning", icon: "book" },
  { label: "Nature", icon: "leaf" },
  { label: "Shared meal", icon: "heart" },
  { label: "Creative activity", icon: "jug" },
  { label: "Family time", icon: "group" },
  { label: "Quiet transition", icon: "moon" },
  { label: "Sleep", icon: "moon" },
];

const dailyRhythmArea = getCurriculumAreaBySlug("daily-rhythm");

export default function RhythmPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-ink-700)]">Gurukul-Inspired Practice</p>
      <h1 className="mt-2 text-4xl font-semibold text-[var(--text-primary)]">Dinacharya / Daily Rhythm</h1>
      <p className="mt-3 text-[var(--text-secondary)]">
        Repeated rhythms help children understand sequence, transition and rest. What follows is one illustrative
        example — every family&apos;s rhythm looks different, and this is a scaffold to adapt, not a schedule to
        enforce.
      </p>

      <ol className="mt-10 space-y-1">
        {CYCLE.map((moment, index) => (
          <li key={moment.label} className="flex items-center gap-4 border-l-2 border-sky-300 py-3 pl-5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-50 text-[var(--color-ink-700)]">
              <Icon name={moment.icon} className="h-4.5 w-4.5" />
            </span>
            <span className="text-sm text-[var(--text-subtle)]">{String(index + 1).padStart(2, "0")}</span>
            <span className="font-medium text-[var(--text-primary)]">{moment.label}</span>
          </li>
        ))}
      </ol>

      <div className="mt-10 rounded-panel bg-surface-muted p-6">
        <p className="text-sm text-[var(--text-secondary)]">
          A customisable rhythm builder — where a family arranges and saves their own sequence — is planned next. For
          now, see it in practice through the activity below.
        </p>
        {dailyRhythmArea?.activities[0] ? (
          <Link
            href={`/activities/${dailyRhythmArea.activities[0].slug}`}
            className="mt-3 inline-flex min-h-11 items-center text-sm font-medium text-wood-700 hover:underline"
          >
            See “{dailyRhythmArea.activities[0].title}” →
          </Link>
        ) : null}
      </div>
    </div>
  );
}
