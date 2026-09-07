import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { GlobalHeader } from "@/components/layout/GlobalHeader";
import { VisualFooter } from "@/components/layout/VisualFooter";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mumsandcubs.example.com"),
  title: {
    default: "Mums & Cubs — Rooted Learning, Brighter Tomorrows",
    template: "%s — Mums & Cubs",
  },
  description:
    "A nurturing space where Montessori meets Vedic wisdom — for curious minds, kind hearts and a brighter tomorrow.",
  openGraph: {
    title: "Mums & Cubs",
    description:
      "A nurturing space where Montessori meets Vedic wisdom — for curious minds, kind hearts and a brighter tomorrow.",
    siteName: "Mums & Cubs",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-surface text-[var(--text-primary)]">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-[var(--color-wood-700)] focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <GlobalHeader />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <VisualFooter />
      </body>
    </html>
  );
}
