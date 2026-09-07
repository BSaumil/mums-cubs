import type { Metadata } from "next";
import { MaterialGallery } from "@/components/home/MaterialGallery";
import { ResponsiveArt } from "@/components/media/ResponsiveArt";
import { materials } from "@/lib/content/materials";

export const metadata: Metadata = {
  title: "Materials",
  description: "Every tactile material a child touches at Mums & Cubs, filterable by category.",
};

export default function MaterialsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="relative mb-10 aspect-[16/9] w-full overflow-hidden rounded-hero shadow-floating sm:aspect-[21/9]" data-testid="materials-hub-hero">
        <ResponsiveArt
          asset={{
            id: "mc-gen-materials-hub-1024",
            src: "/images/real/mc-gen-materials-hub-1024.jpg",
            alt: "A wooden shelf holding real Montessori and Vedic learning materials side by side.",
            width: 1024,
            height: 1024,
            type: "photo",
            dominantTone: "wood",
            isPlaceholder: false,
          }}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

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
