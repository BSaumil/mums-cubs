import type { IconName } from "@/components/icons/Icon";

/** Which of the two rhythm tracks a moment belongs to — the natural alternation between engagement and rest that a healthy daily rhythm depends on. */
export type RhythmEnergy = "engaged" | "restful";

export interface RhythmMoment {
  id: string;
  label: string;
  icon: IconName;
  /** Builder-added custom moments have no inherent track, so this is optional there. */
  energy?: RhythmEnergy;
}

/** The illustrative example rhythm shown read-only, and the rhythm builder's starting point / reset target. */
export const DEFAULT_RHYTHM: RhythmMoment[] = [
  { id: "sunrise", label: "Sunrise", icon: "sun", energy: "restful" },
  { id: "wake", label: "Wake", icon: "sun", energy: "restful" },
  { id: "care-of-self", label: "Care of self", icon: "heart", energy: "engaged" },
  { id: "movement", label: "Movement", icon: "group", energy: "engaged" },
  { id: "focused-learning", label: "Focused learning", icon: "book", energy: "engaged" },
  { id: "nature", label: "Nature", icon: "leaf", energy: "engaged" },
  { id: "shared-meal", label: "Shared meal", icon: "heart", energy: "restful" },
  { id: "creative-activity", label: "Creative activity", icon: "jug", energy: "engaged" },
  { id: "family-time", label: "Family time", icon: "group", energy: "restful" },
  { id: "quiet-transition", label: "Quiet transition", icon: "moon", energy: "restful" },
  { id: "sleep", label: "Sleep", icon: "moon", energy: "restful" },
];
