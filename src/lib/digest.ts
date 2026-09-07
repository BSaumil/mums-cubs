import { curriculumAreas } from "@/lib/content/curriculum-areas";
import type { Activity, AgeBand } from "@/lib/types";

/**
 * Deterministic weekly pick of age-matched activities: the same ISO week
 * number always yields the same picks, so a real scheduled send (once an
 * email provider is wired up) can regenerate identical content rather than
 * relying on stored state.
 */
function isoWeekNumber(date: Date): number {
  const target = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNumber = (target.getUTCDay() + 6) % 7;
  target.setUTCDate(target.getUTCDate() - dayNumber + 3);
  const firstThursday = new Date(Date.UTC(target.getUTCFullYear(), 0, 4));
  const firstDayNumber = (firstThursday.getUTCDay() + 6) % 7;
  firstThursday.setUTCDate(firstThursday.getUTCDate() - firstDayNumber + 3);
  return 1 + Math.round((target.getTime() - firstThursday.getTime()) / (7 * 24 * 60 * 60 * 1000));
}

function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }
  return hash;
}

export function getWeeklyDigestActivities(ageBand: AgeBand, count = 3, weekSeed: number = isoWeekNumber(new Date())): Activity[] {
  const matching = curriculumAreas.flatMap((area) => area.activities.filter((activity) => activity.ageBand === ageBand));

  if (matching.length === 0) return [];

  return [...matching]
    .sort((a, b) => hashString(`${a.id}-${weekSeed}`) - hashString(`${b.id}-${weekSeed}`))
    .slice(0, count);
}
