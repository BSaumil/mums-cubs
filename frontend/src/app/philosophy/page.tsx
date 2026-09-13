import type { Metadata } from "next";
import Link from "next/link";
import type { ContextLabel } from "@/lib/types";
import { learningFrameworks } from "@/lib/content/learning-frameworks";
import { ResponsiveArt } from "@/components/media/ResponsiveArt";

export const metadata: Metadata = {
  alternates: { canonical: "/philosophy" },
  title: "Our Philosophy",
  description: "How Mums & Cubs keeps Montessori practice and Vedic tradition distinct rather than blurred together.",
};

const LABEL_NOTES: Record<ContextLabel, string> = {
  "Montessori Practice": "A specific pedagogical method developed by Dr. Maria Montessori — hands-on, child-led, self-correcting materials.",
  "Gurukul-Inspired Practice": "Drawn from Vedic/Gurukul tradition — rhythm, chanting, nature connection, daily discipline.",
  "Cultural / Philosophical Framework": "A cultural or philosophical lens, presented as such — not a claim of scientific or historical fact.",
  "Mathematical Method": "A technique for working with number, evaluated on its own mathematical merit.",
  "Modern Developmental Learning": "Contemporary child-development research, independent of either tradition.",
  "Family Activity": "A shared activity for the home, without a specific pedagogical claim attached.",
};

export default function PhilosophyPage() {
  const vedicTraditions = learningFrameworks.find((framework) => framework.id === "vedic")?.traditions ?? [];

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-widest text-wood-700">Our Philosophy</p>
      <h1 className="mt-2 text-4xl font-semibold">Two traditions, kept distinct.</h1>
      <p className="mt-3 text-[var(--text-secondary)]">
        Montessori and Vedic/Gurukul-inspired learning are complementary, but we never blur historical, scientific,
        pedagogical, religious, cultural or philosophical categories into one another. Every piece of content on
        this site carries one of the labels below, so it is always clear what kind of claim is being made.
      </p>

      <div className="mt-8 relative aspect-square w-full max-w-sm overflow-hidden rounded-panel shadow-floating" data-testid="philosophy-mindfulness-visual">
        <ResponsiveArt
          asset={{
            id: "mc-real-gratitude-mindfulness-1200",
            src: "/images/real/mc-real-gratitude-mindfulness-1200.png",
            alt: "A child pausing to reflect, journal in hand — gratitude and mindfulness practice.",
            width: 1254,
            height: 1254,
            type: "photo",
            dominantTone: "clay",
            isPlaceholder: false,
          }}
          fill
          sizes="384px"
          className="object-cover"
        />
      </div>

      <dl className="mt-10 space-y-5">
        {(Object.keys(LABEL_NOTES) as ContextLabel[]).map((label) => (
          <div key={label} className="rounded-card bg-surface-raised p-5 shadow-resting">
            <dt className="font-semibold text-[var(--text-primary)]">{label}</dt>
            <dd className="mt-1 text-sm text-[var(--text-secondary)]">{LABEL_NOTES[label]}</dd>
          </div>
        ))}
      </dl>

      {vedicTraditions.length > 0 ? (
        <section className="mt-12 rounded-panel bg-saffron-50 p-6">
          <h2 className="text-lg font-semibold">A worked example</h2>
          {vedicTraditions.map((tradition) => (
            <div key={tradition.id} className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start">
              {tradition.visual ? (
                <div className="relative aspect-square w-full shrink-0 overflow-hidden rounded-card shadow-resting sm:w-40" data-testid={`tradition-visual-${tradition.id}`}>
                  <ResponsiveArt asset={tradition.visual} fill sizes="160px" className="object-cover" />
                </div>
              ) : null}
              <p className="text-sm text-[var(--text-secondary)]">
                <strong className="text-[var(--text-primary)]">{tradition.title}:</strong> {tradition.summary}
              </p>
            </div>
          ))}
          <Link href="/elements" className="mt-3 inline-flex min-h-11 items-center text-sm font-medium text-wood-700 hover:underline">
            Explore the five elements →
          </Link>
        </section>
      ) : null}
    </div>
  );
}
