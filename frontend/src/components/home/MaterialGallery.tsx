"use client";

import { useMemo, useState } from "react";
import { MaterialObjectCard } from "@/components/cards/MaterialObjectCard";
import type { Material } from "@/lib/types";

type CategoryFilter = "all" | Material["category"];

const CATEGORIES: { id: CategoryFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "practical", label: "Practical" },
  { id: "sensorial", label: "Sensorial" },
  { id: "language", label: "Language" },
  { id: "math", label: "Math" },
  { id: "nature", label: "Nature" },
  { id: "sound", label: "Sound" },
  { id: "rhythm", label: "Rhythm" },
];

/** Client component: local filter state only, per performance budget. */
export function MaterialGallery({ materials }: { materials: Material[] }) {
  const [active, setActive] = useState<CategoryFilter>("all");

  const visible = useMemo(
    () =>
      active === "all"
        ? materials
        : materials.filter((material) => material.category === active || material.tags?.includes(active)),
    [materials, active],
  );

  return (
    <div>
      <div className="no-scrollbar flex gap-2 overflow-x-auto pb-2" role="group" aria-label="Filter materials by category">
        {CATEGORIES.map((category) => {
          const isActive = category.id === active;
          return (
            <button
              key={category.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActive(category.id)}
              className={`min-h-11 shrink-0 rounded-capsule px-4 py-2 text-sm font-medium transition-colors ${
                isActive ? "bg-wood-700 text-white" : "bg-surface-muted text-[var(--text-secondary)] hover:bg-wood-100"
              }`}
            >
              {category.label}
            </button>
          );
        })}
      </div>
      <div aria-live="polite">
        {visible.length > 0 ? (
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {visible.map((material) => (
              <MaterialObjectCard key={material.id} material={material} />
            ))}
          </div>
        ) : (
          <div className="mt-6 flex flex-col items-center gap-3 py-12 text-center">
            <p className="text-[var(--text-subtle)]">No materials match this filter yet.</p>
            <button
              type="button"
              onClick={() => setActive("all")}
              className="min-h-11 rounded-capsule bg-wood-700 px-4 py-2 text-sm font-medium text-white"
            >
              View all materials
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
