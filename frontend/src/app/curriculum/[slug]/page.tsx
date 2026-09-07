import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AnalyticsBeacon } from "@/components/analytics/AnalyticsBeacon";
import { ResponsiveArt } from "@/components/media/ResponsiveArt";
import { VisualBadge } from "@/components/ui/VisualBadge";
import { PhotoTray } from "@/components/cards/PhotoTray";
import { MaterialObjectCard } from "@/components/cards/MaterialObjectCard";
import { ParentJournal } from "@/components/curriculum/ParentJournal";
import { curriculumAreas, getCurriculumAreaBySlug } from "@/lib/content/curriculum-areas";
import { DOMAIN_LABEL } from "@/lib/content/development-domains";
import { getMaterialById } from "@/lib/content/materials";
import { breadcrumbJsonLd, jsonLdScript } from "@/lib/structured-data";

interface AreaPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return curriculumAreas.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({ params }: AreaPageProps): Promise<Metadata> {
  const { slug } = await params;
  const area = getCurriculumAreaBySlug(slug);
  if (!area) return {};
  return { title: area.title, description: area.leadSentence };
}

const AGE_LABEL: Record<string, string> = {
  "18m-3": "18 months – 3 years",
  "3-6": "3 – 6 years",
  "6-9": "6 – 9 years",
  "9-12": "9 – 12 years",
};

export default async function CurriculumAreaPage({ params }: AreaPageProps) {
  const { slug } = await params;
  const area = getCurriculumAreaBySlug(slug);
  if (!area) notFound();

  const materials = area.materialIds.map(getMaterialById).filter((material) => material !== undefined);
  const related = area.relatedAreas.map(getCurriculumAreaBySlug).filter((item) => item !== undefined);

  return (
    <article>
      <AnalyticsBeacon event="curriculum_area_viewed" properties={{ slug: area.slug, paradigm: area.paradigm }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript(
            breadcrumbJsonLd([
              { name: "Curriculum", path: "/curriculum" },
              { name: area.title, path: `/curriculum/${area.slug}` },
            ]),
          ),
        }}
      />
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <div className="relative aspect-square w-full max-w-2xl overflow-hidden rounded-hero shadow-floating sm:aspect-[16/9] sm:max-w-none" data-testid={`curriculum-area-hero-${area.slug}`}>
          <ResponsiveArt asset={area.heroAsset} fill priority sizes="(min-width: 1024px) 1200px, 100vw" className="object-cover" />
        </div>
        <VisualBadge label={area.contextLabel} paradigm={area.paradigm} />
        <h1 className="mt-3 font-display text-4xl font-semibold text-[var(--text-primary)] sm:text-5xl">{area.title}</h1>
        <p className="mt-2 max-w-xl text-[var(--text-secondary)]">{area.leadSentence}</p>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-2">
          {area.ageBands.map((band) => (
            <VisualBadge key={band} label={AGE_LABEL[band]} />
          ))}
          {area.developmentalDomains.map((domain) => (
            <span
              key={domain}
              className="inline-flex items-center rounded-capsule bg-surface-muted px-3 py-1 text-xs font-medium text-[var(--text-secondary)]"
            >
              {DOMAIN_LABEL[domain]}
            </span>
          ))}
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Activities</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {area.activities.map((activity) => (
              <PhotoTray
                key={activity.id}
                id={activity.id}
                image={activity.visual}
                title={activity.title}
                lead={activity.objective}
                paradigm={area.paradigm}
                ageBand={activity.ageBand}
                objective={activity.objective}
                skillTags={[{ id: activity.id, label: activity.contextLabel }]}
                materialName={activity.materials[0]?.name}
                href={`/activities/${activity.slug}`}
              />
            ))}
          </div>
        </section>

        {materials.length > 0 ? (
          <section className="mt-14">
            <h2 className="text-2xl font-semibold">Materials Used</h2>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {materials.map((material, index) => (
                <MaterialObjectCard key={material.id} material={material} priority={index === 0} />
              ))}
            </div>
          </section>
        ) : null}

        <section className="mt-14 max-w-2xl rounded-panel bg-surface-muted p-8">
          <h2 className="text-xl font-semibold">What to observe as a parent</h2>
          <p className="mt-2 text-[var(--text-secondary)]">{area.parentObservation}</p>
          <ParentJournal areaSlug={area.slug} />
        </section>

        {related.length > 0 ? (
          <section className="mt-14">
            <h2 className="text-2xl font-semibold">Related Areas</h2>
            <ul className="mt-4 flex flex-wrap gap-3">
              {related.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`/curriculum/${item.slug}`}
                    className="inline-flex min-h-11 items-center rounded-capsule border border-[var(--color-ink-300)]/50 px-4 py-2 text-sm font-medium text-[var(--text-primary)] hover:border-wood-500"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </article>
  );
}
