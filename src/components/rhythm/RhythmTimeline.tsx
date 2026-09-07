import { Icon } from "@/components/icons/Icon";
import type { RhythmMoment } from "@/lib/content/rhythm-defaults";

const TRACK_LABEL = {
  engaged: "Engaged & active",
  restful: "Calm & connecting",
} as const;

/**
 * A dual-track illustration of one day: moments alternate between engaged,
 * active stretches and calmer, connecting ones — the rhythm, not a fixed
 * schedule. DOM order stays chronological (moment 1, 2, 3…) for screen
 * readers; left/right placement is purely visual.
 */
export function RhythmTimeline({ moments }: { moments: RhythmMoment[] }) {
  return (
    <div className="mt-10">
      <div className="flex items-center justify-center gap-6 text-xs font-semibold uppercase tracking-wide text-[var(--text-secondary)]">
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-sky-500" aria-hidden="true" />
          {TRACK_LABEL.engaged}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-wood-500" aria-hidden="true" />
          {TRACK_LABEL.restful}
        </span>
      </div>

      <ol className="relative mt-6">
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[var(--color-ink-300)]/40"
        />
        {moments.map((moment, index) => {
          const engaged = moment.energy !== "restful";
          return (
            <li key={moment.id} className="relative grid grid-cols-[1fr_2.25rem_1fr] items-center gap-2 py-2.5 sm:gap-4">
              <div className={engaged ? "text-right" : ""}>
                {engaged ? <MomentCard moment={moment} align="right" /> : null}
              </div>

              <div className="relative z-10 flex flex-col items-center">
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-white ${
                    engaged ? "bg-sky-500" : "bg-wood-500"
                  }`}
                >
                  <Icon name={moment.icon} className="h-4.5 w-4.5" />
                </span>
                <span className="mt-1 text-[10px] font-medium text-[var(--text-subtle)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div>{!engaged ? <MomentCard moment={moment} align="left" /> : null}</div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function MomentCard({ moment, align }: { moment: RhythmMoment; align: "left" | "right" }) {
  return (
    <div className={`inline-block max-w-[16rem] rounded-card bg-surface-raised px-3.5 py-2 shadow-resting ${align === "right" ? "text-right" : "text-left"}`}>
      <p className="text-sm font-medium text-[var(--text-primary)]">{moment.label}</p>
    </div>
  );
}
