import type { EducationalEvent } from "@/lib/types";

type EventProperties = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/**
 * Fires a typed product event through two vendor-agnostic channels so no
 * analytics provider is hard-coded here: a GTM-compatible `window.dataLayer`
 * push, and an `mc:event` CustomEvent any other script can subscribe to.
 * Properties are content metadata only (slugs, paradigm, age band) — never
 * PII and never anything that identifies a specific child, per the privacy
 * rule in docs/MUMS_CUBS_ACCESSIBILITY.md's sibling security notes.
 */
export function track(event: EducationalEvent, properties: EventProperties = {}): void {
  if (typeof window === "undefined") return;

  const payload = { event, ...properties, timestamp: Date.now() };

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(payload);
  window.dispatchEvent(new CustomEvent("mc:event", { detail: payload }));

  if (process.env.NODE_ENV !== "production") {
    console.debug("[analytics]", payload);
  }
}
