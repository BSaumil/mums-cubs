"use client";

import { useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { Icon } from "@/components/icons/Icon";
import { track } from "@/lib/analytics";
import { curriculumAreas } from "@/lib/content/curriculum-areas";
import { DEVELOPMENT_DOMAINS, DOMAIN_ICON, DOMAIN_LABEL } from "@/lib/content/development-domains";
import { DOMAIN_DESCRIPTION } from "@/lib/content/development-domain-copy";
import type { DevelopmentDomain } from "@/lib/types";

function tabId(domain: DevelopmentDomain) {
  return `whole-child-tab-${domain}`;
}

function panelId(domain: DevelopmentDomain) {
  return `whole-child-panel-${domain}`;
}

/**
 * A simplified, accessible "mind map": domain buttons (an ARIA tablist, with
 * arrow-key roving focus) that swap a single detail panel below — rather
 * than a literal node graph, which is hard to make keyboard- and
 * screen-reader-navigable. Every listed area comes straight from the real
 * curriculum content model, not a fabricated claim.
 */
export function WholeChildMap() {
  const [active, setActive] = useState<DevelopmentDomain>(DEVELOPMENT_DOMAINS[0]);

  function selectDomain(domain: DevelopmentDomain) {
    setActive(domain);
    track("mindmap_node_opened", { domain });
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const nextIndex = (index + direction + DEVELOPMENT_DOMAINS.length) % DEVELOPMENT_DOMAINS.length;
    const nextDomain = DEVELOPMENT_DOMAINS[nextIndex];
    selectDomain(nextDomain);
    document.getElementById(tabId(nextDomain))?.focus();
  }

  const relatedAreas = curriculumAreas.filter((area) => area.developmentalDomains.includes(active));

  return (
    <div>
      <div role="tablist" aria-label="Developmental domains" className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {DEVELOPMENT_DOMAINS.map((domain, index) => {
          const selected = domain === active;
          return (
            <button
              key={domain}
              id={tabId(domain)}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={panelId(domain)}
              tabIndex={selected ? 0 : -1}
              onClick={() => selectDomain(domain)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              className={`flex flex-col items-center gap-2 rounded-card p-4 text-center shadow-resting transition-colors ${
                selected ? "bg-wood-700 text-white" : "bg-surface-raised text-[var(--text-primary)] hover:bg-wood-100"
              }`}
            >
              <Icon name={DOMAIN_ICON[domain]} className="h-6 w-6" />
              <span className="text-xs font-semibold">{DOMAIN_LABEL[domain]}</span>
            </button>
          );
        })}
      </div>

      <div
        id={panelId(active)}
        role="tabpanel"
        aria-labelledby={tabId(active)}
        tabIndex={0}
        className="mt-6 rounded-panel bg-surface-muted p-6"
      >
        <h2 className="font-display text-xl font-semibold">{DOMAIN_LABEL[active]}</h2>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">{DOMAIN_DESCRIPTION[active]}</p>

        {relatedAreas.length > 0 ? (
          <>
            <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-[var(--text-subtle)]">
              Curriculum areas that touch this domain
            </p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {relatedAreas.map((area) => (
                <li key={area.id}>
                  <Link
                    href={`/curriculum/${area.slug}`}
                    className="inline-flex items-center rounded-capsule bg-surface-raised px-4 py-2 text-sm font-medium text-wood-700 shadow-resting hover:shadow-tray"
                  >
                    {area.title}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        ) : null}
      </div>
    </div>
  );
}
