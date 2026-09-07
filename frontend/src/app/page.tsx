import type { Metadata } from "next";
import { AnalyticsBeacon } from "@/components/analytics/AnalyticsBeacon";
import { HeroVisualSplit } from "@/components/home/HeroVisualSplit";
import { PathNavigator } from "@/components/home/PathNavigator";
import { PathCards } from "@/components/home/PathCards";
import { DiscoverySection } from "@/components/home/DiscoverySection";
import { GlimpseGallery } from "@/components/home/GlimpseGallery";
import { RealMomentsGallery } from "@/components/home/RealMomentsGallery";
import { MaterialGallery } from "@/components/home/MaterialGallery";
import { CurriculumCTA } from "@/components/home/CurriculumCTA";
import { curriculumAreas } from "@/lib/content/curriculum-areas";
import { materials } from "@/lib/content/materials";
import { homepageHeroAssets } from "@/lib/content/home";
import { realMoments } from "@/lib/content/real-moments";
import type { Paradigm } from "@/lib/types";

export const metadata: Metadata = {
  title: "Mums & Cubs — Rooted Learning, Brighter Tomorrows",
};

const VALID_PATHS: Paradigm[] = ["montessori", "vedic", "integrated"];

interface HomePageProps {
  searchParams: Promise<{ path?: string }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const explicitPath = VALID_PATHS.includes(params.path as Paradigm) ? (params.path as Paradigm) : undefined;
  const activePath: Paradigm = explicitPath ?? "integrated";

  const montessoriAreas = curriculumAreas.filter((area) => area.paradigm === "montessori");
  const vedicAreas = curriculumAreas.filter((area) => area.paradigm === "vedic");
  const glimpseAreas = [...montessoriAreas.slice(0, 5), curriculumAreas.find((area) => area.slug === "daily-rhythm")!];

  const discoveryOrder =
    activePath === "vedic"
      ? (["vedic", "montessori"] as const)
      : (["montessori", "vedic"] as const);

  const sections = {
    montessori: (
      <DiscoverySection
        key="montessori"
        paradigm="montessori"
        title="The Montessori Path"
        lead="Hands-on materials that turn everyday movement into independence."
        areas={montessoriAreas.slice(0, 3)}
      />
    ),
    vedic: (
      <DiscoverySection
        key="vedic"
        paradigm="vedic"
        title="The Vedic Path"
        lead="Rhythm, number sense and nature connection, drawn from Gurukul-inspired practice."
        areas={vedicAreas.slice(0, 3)}
      />
    ),
  };

  return (
    <>
      {explicitPath ? <AnalyticsBeacon event="path_selected" properties={{ path: explicitPath }} /> : null}

      <HeroVisualSplit montessoriHero={homepageHeroAssets.overview} vedicHero={homepageHeroAssets.vedic} />

      <PathCards montessoriHero={homepageHeroAssets.montessori} vedicHero={homepageHeroAssets.vedic} />

      <RealMomentsGallery moments={realMoments} />

      <section id="explore" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-4 sm:px-6 lg:px-8">
        <PathNavigator activePath={activePath} />
      </section>

      {discoveryOrder.map((key) => sections[key])}

      <GlimpseGallery areas={glimpseAreas} />

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold sm:text-4xl">Live Material Gallery</h2>
        <p className="mt-2 max-w-xl text-[var(--text-secondary)]">
          Every material a child touches, in one place — filter by the kind of work it invites.
        </p>
        <div className="mt-8">
          <MaterialGallery materials={materials} />
        </div>
      </section>

      <CurriculumCTA />
    </>
  );
}
