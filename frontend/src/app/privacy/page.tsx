import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/privacy" },
  title: "Privacy",
  description: "What Mums & Cubs actually collects today, and what stays on your device.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-widest text-wood-700">Privacy</p>
      <h1 className="mt-2 text-4xl font-semibold text-[var(--text-primary)]">What we actually collect.</h1>
      <p className="mt-3 text-[var(--text-secondary)]">
        This describes what this site does today, in plain terms — not a template. It will be updated if that
        changes, and we won&apos;t backdate a broader claim than the site&apos;s actual behaviour supports.
      </p>

      <div className="mt-10 space-y-8">
        <section>
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">Tools that stay on your device</h2>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            Growth Notes, the Daily Rhythm builder, parent observation notes, your light/dark theme choice, and
            &quot;mark as read&quot; on blog posts are all saved only in your browser&apos;s local storage. Nothing
            about them is sent to us or to anyone else. They&apos;re lost if you clear your browser data, and there
            is currently no export or sync feature — what you see in that browser, on that device, is the only copy.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">Email signup</h2>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            Where an email signup is active on this site, we collect the email address you provide, a timestamp, the
            version of the consent text you agreed to, and — only if you choose to share them — an age band or
            learning path preference. We never ask for your child&apos;s name, birth date, photos, or health
            information. You can unsubscribe at any time using the link in any email we send; unsubscribing stops
            future messages immediately. If a signup form on this site is showing a message that email signup
            isn&apos;t available yet, no email you type into it is stored or sent anywhere.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">Analytics</h2>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            The site can dispatch anonymous product-usage events (like which page or activity was viewed) to a
            browser-level event bus so we can later connect an analytics tool if we choose to. As of today, no
            analytics vendor is connected — those events are not currently sent anywhere outside your browser.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">Cookies and tracking</h2>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            We don&apos;t use advertising or cross-site tracking cookies. Your theme preference is stored using your
            browser&apos;s local storage, not a cookie.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">Questions</h2>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            See the <a href="/contact" className="font-medium text-wood-700 hover:underline">Contact</a> page.
          </p>
        </section>
      </div>
    </div>
  );
}
