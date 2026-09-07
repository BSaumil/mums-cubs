import type { Metadata } from "next";
import { GrowthTracker } from "@/components/growth/GrowthTracker";

export const metadata: Metadata = {
  title: "Growth Notes",
  description: "A private, per-device log of what you notice in your child's development — not a screening tool.",
};

export default function GrowthPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-widest text-wood-700">For Parents</p>
      <h1 className="mt-2 text-4xl font-semibold">Growth notes.</h1>
      <p className="mt-3 text-[var(--text-secondary)]">
        Small, dated observations add up to a picture over time — a first attempt at a button, a new word, a longer
        stretch of focus. Note what you notice, tagged loosely to a developmental area.
      </p>

      <div className="mt-10">
        <GrowthTracker />
      </div>
    </div>
  );
}
