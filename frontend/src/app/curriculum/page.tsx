import type { Metadata } from "next";
import { CurriculumExplorer } from "@/components/curriculum/CurriculumExplorer";
import { curriculumAreas } from "@/lib/content/curriculum-areas";

export const metadata: Metadata = {
  title: "Curriculum Hub",
  description: "Every Montessori and Vedic curriculum area, filterable by path and age.",
};

export default function CurriculumHubPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-wood-700">Curriculum Hub</p>
        <h1 className="mt-2 text-4xl font-semibold text-[var(--text-primary)]">Every area, one visual map.</h1>
        <p className="mt-3 text-[var(--text-secondary)]">
          Nine curriculum areas across two paths — filter by path and age to find where your child is right now.
        </p>
      </header>

      <div className="mt-8">
        <CurriculumExplorer areas={curriculumAreas} />
      </div>
    </div>
  );
}
