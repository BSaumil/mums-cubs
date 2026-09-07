import Link from "next/link";
import type { Paradigm } from "@/lib/types";
import { Icon, type IconName } from "@/components/icons/Icon";

const PATHS: { id: Paradigm; label: string; description: string; icon: IconName }[] = [
  { id: "montessori", label: "Montessori", description: "Hands-on, child-led, prepared environment.", icon: "jug" },
  { id: "vedic", label: "Vedic", description: "Rhythm, number sense, nature and reflection.", icon: "lotus" },
  { id: "integrated", label: "Integrated", description: "Both paths, read through shared outcomes.", icon: "globe" },
];

/**
 * Pick Your Path. Plain links carrying `?path=` so the choice is a
 * shareable, server-rendered URL rather than client-only UI state.
 */
export function PathNavigator({ activePath }: { activePath: Paradigm }) {
  return (
    <nav aria-label="Choose a learning path" className="flex flex-wrap justify-center gap-3">
      {PATHS.map((path) => {
        const isActive = path.id === activePath;
        return (
          <Link
            key={path.id}
            href={`/?path=${path.id}#explore`}
            aria-current={isActive ? "true" : undefined}
            className={`flex min-h-11 items-center gap-2 rounded-capsule border px-5 py-2.5 text-sm font-medium transition-colors ${
              isActive
                ? "border-transparent bg-wood-700 text-white shadow-resting"
                : "border-[var(--color-ink-300)]/50 bg-surface-raised text-[var(--text-secondary)] hover:border-wood-500"
            }`}
          >
            <Icon name={path.icon} className="h-4 w-4" />
            {path.label}
          </Link>
        );
      })}
    </nav>
  );
}

export { PATHS };
