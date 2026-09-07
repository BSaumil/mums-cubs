import Link from "next/link";
import { VisualBadge } from "@/components/ui/VisualBadge";
import type { BlogPost } from "@/lib/types";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

export function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="flex flex-col gap-3 rounded-card bg-surface-raised p-5 shadow-resting transition-shadow hover:shadow-tray focus-visible:shadow-tray"
    >
      <VisualBadge label={post.contextLabel} paradigm={post.paradigm === "integrated" ? undefined : post.paradigm} />
      <h3 className="text-lg font-semibold text-[var(--text-primary)]">{post.title}</h3>
      <p className="flex-1 text-sm text-[var(--text-secondary)]">{post.description}</p>
      <p className="text-xs text-[var(--text-subtle)]">
        {formatDate(post.publishedAt)} · {post.readMinutes} min read
      </p>
    </Link>
  );
}
