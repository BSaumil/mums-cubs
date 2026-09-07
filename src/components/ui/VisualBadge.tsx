import type { Paradigm } from "@/lib/types";
import { Icon, type IconName } from "@/components/icons/Icon";

const PARADIGM_STYLE: Record<Paradigm, { className: string; icon: IconName }> = {
  montessori: { className: "bg-wood-100 text-wood-700", icon: "jug" },
  vedic: { className: "bg-saffron-100 text-saffron-700", icon: "sun" },
  integrated: { className: "bg-leaf-100 text-leaf-700", icon: "globe" },
};

interface VisualBadgeProps {
  label: string;
  paradigm?: Paradigm;
  icon?: IconName;
}

/**
 * Never the only differentiator between paradigms: paradigm badges always
 * pair a colour with a distinct icon and a text label.
 */
export function VisualBadge({ label, paradigm, icon }: VisualBadgeProps) {
  const style = paradigm ? PARADIGM_STYLE[paradigm] : undefined;
  const resolvedIcon = icon ?? style?.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-capsule px-3 py-1 text-xs font-medium tracking-wide ${
        style?.className ?? "bg-surface-raised text-[var(--text-secondary)]"
      }`}
    >
      {resolvedIcon ? <Icon name={resolvedIcon} className="h-3.5 w-3.5" /> : null}
      {label}
    </span>
  );
}
