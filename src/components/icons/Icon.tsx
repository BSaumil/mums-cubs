import type { SVGProps } from "react";

/**
 * Shared line-icon language: rounded endpoints, ~1.75 stroke, minimal
 * internal detail. Functional-only icons (menu, close, search, arrow) live
 * here alongside the brand's custom subject icons — leaf, heart, group, sun,
 * jug, book, globe, wave, plus the brand guide's own "Brand Elements" row
 * (heart=Love, leaf=Growth, sun=Brighter Tomorrows, lotus=Inner Wisdom,
 * tree=Strong Foundations) — so nothing falls back to a generic icon pack
 * for the product's dominant visual identity.
 */
export type IconName =
  | "leaf"
  | "heart"
  | "group"
  | "sun"
  | "moon"
  | "jug"
  | "book"
  | "globe"
  | "wave"
  | "lotus"
  | "tree"
  | "menu"
  | "close"
  | "search"
  | "arrow-right"
  | "chevron-down"
  | "flame"
  | "wind";

const PATHS: Record<IconName, string> = {
  leaf: "M12 3c4.5 2 6 5.5 6 9s-2.5 8-6 9c-3.5-1-6-5.5-6-9s1.5-7 6-9Z M12 5v15",
  heart: "M12 20s-7-4.4-9.5-9C.8 7.3 3 4 6.3 4 8.6 4 10.5 5.4 12 7.5 13.5 5.4 15.4 4 17.7 4 21 4 23.2 7.3 21.5 11 19 15.6 12 20 12 20Z",
  group: "M8 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z M16 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z M3 20c.6-3 2.7-5 5-5s4.4 2 5 5 M11 20c.6-3 2.7-5 5-5s4.4 2 5 5",
  sun: "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z M12 2v2.5 M12 19.5V22 M4.9 4.9l1.8 1.8 M17.3 17.3l1.8 1.8 M2 12h2.5 M19.5 12H22 M4.9 19.1l1.8-1.8 M17.3 6.7l1.8-1.8",
  moon: "M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5Z",
  jug: "M9 3.5 7.5 11a5 5 0 0 0 9 0L15 3.5 M6.5 21h11a1 1 0 0 0 1-1.2l-1.3-6.3H6.8L5.5 19.8A1 1 0 0 0 6.5 21Z M15 6.5c2.5.5 4 2 4 4.5",
  book: "M4 5.5c2-1 4.5-1 8 .5 3.5-1.5 6-1.5 8-.5v13c-2-1-4.5-1-8 .5-3.5-1.5-6-1.5-8-.5Z M12 6v13",
  globe: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z M3 12h18 M12 3c2.5 2.4 4 5.6 4 9s-1.5 6.6-4 9c-2.5-2.4-4-5.6-4-9s1.5-6.6 4-9Z",
  wave: "M2 12c1.7-3 3.3-3 5 0s3.3 3 5 0 3.3-3 5 0 3.3 3 5 0",
  lotus: "M12 21c-4-1-6.5-4-6.5-7.5C7.5 15 9.7 15.8 12 16c2.3-.2 4.5-1 6.5-2.5C18.5 17 16 20 12 21Z M12 16c-1.5-2-1.8-5-.5-8.5C13 10.5 14 13 12 16Z M12 16c-3-1.2-4.7-3.3-5.3-6.3C9.8 10.3 11.6 12.5 12 16Z M12 16c3-1.2 4.7-3.3 5.3-6.3C14.2 10.3 12.4 12.5 12 16Z",
  tree: "M12 3 6.5 11h3L5 19h6M12 3l5.5 8h-3L19 19h-6 M12 15v6",
  menu: "M4 7h16 M4 12h16 M4 17h16",
  close: "M6 6l12 12 M18 6 6 18",
  search: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z M21 21l-4.3-4.3",
  "arrow-right": "M4 12h16 M13 5l7 7-7 7",
  "chevron-down": "M6 9l6 6 6-6",
  flame: "M12 3c2 3 5 6.2 5 9.5a5 5 0 1 1-10 0C7 9.2 10 6 12 3Z M12 12.5c.6-1 .9-2 .6-3.3-1 1.2-1.6 2.4-1.6 3.6a1 1 0 0 0 1 1c.4 0 .7-.2.9-.4",
  wind: "M3 7.5h10a2.25 2.25 0 1 0-2.25-2.25 M3 12h14a2.25 2.25 0 1 1-2.25 2.25 M3 16.5h8",
};

export function Icon({ name, ...props }: { name: IconName } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d={PATHS[name]} />
    </svg>
  );
}
