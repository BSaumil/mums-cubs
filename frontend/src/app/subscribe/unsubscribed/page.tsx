import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Unsubscribe",
  robots: { index: false },
};

const COPY: Record<string, { heading: string; body: string }> = {
  unsubscribed: {
    heading: "You're unsubscribed",
    body: "You won't receive any more emails from this list. If that was a mistake, you can sign up again any time from the Parents page.",
  },
  already_unsubscribed: {
    heading: "Already unsubscribed",
    body: "This address was already unsubscribed — no action needed.",
  },
  invalid_or_expired: {
    heading: "This link isn't valid",
    body: "This unsubscribe link couldn't be used. If you're still receiving emails you don't want, use the unsubscribe link in the most recent one.",
  },
};

export default async function UnsubscribedPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const { status } = await searchParams;
  const copy = COPY[status ?? ""] ?? COPY.invalid_or_expired;

  return (
    <div className="mx-auto max-w-lg px-4 py-16 text-center sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold text-[var(--text-primary)]">{copy.heading}</h1>
      <p className="mt-3 text-[var(--text-secondary)]">{copy.body}</p>
      <Link href="/parents" className="mt-6 inline-flex min-h-11 items-center rounded-capsule bg-wood-700 px-5 py-2.5 text-sm font-medium text-white">
        Back to Parents
      </Link>
    </div>
  );
}
