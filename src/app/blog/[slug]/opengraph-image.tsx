import { ImageResponse } from "next/og";
import { blogPosts, getBlogPostBySlug } from "@/lib/content/blog-posts";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const TONE_GRADIENTS: Record<string, [string, string]> = {
  montessori: ["#F7EAE0", "#EDD3BE"],
  vedic: ["#FFF6EA", "#FAD1A7"],
  integrated: ["#EEF3EC", "#DCE8D6"],
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default async function BlogOgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  const [from, to] = TONE_GRADIENTS[post?.paradigm ?? "integrated"];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: `linear-gradient(135deg, ${from}, ${to})`,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 999,
              background: "#A65B2E",
              display: "flex",
            }}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: "#2E5D3A" }}>Mums &amp; Cubs</div>
            <div style={{ fontSize: 16, color: "#665F54" }}>{post?.contextLabel ?? "Mums & Cubs"}</div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 56,
            fontWeight: 700,
            lineHeight: 1.15,
            color: "#211E19",
            maxWidth: 980,
          }}
        >
          {post?.title ?? "Mums & Cubs"}
        </div>
      </div>
    ),
    { ...size },
  );
}
