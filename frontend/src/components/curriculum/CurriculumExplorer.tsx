"use client";

import { useMemo, useState } from "react";
import { CurriculumAreaCard } from "@/components/cards/CurriculumAreaCard";
import { track } from "@/lib/analytics";
import type { AgeBand, CurriculumArea, Paradigm } from "@/lib/types";

type ParadigmFilter = "all" | Paradigm;
type AgeFilter = "all" | AgeBand;

const PARADIGM_OPTIONS: { id: ParadigmFilter; label: string }[] = [
  { id: "all", label: "All Paths" },
  { id: "montessori", label: "Montessori" },
  { id: "vedic", label: "Vedic" },
];

const AGE_OPTIONS: { id: AgeFilter; label: string }[] = [
  { id: "all", label: "All Ages" },
  { id: "18m-3", label: "18m–3" },
  { id: "3-6", label: "3–6" },
  { id: "6-9", label: "6–9" },
  { id: "9-12", label: "9–12" },
];

export function CurriculumExplorer({ areas }: { areas: CurriculumArea[] }) {
  const [paradigm, setParadigm] = useState<ParadigmFilter>("all");
  const [age, setAge] = useState<AgeFilter>("all");

  const visible = useMemo(
    () =>
      areas.filter((area) => {
        const matchesParadigm = paradigm === "all" || area.paradigm === paradigm;
        const matchesAge = age === "all" || area.ageBands.includes(age);
        return matchesParadigm && matchesAge;
      }),
    [areas, paradigm, age],
  );

  return (
    <div>
      <div className="sticky top-[73px] z-30 -mx-4 border-b border-[var(--color-ink-300)]/30 bg-[var(--color-canvas-50)]/95 px-4 py-4 backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
          <fieldset className="flex flex-wrap items-center gap-2">
            <legend className="mr-1 text-xs font-semibold uppercase tracking-wide text-[var(--text-subtle)]">Path</legend>
            {PARADIGM_OPTIONS.map((option) => (
              <button
                key={option.id}
                type="button"
                aria-pressed={paradigm === option.id}
                onClick={() => setParadigm(option.id)}
                className={`min-h-9 rounded-capsule px-3.5 py-1.5 text-sm font-medium transition-colors ${
                  paradigm === option.id ? "bg-wood-700 text-white" : "bg-surface-muted text-[var(--text-secondary)] hover:bg-wood-100"
                }`}
              >
                {option.label}
              </button>
            ))}
          </fieldset>
          <fieldset className="flex flex-wrap items-center gap-2">
            <legend className="mr-1 text-xs font-semibold uppercase tracking-wide text-[var(--text-subtle)]">Age</legend>
            {AGE_OPTIONS.map((option) => (
              <button
                key={option.id}
                type="button"
                aria-pressed={age === option.id}
                onClick={() => {
                  setAge(option.id);
                  track("age_band_changed", { age: option.id });
                }}
                className={`min-h-9 rounded-capsule px-3.5 py-1.5 text-sm font-medium transition-colors ${
                  age === option.id ? "bg-wood-700 text-white" : "bg-surface-muted text-[var(--text-secondary)] hover:bg-wood-100"
                }`}
              >
                {option.label}
              </button>
            ))}
          </fieldset>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
        {visible.length > 0 ? (
          visible.map((area, index) => <CurriculumAreaCard key={area.id} area={area} priority={index === 0} />)
        ) : (
          <p className="col-span-full py-12 text-center text-[var(--text-subtle)]">
            No curriculum areas match these filters yet — try a different combination.
          </p>
        )}
      </div>
    </div>
  );
}
