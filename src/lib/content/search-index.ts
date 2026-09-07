import { curriculumAreas } from "@/lib/content/curriculum-areas";
import { materials } from "@/lib/content/materials";
import { blogPosts } from "@/lib/content/blog-posts";
import type { Paradigm } from "@/lib/types";

export type SearchResultKind = "curriculum" | "material" | "blog" | "activity";

export interface SearchItem {
  id: string;
  kind: SearchResultKind;
  title: string;
  description: string;
  href: string;
  paradigm: Paradigm;
}

const KIND_LABEL: Record<SearchResultKind, string> = {
  curriculum: "Curriculum Area",
  material: "Material",
  blog: "Article",
  activity: "Activity",
};

export { KIND_LABEL };

function buildSearchIndex(): SearchItem[] {
  const curriculumItems: SearchItem[] = curriculumAreas.map((area) => ({
    id: `curriculum-${area.id}`,
    kind: "curriculum",
    title: area.title,
    description: area.leadSentence,
    href: `/curriculum/${area.slug}`,
    paradigm: area.paradigm,
  }));

  const materialItems: SearchItem[] = materials.map((material) => ({
    id: `material-${material.id}`,
    kind: "material",
    title: material.name,
    description: material.description,
    href: `/materials`,
    paradigm: material.paradigm,
  }));

  const activityItems: SearchItem[] = curriculumAreas.flatMap((area) =>
    area.activities.map((activity) => ({
      id: `activity-${activity.id}`,
      kind: "activity" as const,
      title: activity.title,
      description: activity.objective,
      href: `/activities/${activity.slug}`,
      paradigm: area.paradigm,
    })),
  );

  const blogItems: SearchItem[] = blogPosts.map((post) => ({
    id: `blog-${post.id}`,
    kind: "blog",
    title: post.title,
    description: post.description,
    href: `/blog/${post.slug}`,
    paradigm: post.paradigm,
  }));

  return [...curriculumItems, ...activityItems, ...blogItems, ...materialItems];
}

export const searchIndex: SearchItem[] = buildSearchIndex();

export function searchContent(query: string): SearchItem[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];

  return searchIndex.filter(
    (item) => item.title.toLowerCase().includes(normalized) || item.description.toLowerCase().includes(normalized),
  );
}
