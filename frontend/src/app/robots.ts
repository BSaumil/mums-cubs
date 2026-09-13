import type { MetadataRoute } from "next";
import { SITE_URL, isProductionDeployment } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  if (!isProductionDeployment()) {
    // Preview deployments and local builds never advertise a sitemap or allow indexing —
    // there is no manual step to forget before a preview URL leaks into search results.
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
