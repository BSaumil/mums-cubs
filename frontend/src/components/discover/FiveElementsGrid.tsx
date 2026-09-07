"use client";

import { useState, type KeyboardEvent } from "react";
import { Icon } from "@/components/icons/Icon";
import { track } from "@/lib/analytics";
import { FIVE_ELEMENTS } from "@/lib/content/five-elements";

function tabId(id: string) {
  return `element-tab-${id}`;
}

function panelId(id: string) {
  return `element-panel-${id}`;
}

/**
 * An accessible ARIA tablist (arrow-key roving focus) + single detail
 * panel — the same pattern as the Whole-Child map, reused here for the
 * five elements grid rather than a literal spatial diagram.
 */
export function FiveElementsGrid() {
  const [activeId, setActiveId] = useState(FIVE_ELEMENTS[0].id);
  const active = FIVE_ELEMENTS.find((element) => element.id === activeId) ?? FIVE_ELEMENTS[0];

  function select(id: string) {
    setActiveId(id);
    track("element_opened", { element: id });
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const nextIndex = (index + direction + FIVE_ELEMENTS.length) % FIVE_ELEMENTS.length;
    const next = FIVE_ELEMENTS[nextIndex];
    select(next.id);
    document.getElementById(tabId(next.id))?.focus();
  }

  return (
    <div>
      <div role="tablist" aria-label="The five elements" className="grid grid-cols-2 gap-2 sm:grid-cols-5">
        {FIVE_ELEMENTS.map((element, index) => {
          const selected = element.id === activeId;
          return (
            <button
              key={element.id}
              id={tabId(element.id)}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={panelId(element.id)}
              tabIndex={selected ? 0 : -1}
              onClick={() => select(element.id)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              className={`flex flex-col items-center gap-2 rounded-card p-4 text-center shadow-resting transition-colors ${
                selected ? "bg-saffron-700 text-white" : "bg-surface-raised text-[var(--text-primary)] hover:bg-saffron-50"
              }`}
            >
              <Icon name={element.icon} className="h-6 w-6" />
              <span className="text-xs font-semibold">{element.name}</span>
            </button>
          );
        })}
      </div>

      <div
        id={panelId(active.id)}
        role="tabpanel"
        aria-labelledby={tabId(active.id)}
        tabIndex={0}
        className="mt-6 rounded-panel bg-surface-muted p-6"
      >
        <h2 className="font-display text-xl font-semibold">
          {active.name} <span className="text-base font-normal text-[var(--text-subtle)]">· {active.sanskrit}</span>
        </h2>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">{active.description}</p>
      </div>
    </div>
  );
}
