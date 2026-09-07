import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AnalyticsBeacon } from "@/components/analytics/AnalyticsBeacon";
import { MarkdownLite } from "@/components/blog/MarkdownLite";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { MarkAsReadToggle } from "@/components/blog/MarkAsReadToggle";
import { VisualBadge } from "@/components/ui/VisualBadge";
import { PrintButton } from "@/components/ui/PrintButton";
import { Icon } from "@/components/icons/Icon";
import { blogPosts, getBlogPostBySlug } from "@/lib/content/blog-posts";
import { getCurriculumAreaBySlug } from "@/lib/content/curriculum-areas";
import { articleJsonLd, breadcrumbJsonLd, jsonLdScript } from "@/lib/structured-data";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: { title: post.title, description: post.description, type: "article", publishedTime: post.publishedAt },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const relatedArea = post.relatedAreaSlug ? getCurriculumAreaBySlug(post.relatedAreaSlug) : undefined;
  const relatedPosts = blogPosts.filter((other) => other.category === post.category && other.id !== post.id).slice(0, 3);

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <AnalyticsBeacon event="blog_post_viewed" properties={{ slug: post.slug, category: post.category }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript(articleJsonLd(post)) + jsonLdScript(breadcrumbJsonLd([
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ])),
        }}
      />

      <div className="flex items-center justify-between gap-4">
        <Link href="/blog" className="text-sm font-medium text-[var(--text-subtle)] hover:text-[var(--text-primary)]">
          ← All articles
        </Link>
        <div className="flex items-center gap-2">
          <MarkAsReadToggle slug={post.slug} />
          <PrintButton label="Print" />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <VisualBadge label={post.contextLabel} paradigm={post.paradigm === "integrated" ? undefined : post.paradigm} />
        <VisualBadge label={`${post.readMinutes} min read`} />
      </div>

      <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">{post.title}</h1>
      <p className="mt-2 text-lg text-[var(--text-secondary)]">{post.description}</p>
      <p className="mt-3 text-sm text-[var(--text-subtle)]">{formatDate(post.publishedAt)}</p>

      <div className="mt-10">
        <MarkdownLite body={post.body} />
      </div>

      {relatedArea ? (
        <div className="mt-12 rounded-panel bg-surface-muted p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-subtle)]">Related curriculum area</p>
          <Link
            href={`/curriculum/${relatedArea.slug}`}
            className="mt-2 inline-flex items-center gap-1.5 text-lg font-semibold text-[var(--text-primary)] hover:underline"
          >
            {relatedArea.title}
            <Icon name="arrow-right" className="h-4 w-4" />
          </Link>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">{relatedArea.leadSentence}</p>
        </div>
      ) : null}

      {relatedPosts.length > 0 ? (
        <section className="mt-14" data-print-hide>
          <h2 className="text-xl font-semibold">More like this</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {relatedPosts.map((related) => (
              <BlogPostCard key={related.id} post={related} />
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}
