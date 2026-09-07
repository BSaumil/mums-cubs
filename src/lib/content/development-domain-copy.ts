import type { DevelopmentDomain } from "@/lib/types";

/**
 * Plain, non-clinical observation notes for each developmental domain —
 * framed as "what this looks like day to day", never as a research claim.
 */
export const DOMAIN_DESCRIPTION: Record<DevelopmentDomain, string> = {
  physical: "Fine and gross motor control — the small, repeated movements of the hand and body that build coordination.",
  cognitive: "Concentration, sequencing and problem-solving — the thinking work behind a task well finished.",
  language: "Vocabulary, sound-awareness and the early steps toward reading and writing.",
  emotional: "Naming feelings, self-regulation, and the confidence that comes from completing something independently.",
  social: "Turn-taking, care for others, and the small courtesies of shared space.",
  nature: "Direct, unhurried contact with the natural world — noticing, not just visiting.",
  character: "Patience, discipline and follow-through, practised in small daily moments.",
  reflection: "Quiet, unstructured time to process a day's experience without immediate correction or feedback.",
};
