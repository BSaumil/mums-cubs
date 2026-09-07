import type { VisualAsset } from "@/lib/types";

export const homepageHeroAssets: Record<"montessori" | "vedic", VisualAsset> = {
  montessori: {
    id: "mc-montessori-hero-pouring-wide-1600",
    src: "/images/placeholders/mc-montessori-hero-pouring-wide-1600.svg",
    alt: "Illustrated scene of a child's hands pouring water between two jugs, representing the Montessori path.",
    width: 1600,
    height: 900,
    type: "illustration",
    dominantTone: "wood",
    isPlaceholder: true,
  },
  vedic: {
    id: "mc-vedic-hero-sunrise-wide-1600",
    src: "/images/placeholders/mc-vedic-hero-sunrise-wide-1600.svg",
    alt: "Illustrated sunrise motif representing the Vedic path's daily rhythm and nature connection.",
    width: 1600,
    height: 900,
    type: "illustration",
    dominantTone: "saffron",
    isPlaceholder: true,
  },
};
