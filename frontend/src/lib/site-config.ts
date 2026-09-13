/**
 * The canonical production origin, from a trusted, overridable value —
 * never re-derived from request headers, which a client can spoof.
 * Override with NEXT_PUBLIC_SITE_URL if the production domain changes.
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mumsncubs.com";

/**
 * True only on an actual Vercel production deployment. Vercel sets
 * VERCEL_ENV to "production" | "preview" | "development" automatically;
 * outside Vercel (local dev, CI) this is never true. Used to keep preview
 * and local builds out of search results without a manual per-deploy step.
 */
export function isProductionDeployment(): boolean {
  return process.env.VERCEL_ENV === "production";
}
