import type { Metadata } from "next";
import { MaterialGallery } from "@/components/home/MaterialGallery";
import { materials } from "@/lib/content/materials";

export const metadata: Metadata = {
  title: "Materials",
  description: "Every tactile material a child touches at Mums & Cubs, filterable by category.",
};

export default function MaterialsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-wood-700">Materials</p>
        <h1 className="mt-2 text-4xl font-semibold">The whole shelf, in one place.</h1>
        <p className="mt-3 text-[var(--text-secondary)]">
          Every material is real, self-correcting where possible, and sized for a child to use independently.
        </p>
      </header>
      <div className="mt-8">
        <MaterialGallery materials={materials} />
      </div>
    </div>
  );
}
