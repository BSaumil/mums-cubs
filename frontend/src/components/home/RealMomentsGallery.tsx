import Link from "next/link";
import { ResponsiveArt } from "@/components/media/ResponsiveArt";
import type { RealMoment } from "@/lib/content/real-moments";

export function RealMomentsGallery({ moments }: { moments: RealMoment[] }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8" data-testid="real-moments-gallery">
      <div className="max-w-2xl">
        <h2 className="text-3xl font-semibold text-[var(--text-primary)] sm:text-4xl">Real Families, Real Moments</h2>
        <p className="mt-2 text-[var(--text-secondary)]">
          Straight from Mums &amp; Cubs homes — no illustrations, just life as it happens.
        </p>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {moments.map((moment) => (
          <Link
            key={moment.id}
            href={moment.href}
            className="group block"
            data-testid={`real-moment-card-${moment.id}`}
          >
            <div className="relative aspect-square overflow-hidden rounded-card shadow-resting">
              <ResponsiveArt
                asset={moment.image}
                fill
                sizes="(min-width: 1024px) 220px, 45vw"
                className="object-cover transition-transform duration-[var(--duration-zoom)] group-hover:scale-[1.03]"
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
