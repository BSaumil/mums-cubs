import Link from "next/link";
import { ResponsiveArt } from "@/components/media/ResponsiveArt";
import { VisualBadge } from "@/components/ui/VisualBadge";
import type { AgeBand, Paradigm, SkillTag, VisualAsset } from "@/lib/types";

export interface PhotoTrayProps {
  id: string;
  image: VisualAsset;
  title: string;
  lead: string;
  paradigm: Paradigm;
  ageBand: AgeBand;
  objective: string;
  skillTags: SkillTag[];
  materialName?: string;
  href?: string;
}

const AGE_LABEL: Record<AgeBand, string> = {
  "18m-3": "Age 18m–3",
  "3-6": "Age 3–5",
  "6-9": "Age 6–9",
  "9-12": "Age 9–12",
};

/** Inspired by a Montessori wooden tray: one activity, image-first. */
export function PhotoTray({ image, title, lead, paradigm, ageBand, objective, skillTags, materialName, href }: PhotoTrayProps) {
  const trayClassName =
    "group block overflow-hidden rounded-tray bg-surface-raised shadow-tray transition-transform duration-[var(--duration-hover)] ease-[var(--ease-standard)] hover:-translate-y-1 focus-visible:-translate-y-1";

  const content = (
    <>
      <div className="relative aspect-[4/5] overflow-hidden">
        <ResponsiveArt
          asset={image}
          fill
          sizes="(min-width: 1024px) 320px, 45vw"
          className="object-cover transition-[filter,transform] duration-[var(--duration-zoom)] ease-[var(--ease-standard)] group-hover:brightness-90 group-hover:scale-[1.03] group-focus-visible:brightness-90"
        />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
          {skillTags[0] ? <VisualBadge label={skillTags[0].label} paradigm={paradigm} /> : <span />}
          <VisualBadge label={AGE_LABEL[ageBand]} />
        </div>
        <div
          className="absolute inset-0 flex items-end bg-gradient-to-t from-[var(--color-ink-900)]/70 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-[var(--duration-overlay)] ease-[var(--ease-standard)] group-hover:opacity-100 group-focus-visible:opacity-100"
          aria-hidden="true"
        >
          <p className="text-sm font-medium leading-snug text-white">{objective}</p>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-[length:var(--text-lg,1.125rem)] font-semibold text-[var(--text-primary)]">{title}</h3>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">{lead}</p>
        {materialName ? <p className="mt-2 text-xs text-[var(--text-subtle)]">Material: {materialName}</p> : null}
      </div>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={trayClassName}>
        {content}
      </Link>
    );
  }

  return <div className={trayClassName}>{content}</div>;
}
