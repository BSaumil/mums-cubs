import { describe, expect, it } from "vitest";
import { blogPosts, getBlogPostBySlug, getBlogPostsByCategory } from "./blog-posts";
import { getCurriculumAreaBySlug } from "./curriculum-areas";

describe("blog content integrity", () => {
  it("has exactly 50 posts", () => {
    expect(blogPosts).toHaveLength(50);
  });

  it("has no duplicate slugs or ids", () => {
    const slugs = blogPosts.map((post) => post.slug);
    const ids = blogPosts.map((post) => post.id);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("gives every post a substantive title, description and body", () => {
    for (const post of blogPosts) {
      expect(post.title.length, `${post.slug} title too short`).toBeGreaterThan(10);
      expect(post.description.length, `${post.slug} description too short`).toBeGreaterThan(30);
      expect(post.body.length, `${post.slug} body too short`).toBeGreaterThan(800);
      expect(post.body).toContain("## ");
    }
  });

  it("gives every post a valid, non-zero read time", () => {
    for (const post of blogPosts) {
      expect(post.readMinutes).toBeGreaterThan(0);
      expect(post.readMinutes).toBeLessThan(15);
    }
  });

  it("gives every post a parseable ISO publish date", () => {
    for (const post of blogPosts) {
      expect(Number.isNaN(new Date(post.publishedAt).getTime()), `${post.slug} has an invalid date`).toBe(false);
    }
  });

  it("resolves every relatedAreaSlug to a real curriculum area", () => {
    for (const post of blogPosts) {
      if (post.relatedAreaSlug) {
        expect(getCurriculumAreaBySlug(post.relatedAreaSlug), `${post.slug} links to a missing area`).toBeDefined();
      }
    }
  });

  it("looks up a post by slug", () => {
    const post = getBlogPostBySlug("beginners-guide-practical-life-activities-at-home");
    expect(post?.title).toBe("A Beginner's Guide to Practical Life Activities at Home");
  });

  it("returns undefined for an unknown slug", () => {
    expect(getBlogPostBySlug("does-not-exist")).toBeUndefined();
  });

  it("filters posts by category", () => {
    const posts = getBlogPostsByCategory("materials-spotlight");
    expect(posts.length).toBeGreaterThan(0);
    for (const post of posts) {
      expect(post.category).toBe("materials-spotlight");
    }
  });

  it("covers every declared blog category with at least one post", () => {
    const categories = new Set(blogPosts.map((post) => post.category));
    expect(categories).toEqual(
      new Set([
        "montessori-at-home",
        "vedic-at-home",
        "integrated",
        "age-stages",
        "parent-observation",
        "materials-spotlight",
        "family-life",
      ]),
    );
  });
});
