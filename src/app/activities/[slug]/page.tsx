import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AnalyticsBeacon } from "@/components/analytics/AnalyticsBeacon";
import { ResponsiveArt } from "@/components/media/ResponsiveArt";
import { VisualBadge } from "@/components/ui/VisualBadge";
import { Icon } from "@/components/icons/Icon";
import { curriculumAreas, getActivityBySlug } from "@/lib/content/curriculum-areas";

interface ActivityPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return curriculumAreas.flatMap((area) => area.activities.map((activity) => ({ slug: activity.slug })));
}

export async function generateMetadata({ params }: ActivityPageProps): Promise<Metadata> {
  const { slug } = await params;
  const found = getActivityBySlug(slug);
  if (!found) return {};
  return { title: found.activity.title, description: found.activity.objective };
}

export default async function ActivityPage({ params }: ActivityPageProps) {
  const { slug } = await params;
  const found = getActivityBySlug(slug);
  if (!found) notFound();
  const { activity, area } = found;

  return (
    <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <AnalyticsBeacon event="activity_started" properties={{ slug: activity.slug, areaSlug: area.slug }} />
      <Link href={`/curriculum/${area.slug}`} className="text-sm font-medium text-[var(--text-subtle)] hover:text-[var(--text-primary)]">
        ← {area.title}
      </Link>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <VisualBadge label={activity.contextLabel} paradigm={area.paradigm} />
        {activity.duration ? <VisualBadge label={`${activity.duration.min}–${activity.duration.max} min`} /> : null}
        <VisualBadge label={activity.environment === "either" ? "Indoor or outdoor" : activity.environment} />
      </div>

      <h1 className="mt-4 text-4xl font-semibold">{activity.title}</h1>
      <p className="mt-2 text-lg text-[var(--text-secondary)]">{activity.objective}</p>

      <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-hero shadow-floating">
        <ResponsiveArt asset={activity.visual} fill priority sizes="(min-width: 1024px) 800px, 100vw" className="object-cover" />
      </div>

      <ol className="mt-12 space-y-8">
        {activity.steps.map((step) => (
          <li key={step.order} className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative aspect-[4/5] w-full shrink-0 overflow-hidden rounded-tray sm:w-40">
              <ResponsiveArt asset={step.image} fill sizes="160px" className="object-cover" />
            </div>
            <div>
              <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-wood-700">
                <Icon name="arrow-right" className="h-3.5 w-3.5" />
                Step {step.order} · {step.actionVerb}
              </p>
              <p className="mt-1 text-base text-[var(--text-primary)]">{step.caption}</p>
            </div>
          </li>
        ))}
      </ol>

      {activity.materials.length > 0 ? (
        <section className="mt-12">
          <h2 className="text-lg font-semibold">Materials</h2>
          <ul className="mt-2 flex flex-wrap gap-2">
            {activity.materials.map((material) => (
              <li key={material.materialId} className="rounded-capsule bg-surface-muted px-3 py-1 text-sm text-[var(--text-secondary)]">
                {material.name}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="mt-10 rounded-panel bg-surface-muted p-8">
        <h2 className="text-lg font-semibold">What you might observe</h2>
        <ul className="mt-3 space-y-1.5 text-[var(--text-secondary)]">
          {activity.observableOutcomes.map((outcome) => (
            <li key={outcome}>· {outcome}</li>
          ))}
        </ul>
      </section>

      {activity.safetyNotes && activity.safetyNotes.length > 0 ? (
        <section className="mt-8">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-clay-700">Safety Notes</h2>
          <ul className="mt-2 space-y-1 text-sm text-[var(--text-secondary)]">
            {activity.safetyNotes.map((note) => (
              <li key={note}>· {note}</li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  );
}
