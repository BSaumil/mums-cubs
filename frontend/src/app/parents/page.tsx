import type { Metadata } from "next";
import Link from "next/link";
import { curriculumAreas } from "@/lib/content/curriculum-areas";
import { ResponsiveArt } from "@/components/media/ResponsiveArt";
import { DigestPreview } from "@/components/parents/DigestPreview";
import { NewsletterSignup } from "@/components/parents/NewsletterSignup";
import { isEmailConfigured } from "@/lib/server/email-provider";
import { isPersistenceConfigured } from "@/lib/server/subscription-store";

export const metadata: Metadata = {
  alternates: { canonical: "/parents" },
  title: "For Parents",
  description: "What to observe at home, area by area — and how to join the Mums & Cubs community.",
};

export default function ParentsPage() {
  const emailSignupConfigured = isPersistenceConfigured() && isEmailConfigured();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-widest text-wood-700">For Parents</p>
      <h1 className="mt-2 text-4xl font-semibold text-[var(--text-primary)]">Observe first. Help when needed.</h1>
      <p className="mt-3 max-w-xl text-[var(--text-secondary)]">
        Notice what your child is trying, offer help when it is useful, and step in whenever safety or comfort
        requires it. Here is what to look for, area by area.
      </p>

      <div className="mt-8 relative aspect-square w-full max-w-sm overflow-hidden rounded-panel shadow-floating" data-testid="parents-character-visual">
        <ResponsiveArt
          asset={{
            id: "mc-real-character-development-1200",
            src: "/images/real/mc-real-character-development-1200.png",
            alt: "Two children sharing and building together — character development in action.",
            width: 1254,
            height: 1254,
            type: "photo",
            dominantTone: "wood",
            isPlaceholder: false,
          }}
          fill
          sizes="384px"
          className="object-cover"
        />
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {curriculumAreas.map((area) => (
          <div key={area.id} className="rounded-card bg-surface-raised p-5 shadow-resting">
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-subtle)]">{area.title}</p>
            <p className="mt-1.5 text-sm text-[var(--text-secondary)]">{area.parentObservation}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Link href="/growth" className="rounded-card bg-surface-raised p-5 shadow-resting hover:shadow-tray">
          <p className="text-xs font-semibold uppercase tracking-wide text-wood-700">Private tool</p>
          <h2 className="mt-1.5 font-display text-lg font-semibold text-[var(--text-primary)]">Growth notes</h2>
          <p className="mt-1.5 text-sm text-[var(--text-secondary)]">
            Log small, dated observations tagged to a developmental area — saved only on this device.
          </p>
        </Link>
        <Link href="/rhythm" className="rounded-card bg-surface-raised p-5 shadow-resting hover:shadow-tray">
          <p className="text-xs font-semibold uppercase tracking-wide text-wood-700">Private tool</p>
          <h2 className="mt-1.5 font-display text-lg font-semibold text-[var(--text-primary)]">Daily rhythm builder</h2>
          <p className="mt-1.5 text-sm text-[var(--text-secondary)]">
            Reorder and adapt the example rhythm into one that fits your own family&apos;s day.
          </p>
        </Link>
      </div>

      <div className="mt-8 rounded-panel bg-surface-raised p-8 shadow-resting">
        <p className="text-xs font-semibold uppercase tracking-widest text-wood-700">This Week&apos;s Digest</p>
        <h2 className="mt-2 font-display text-2xl font-semibold text-[var(--text-primary)]">A preview of what we&apos;d send</h2>
        <p className="mt-2 max-w-xl text-sm text-[var(--text-secondary)]">
          Weekly digest emails aren&apos;t live yet, but here&apos;s a preview of the age-matched activities one would
          include, picked fresh each ISO week.
        </p>
        <div className="mt-6">
          <DigestPreview />
        </div>
      </div>

      <div className="mt-8 rounded-panel bg-surface-raised p-8 shadow-resting">
        <p className="text-xs font-semibold uppercase tracking-widest text-wood-700">Get Notified</p>
        <h2 className="mt-2 font-display text-2xl font-semibold text-[var(--text-primary)]">Join the waitlist for weekly digests</h2>
        <p className="mt-2 max-w-xl text-sm text-[var(--text-secondary)]">
          {emailSignupConfigured
            ? "Leave your email and confirm it to join — we'll only email you about the weekly digest, and you can unsubscribe any time."
            : "Weekly digest emails aren't live yet."}
        </p>
        <div className="mt-6 max-w-md">
          <NewsletterSignup configured={emailSignupConfigured} />
        </div>
      </div>

      <div className="mt-14 relative overflow-hidden rounded-panel p-8 text-center text-white" data-testid="parents-community-banner">
        <ResponsiveArt
          asset={{
            id: "mc-gen-community-join-1024",
            src: "/images/real/mc-gen-community-join-1024.jpg",
            alt: "Parents and children sitting together on a rug, sharing a storybook.",
            width: 1024,
            height: 1024,
            type: "photo",
            dominantTone: "wood",
            isPlaceholder: false,
          }}
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-wood-700/75" />
        <h2 className="relative font-display text-2xl font-semibold text-white">Community features are planned</h2>
        <p className="relative mt-2 text-white/85">
          A space for parents to ask questions and share observations isn&apos;t live yet. In the meantime, join the
          digest waitlist below to hear when it launches.
        </p>
      </div>
    </div>
  );
}
