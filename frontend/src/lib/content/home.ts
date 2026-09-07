import type { VisualAsset } from "@/lib/types";

export const homepageHeroAssets: Record<"montessori" | "vedic" | "overview", VisualAsset> = {
  montessori: {
    id: "mc-real-practical-life-1254",
    src: "/images/real/mc-real-practical-life-1254.png",
    alt: "A child's hands pouring water from a jug into a small bowl, representing the Montessori path.",
    width: 1254,
    height: 1254,
    type: "photo",
    dominantTone: "wood",
    isPlaceholder: false,
  },
  vedic: {
    id: "mc-real-vedic-path-1254",
    src: "/images/real/mc-real-vedic-path-1254.png",
    alt: "A child sitting cross-legged in namaste, representing the Vedic path — rhythm, nature, mindfulness and character.",
    width: 1254,
    height: 1254,
    type: "photo",
    dominantTone: "saffron",
    isPlaceholder: false,
  },
  overview: {
    id: "mc-real-small-hands-big-possibilities-1254",
    src: "/images/real/mc-real-small-hands-big-possibilities-1254.png",
    alt: "A child playing with wooden cylinder blocks — where Montessori meets Vedic wisdom, for curious minds and kind hearts.",
    width: 1254,
    height: 1254,
    type: "photo",
    dominantTone: "wood",
    isPlaceholder: false,
  },
};
