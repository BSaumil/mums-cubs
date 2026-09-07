import type { Metadata } from "next";
import { BlogExplorer } from "@/components/blog/BlogExplorer";
import { blogPosts } from "@/lib/content/blog-posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Montessori and Vedic-inspired parenting articles — practical guides, age-stage advice, and material spotlights.",
};

export default function BlogIndexPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-wood-700">Blog</p>
        <h1 className="mt-2 text-4xl font-semibold">Articles for the everyday and the in-between.</h1>
        <p className="mt-3 text-[var(--text-secondary)]">
          {blogPosts.length} articles across Montessori practice, Vedic-inspired rhythm, and the questions that come
          up in between — each one labelled honestly for what kind of guidance it is.
        </p>
      </header>

      <div className="mt-8">
        <BlogExplorer posts={blogPosts} />
      </div>
    </div>
  );
}
