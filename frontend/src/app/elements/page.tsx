import type { Metadata } from "next";
import { FiveElementsGrid } from "@/components/discover/FiveElementsGrid";

export const metadata: Metadata = {
  alternates: { canonical: "/elements" },
  title: "The Five Elements",
  description: "Pancha Mahabhuta — a cultural and philosophical lens for observation, explored one element at a time.",
};

export default function ElementsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-widest text-wood-700">Cultural / Philosophical Framework</p>
      <h1 className="mt-2 text-4xl font-semibold">Pancha Mahabhuta.</h1>
      <p className="mt-3 text-[var(--text-secondary)]">
        The five great elements — Earth, Water, Fire, Air and Space — are a cultural and philosophical framework from
        Vedic tradition. They&apos;re presented here as a lens for observation and conversation with children, not as
        a replacement for modern scientific elemental theory.
      </p>

      <div className="mt-10">
        <FiveElementsGrid />
      </div>
    </div>
  );
}
