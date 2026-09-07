const SITE_NAME = "Mums & Cubs";
const BASE_URL = "https://mumsandcubs.example.com";

export function articleJsonLd(post: { title: string; description: string; slug: string; publishedAt: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    url: `${BASE_URL}/blog/${post.slug}`,
    publisher: { "@type": "Organization", name: SITE_NAME },
    isAccessibleForFree: true,
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${BASE_URL}${item.path}`,
    })),
  };
}

/** Renders as a plain object; the caller embeds it via a <script type="application/ld+json"> tag. */
export function jsonLdScript(data: object) {
  return JSON.stringify(data);
}
