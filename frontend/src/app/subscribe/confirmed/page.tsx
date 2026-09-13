import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Confirm subscription",
  robots: { index: false },
};

const COPY: Record<string, { heading: string; body: string }> = {
  confirmed: {
    heading: "You're confirmed!",
    body: "Thanks for confirming your email. You'll hear from us when there's something worth sending.",
  },
  already_confirmed: {
    heading: "Already confirmed",
    body: "This email was already confirmed — no action needed.",
  },
  blocked_by_unsubscribe: {
    heading: "This link is no longer valid",
    body: "This address was unsubscribed after this confirmation link was sent, so it wasn't reactivated. If you'd like to sign up again, use the form on the Parents page.",
  },
  invalid_or_expired: {
    heading: "This link has expired",
    body: "Confirmation links are only valid for 24 hours. Head back to the Parents page to request a new one.",
  },
};

export default async function ConfirmedPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
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
