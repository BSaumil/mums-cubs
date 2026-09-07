import type { Metadata } from "next";
import { SiteSearch } from "@/components/search/SiteSearch";

export const metadata: Metadata = {
  title: "Search",
  description: "Search across curriculum areas, activities, materials and blog articles.",
};

export default function SearchPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <header>
        <p className="text-xs font-semibold uppercase tracking-widest text-wood-700">Search</p>
        <h1 className="mt-2 text-4xl font-semibold">Find anything on the site.</h1>
        <p className="mt-3 text-[var(--text-secondary)]">
          One search across curriculum areas, activities, materials and every blog article.
        </p>
      </header>
      <div className="mt-8">
        <SiteSearch />
      </div>
    </div>
  );
}
