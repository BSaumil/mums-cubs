"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { getWeeklyDigestActivities } from "@/lib/digest";
import type { AgeBand } from "@/lib/types";

const AGE_OPTIONS: { id: AgeBand; label: string }[] = [
  { id: "18m-3", label: "18 months – 3 years" },
  { id: "3-6", label: "3 – 6 years" },
  { id: "6-9", label: "6 – 9 years" },
  { id: "9-12", label: "9 – 12 years" },
];

export function DigestPreview() {
  const [ageBand, setAgeBand] = useState<AgeBand>("3-6");
  const activities = useMemo(() => getWeeklyDigestActivities(ageBand), [ageBand]);

  return (
    <div>
      <label htmlFor="digest-age-band" className="text-xs font-semibold uppercase tracking-wide text-[var(--text-subtle)]">
        Preview for
      </label>
      <select
        id="digest-age-band"
        value={ageBand}
        onChange={(event) => setAgeBand(event.target.value as AgeBand)}
        className="mt-1.5 block rounded-capsule border border-[var(--color-ink-300)]/50 bg-surface-raised px-4 py-2 text-sm text-[var(--text-primary)]"
      >
        {AGE_OPTIONS.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>

      {activities.length > 0 ? (
        <ul className="mt-4 space-y-2">
          {activities.map((activity) => (
            <li key={activity.id}>
              <Link
                href={`/activities/${activity.slug}`}
                className="flex items-center justify-between gap-3 rounded-card bg-surface-raised p-3.5 text-sm shadow-resting hover:shadow-tray"
              >
                <span className="font-medium text-[var(--text-primary)]">{activity.title}</span>
                <span className="text-[var(--text-subtle)]">{activity.objective}</span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-sm text-[var(--text-subtle)]">No matching activities for this age band yet.</p>
      )}
    </div>
  );
}
