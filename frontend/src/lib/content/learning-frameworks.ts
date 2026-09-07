import type { LearningFramework } from "@/lib/types";
import { curriculumAreas } from "@/lib/content/curriculum-areas";

const genVisual = (file: string, alt: string, dominantTone: "wood" | "clay" | "leaf" | "saffron" | "sky") => ({
  id: file.replace(/\.jpg$/, ""),
  src: `/images/real/${file}`,
  alt,
  width: 1024,
  height: 1024,
  type: "photo" as const,
  dominantTone,
  isPlaceholder: false,
});

const montessoriAreas = curriculumAreas.filter((area) => area.paradigm === "montessori");
const vedicAreas = curriculumAreas.filter((area) => area.paradigm === "vedic");

export const learningFrameworks: LearningFramework[] = [
  {
    id: "montessori",
    name: "The Montessori Path",
    visualTheme: "Wood, natural light, ordered materials",
    heroVisual: genVisual("mc-gen-montessori-path-1024.jpg", "A child focused on wooden Montessori sensorial materials in a bright, plant-filled playroom.", "wood"),
    principles: [
      { id: "child-led", title: "Child-led exploration", description: "The child chooses the work; the adult prepares the environment." },
      { id: "hands-on", title: "Hands-on learning", description: "Concrete materials come before abstract explanation." },
      { id: "independence", title: "Independence", description: "Every material is sized and placed for a child to use alone." },
      { id: "self-correcting", title: "Self-correcting materials", description: "The material itself reveals the error, not the adult." },
    ],
    curriculumAreas: montessoriAreas,
    developmentalDomains: ["physical", "cognitive", "language", "social"],
  },
  {
    id: "vedic",
    name: "The Vedic Path",
    visualTheme: "Sunrise, saffron, rhythm, nature",
    heroVisual: genVisual("mc-gen-vedic-path-v2-1024.jpg", "A child sitting peacefully in namaste beside a lit diya lamp and singing bowl.", "saffron"),
    principles: [
      { id: "number-sense", title: "Mental mathematics", description: "Number relationships are seen and felt before they are calculated." },
      { id: "rhythm", title: "Rhythm & phonetics", description: "Chanting trains listening, pronunciation and sustained attention." },
      { id: "nature", title: "Nature alignment", description: "The natural world is treated as both classroom and reference point." },
      { id: "dinacharya", title: "Daily rhythm", description: "A repeated sequence of the day builds a child's sense of security." },
    ],
    curriculumAreas: vedicAreas,
    developmentalDomains: ["cognitive", "language", "character", "reflection", "nature"],
    traditions: [
      {
        id: "pancha-mahabhuta",
        title: "Pancha Mahabhuta",
        summary: "A cultural and philosophical framework describing Earth, Water, Fire, Air and Space — presented here as a lens for observation, not a replacement for modern scientific elemental theory.",
        visual: {
          id: "mc-real-pancha-mahabhuta-1254",
          src: "/images/real/mc-real-pancha-mahabhuta-1254.png",
          alt: "A child holding earth beside bowls representing Water, Fire, Air and Space — the five elements of Pancha Mahabhuta.",
          width: 1254,
          height: 1254,
          type: "photo",
          dominantTone: "leaf",
          isPlaceholder: false,
        },
      },
    ],
  },
  {
    id: "integrated",
    name: "Integrated Path",
    visualTheme: "Wood and saffron in shared balance",
    heroVisual: genVisual("mc-gen-integrated-path-1024.jpg", "Two children playing together, one with Montessori blocks and one with a bell and marigolds, both traditions side by side.", "clay"),
    principles: [
      { id: "whole-child", title: "Whole-child outcomes", description: "Both paths are read through shared developmental outcomes: concentration, independence, curiosity, care." },
      { id: "complementary", title: "Complementary, not merged", description: "Each tradition keeps its own integrity; nothing is blended into a single blurred method." },
    ],
    curriculumAreas: [...montessoriAreas, ...vedicAreas],
    developmentalDomains: ["physical", "cognitive", "language", "emotional", "social", "nature", "character", "reflection"],
  },
];

export function getFramework(id: LearningFramework["id"]): LearningFramework | undefined {
  return learningFrameworks.find((framework) => framework.id === id);
}

export function isFrameworkId(value: string): value is LearningFramework["id"] {
  return learningFrameworks.some((framework) => framework.id === value);
}
