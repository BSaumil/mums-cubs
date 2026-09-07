import type { MetadataRoute } from "next";
import { curriculumAreas } from "@/lib/content/curriculum-areas";
import { blogPosts } from "@/lib/content/blog-posts";
import { learningFrameworks } from "@/lib/content/learning-frameworks";

const BASE_URL = "https://mumsandcubs.example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/discover", "/curriculum", "/materials", "/blog", "/rhythm", "/parents", "/philosophy"].map(
    (path) => ({
      url: `${BASE_URL}${path}`,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    }),
  );

  const discoverPathRoutes = learningFrameworks.map((framework) => ({
    url: `${BASE_URL}/discover/${framework.id}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const curriculumAreaRoutes = curriculumAreas.map((area) => ({
    url: `${BASE_URL}/curriculum/${area.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const activityRoutes = curriculumAreas.flatMap((area) =>
    area.activities.map((activity) => ({
      url: `${BASE_URL}/activities/${activity.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  );

  const blogRoutes = blogPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.publishedAt,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...discoverPathRoutes, ...curriculumAreaRoutes, ...activityRoutes, ...blogRoutes];
}
