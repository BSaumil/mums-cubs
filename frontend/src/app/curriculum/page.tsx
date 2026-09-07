import type { Metadata } from "next";
import { CurriculumExplorer } from "@/components/curriculum/CurriculumExplorer";
import { ResponsiveArt } from "@/components/media/ResponsiveArt";
import { curriculumAreas } from "@/lib/content/curriculum-areas";

export const metadata: Metadata = {
  title: "Curriculum Hub",
  description: "Every Montessori and Vedic curriculum area, filterable by path and age.",
};

export default function CurriculumHubPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="relative mb-10 aspect-[16/9] w-full overflow-hidden rounded-hero shadow-floating sm:aspect-[21/9]" data-testid="curriculum-hub-hero">
        <ResponsiveArt
          asset={{
            id: "mc-gen-curriculum-hub-1024",
            src: "/images/real/mc-gen-curriculum-hub-1024.jpg",
            alt: "An overhead flat-lay of Montessori and Vedic materials arranged together on a wooden table.",
            width: 1024,
            height: 1024,
            type: "photo",
            dominantTone: "clay",
            isPlaceholder: false,
          }}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <header className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-wood-700">Curriculum Hub</p>
        <h1 className="mt-2 text-4xl font-semibold">Every area, one visual map.</h1>
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
