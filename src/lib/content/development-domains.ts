import type { IconName } from "@/components/icons/Icon";
import type { DevelopmentDomain } from "@/lib/types";

export const DEVELOPMENT_DOMAINS: DevelopmentDomain[] = [
  "physical",
  "cognitive",
  "language",
  "emotional",
  "social",
  "nature",
  "character",
  "reflection",
];

export const DOMAIN_LABEL: Record<DevelopmentDomain, string> = {
  physical: "Physical",
  cognitive: "Cognitive",
  language: "Language",
  emotional: "Emotional",
  social: "Social",
  nature: "Nature Connection",
  character: "Character",
  reflection: "Reflection",
};

export const DOMAIN_ICON: Record<DevelopmentDomain, IconName> = {
  physical: "wave",
  cognitive: "book",
  language: "book",
  emotional: "heart",
  social: "group",
  nature: "leaf",
  character: "tree",
  reflection: "lotus",
};
