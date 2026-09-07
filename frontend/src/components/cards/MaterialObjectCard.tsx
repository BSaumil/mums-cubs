import { ResponsiveArt } from "@/components/media/ResponsiveArt";
import { VisualBadge } from "@/components/ui/VisualBadge";
import type { Material } from "@/lib/types";

const CATEGORY_LABEL: Record<Material["category"], string> = {
  practical: "Practical",
  sensorial: "Sensorial",
  language: "Language",
  math: "Math",
  nature: "Nature",
  sound: "Sound",
  rhythm: "Rhythm",
};

export function MaterialObjectCard({ material }: { material: Material }) {
  return (
    <article className="overflow-hidden rounded-card bg-surface-raised shadow-resting">
      <div className="relative aspect-square overflow-hidden">
        <ResponsiveArt asset={material.visual} fill sizes="(min-width: 1024px) 240px, 45vw" className="object-cover" />
      </div>
      <div className="p-3.5">
        <VisualBadge label={CATEGORY_LABEL[material.category]} paradigm={material.paradigm === "integrated" ? undefined : material.paradigm} />
        <h3 className="mt-2 text-sm font-semibold text-[var(--text-primary)]">{material.name}</h3>
        <p className="mt-1 text-xs leading-relaxed text-[var(--text-subtle)]">{material.description}</p>
      </div>
    </article>
  );
}
