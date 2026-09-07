import Link from "next/link";
import { Icon } from "@/components/icons/Icon";

export function CurriculumCTA() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center gap-6 rounded-hero bg-wood-700 px-8 py-14 text-center text-white sm:px-16">
        <h2 className="max-w-xl font-display text-3xl font-semibold sm:text-4xl">
          Raising capable minds. Grounded hearts.
        </h2>
        <p className="max-w-md text-white/85">
          Walk through every curriculum area, filtered by age and by path, in one visual hub.
        </p>
        <Link
          href="/curriculum"
          className="inline-flex min-h-11 items-center gap-2 rounded-capsule bg-white px-6 py-3 text-sm font-semibold text-wood-700 transition-transform hover:-translate-y-0.5"
        >
          Explore the Curriculum Hub
          <Icon name="arrow-right" className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
