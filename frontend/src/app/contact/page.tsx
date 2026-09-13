import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/contact" },
  title: "Contact",
  description: "How to reach Mums & Cubs.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-widest text-wood-700">Contact</p>
      <h1 className="mt-2 text-4xl font-semibold text-[var(--text-primary)]">A support channel is being set up.</h1>
      <p className="mt-3 text-[var(--text-secondary)]">
        This page isn&apos;t fully configured yet, so we&apos;re not going to publish a contact address here that
        isn&apos;t actually monitored. Check back soon.
      </p>
      <p className="mt-3 text-sm text-[var(--text-subtle)]">
        If you found a broken link, a factual error in an activity, or a bug, the most reliable way to reach the
        team right now is through wherever you found this site.
      </p>
    </div>
  );
}
