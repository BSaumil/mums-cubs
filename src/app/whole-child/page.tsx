import type { Metadata } from "next";
import { WholeChildMap } from "@/components/discover/WholeChildMap";

export const metadata: Metadata = {
  title: "Whole-Child Map",
  description: "How curriculum areas from both paths connect to eight developmental domains.",
};

export default function WholeChildPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-widest text-wood-700">Whole-Child Outcomes</p>
      <h1 className="mt-2 text-4xl font-semibold">One child, many domains.</h1>
      <p className="mt-3 max-w-xl text-[var(--text-secondary)]">
        Montessori and Vedic-inspired activities are distinct practices, but both are read here through the same
        eight developmental domains. Choose one to see what it looks like day to day, and which curriculum areas
        touch it.
      </p>

      <div className="mt-10">
        <WholeChildMap />
      </div>
    </div>
  );
}
