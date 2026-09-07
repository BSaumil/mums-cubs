import Link from "next/link";
import { CurriculumAreaCard } from "@/components/cards/CurriculumAreaCard";
import { Icon } from "@/components/icons/Icon";
import type { CurriculumArea, Paradigm } from "@/lib/types";

interface DiscoverySectionProps {
  paradigm: Paradigm;
  title: string;
  lead: string;
  areas: CurriculumArea[];
}

export function DiscoverySection({ paradigm, title, lead, areas }: DiscoverySectionProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-xl">
          <p
            className={`text-xs font-semibold uppercase tracking-widest ${
              paradigm === "vedic" ? "text-saffron-700" : "text-wood-700"
            }`}
          >
            {paradigm === "vedic" ? "Gurukul-Inspired Discovery" : "Montessori Discovery"}
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-[var(--text-primary)]">{title}</h2>
          <p className="mt-2 text-[var(--text-secondary)]">{lead}</p>
        </div>
        <Link
          href={`/discover/${paradigm}`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--text-primary)] hover:underline"
        >
          View all
          <Icon name="arrow-right" className="h-4 w-4" />
        </Link>
      </div>
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {areas.map((area) => (
          <CurriculumAreaCard key={area.id} area={area} />
        ))}
      </div>
    </section>
  );
}
