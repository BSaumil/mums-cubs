"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";
import type { EducationalEvent } from "@/lib/types";

interface AnalyticsBeaconProps {
  event: EducationalEvent;
  properties?: Record<string, string | number | boolean | undefined>;
}

/**
 * Fires one typed event when a server-rendered page mounts, so pages stay
 * Server Components while still reporting a view. Deliberately fires once
 * per mount (a fresh instance per navigation) rather than reacting to
 * `properties` changing — this is a page-view beacon, not a live tracker.
 */
export function AnalyticsBeacon({ event, properties }: AnalyticsBeaconProps) {
  useEffect(() => {
    track(event, properties);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
