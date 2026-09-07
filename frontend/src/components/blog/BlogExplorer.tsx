"use client";

import { useMemo, useState } from "react";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import type { BlogCategory, BlogPost } from "@/lib/types";

type CategoryFilter = "all" | BlogCategory;

const CATEGORIES: { id: CategoryFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "montessori-at-home", label: "Montessori at Home" },
  { id: "vedic-at-home", label: "Vedic at Home" },
  { id: "integrated", label: "Integrated" },
  { id: "age-stages", label: "Age & Stages" },
  { id: "parent-observation", label: "Parent Observation" },
  { id: "materials-spotlight", label: "Materials Spotlight" },
  { id: "family-life", label: "Family Life" },
];

export function BlogExplorer({ posts }: { posts: BlogPost[] }) {
  const [active, setActive] = useState<CategoryFilter>("all");

  const visible = useMemo(
    () => (active === "all" ? posts : posts.filter((post) => post.category === active)),
    [posts, active],
  );

  return (
    <div>
      <div className="no-scrollbar flex gap-2 overflow-x-auto pb-2" role="group" aria-label="Filter articles by category">
        {CATEGORIES.map((category) => {
          const isActive = category.id === active;
          return (
            <button
              key={category.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActive(category.id)}
              className={`min-h-11 shrink-0 rounded-capsule px-4 py-2 text-sm font-medium transition-colors ${
                isActive ? "bg-wood-700 text-white" : "bg-surface-muted text-[var(--text-secondary)] hover:bg-wood-100"
              }`}
            >
              {category.label}
            </button>
          );
        })}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
        {visible.length > 0 ? (
          visible.map((post) => <BlogPostCard key={post.id} post={post} />)
        ) : (
          <p className="col-span-full py-12 text-center text-[var(--text-subtle)]">
            No articles in this category yet.
          </p>
        )}
      </div>
    </div>
  );
}
