import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Mums & Cubs — Rooted Learning, Brighter Tomorrows",
    short_name: "Mums & Cubs",
    description:
      "A nurturing space where Montessori meets Vedic wisdom — for curious minds, kind hearts and a brighter tomorrow.",
    start_url: "/",
    display: "standalone",
    background_color: "#fffcf7",
    theme_color: "#7a4020",
    icons: [
      { src: "/brand/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { src: "/brand/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
