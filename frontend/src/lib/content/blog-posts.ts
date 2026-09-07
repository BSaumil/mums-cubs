import type { BlogPost } from "@/lib/types";
import { postsBatch1 } from "@/lib/content/blog/posts-1";
import { postsBatch2 } from "@/lib/content/blog/posts-2";
import { postsBatch3 } from "@/lib/content/blog/posts-3";
import { postsBatch4 } from "@/lib/content/blog/posts-4";
import { postsBatch5 } from "@/lib/content/blog/posts-5";

export const blogPosts: BlogPost[] = [...postsBatch1, ...postsBatch2, ...postsBatch3, ...postsBatch4, ...postsBatch5].sort(
  (a, b) => (a.publishedAt < b.publishedAt ? 1 : -1),
);

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getBlogPostsByCategory(category: BlogPost["category"]): BlogPost[] {
  return blogPosts.filter((post) => post.category === category);
}
