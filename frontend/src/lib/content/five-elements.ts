import type { IconName } from "@/components/icons/Icon";

export interface FiveElement {
  id: string;
  name: string;
  sanskrit: string;
  icon: IconName;
  description: string;
}

/**
 * Pancha Mahabhuta ("five great elements") — a cultural and philosophical
 * framework, presented here as a lens for observation, not a replacement
 * for modern scientific elemental theory. Same framing as the "worked
 * example" on the Philosophy page (src/lib/content/learning-frameworks.ts).
 */
export const FIVE_ELEMENTS: FiveElement[] = [
  {
    id: "earth",
    name: "Earth",
    sanskrit: "Prithvi",
    icon: "globe",
    description:
      "Traditionally associated with stability, structure and groundedness — the quality of what stays still and holds weight.",
  },
  {
    id: "water",
    name: "Water",
    sanskrit: "Jala",
    icon: "wave",
    description:
      "Traditionally associated with flow, adaptability and connection — the quality of moving around an obstacle rather than through it.",
  },
  {
    id: "fire",
    name: "Fire",
    sanskrit: "Agni",
    icon: "flame",
    description:
      "Traditionally associated with transformation and energy — the quality of converting one thing into another.",
  },
  {
    id: "air",
    name: "Air",
    sanskrit: "Vayu",
    icon: "wind",
    description:
      "Traditionally associated with movement and breath — the quality of what circulates and connects.",
  },
  {
    id: "space",
    name: "Space",
    sanskrit: "Akasha",
    icon: "lotus",
    description:
      "Traditionally associated with openness and potential — the quality of what makes room for everything else.",
  },
];
