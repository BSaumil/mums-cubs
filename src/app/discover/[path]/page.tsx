import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CurriculumAreaCard } from "@/components/cards/CurriculumAreaCard";
import { VisualBadge } from "@/components/ui/VisualBadge";
import { getFramework, isFrameworkId, learningFrameworks } from "@/lib/content/learning-frameworks";

interface DiscoverPathPageProps {
  params: Promise<{ path: string }>;
}

export function generateStaticParams() {
  return learningFrameworks.map((framework) => ({ path: framework.id }));
}

export async function generateMetadata({ params }: DiscoverPathPageProps): Promise<Metadata> {
  const { path } = await params;
  if (!isFrameworkId(path)) return {};
  return { title: getFramework(path)!.name };
}

export default async function DiscoverPathPage({ params }: DiscoverPathPageProps) {
  const { path } = await params;
  if (!isFrameworkId(path)) notFound();
  const framework = getFramework(path)!;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="max-w-2xl">
        <VisualBadge label={framework.visualTheme} paradigm={framework.id === "integrated" ? undefined : framework.id} />
        <h1 className="mt-3 text-4xl font-semibold">{framework.name}</h1>
      </header>

      <section className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {framework.principles.map((principle) => (
          <div key={principle.id} className="rounded-card bg-surface-raised p-5 shadow-resting">
            <h2 className="font-semibold">{principle.title}</h2>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">{principle.description}</p>
          </div>
        ))}
      </section>

      {framework.traditions && framework.traditions.length > 0 ? (
        <section className="mt-10 rounded-panel bg-saffron-50 p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-saffron-700">Cultural / Philosophical Framework</p>
          {framework.traditions.map((tradition) => (
            <div key={tradition.id} className="mt-2">
              <h2 className="font-semibold">{tradition.title}</h2>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">{tradition.summary}</p>
            </div>
          ))}
        </section>
      ) : null}

      <section className="mt-14">
        <h2 className="text-2xl font-semibold">Curriculum Areas</h2>
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {framework.curriculumAreas.map((area) => (
            <CurriculumAreaCard key={area.id} area={area} />
          ))}
        </div>
      </section>
    </div>
  );
}
