#!/usr/bin/env node
/**
 * Generates tasteful, art-directed SVG placeholders for imagery that has not
 * yet been replaced by real production photography (see
 * docs/MUMS_CUBS_VISUAL_ASSET_MANIFEST.md). Run with `node scripts/generate-placeholders.mjs`.
 *
 * Deliberately avoids baking any caption/label text into the artwork
 * (unreadable generated labels are explicitly disallowed by the brand
 * direction) — each image is a gradient field plus a single restrained
 * line-icon from the shared icon language.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, "..", "public", "images", "placeholders");

const TONES = {
  wood: { from: "#F5ECE0", to: "#E9D8C3", accent: "#9B6B43", ink: "#70492F" },
  clay: { from: "#FBEDE7", to: "#F5D9CE", accent: "#C76D50", ink: "#964932" },
  leaf: { from: "#EFF4EC", to: "#DEE8D8", accent: "#738E63", ink: "#506446" },
  saffron: { from: "#FFF5DE", to: "#FFE9B7", accent: "#D99121", ink: "#90550E" },
  sky: { from: "#EDF6F7", to: "#E4F0EF", accent: "#669DA3", ink: "#3D291E" },
};

/** Icon library: rounded-endpoint, ~1.75px-equivalent stroke, minimal detail. */
const ICONS = {
  jug: (s) => `
    <path d="M-30 40 L-22 -30 Q-22 -40 -10 -40 L10 -40 Q22 -40 22 -30 L30 40 Q30 48 20 48 L-20 48 Q-30 48 -30 40 Z" fill="none" stroke="${s}" stroke-width="4" stroke-linejoin="round"/>
    <path d="M22 -22 Q42 -18 40 4" fill="none" stroke="${s}" stroke-width="4" stroke-linecap="round"/>
    <circle cx="4" cy="72" r="3" fill="${s}"/>
    <circle cx="-4" cy="86" r="2.4" fill="${s}"/>
  `,
  tower: (s) => `
    <rect x="-34" y="34" width="68" height="20" rx="4" fill="none" stroke="${s}" stroke-width="4"/>
    <rect x="-26" y="10" width="52" height="20" rx="4" fill="none" stroke="${s}" stroke-width="4"/>
    <rect x="-18" y="-14" width="36" height="20" rx="4" fill="none" stroke="${s}" stroke-width="4"/>
    <rect x="-10" y="-38" width="20" height="20" rx="4" fill="none" stroke="${s}" stroke-width="4"/>
  `,
  letter: (s) => `
    <path d="M-24 40 L0 -40 L24 40" fill="none" stroke="${s}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M-13 12 L13 12" fill="none" stroke="${s}" stroke-width="4.5" stroke-linecap="round"/>
  `,
  beads: (s) => `
    <path d="M-40 0 L40 0" fill="none" stroke="${s}" stroke-width="3"/>
    <circle cx="-32" cy="0" r="9" fill="none" stroke="${s}" stroke-width="4"/>
    <circle cx="-11" cy="0" r="9" fill="none" stroke="${s}" stroke-width="4"/>
    <circle cx="11" cy="0" r="9" fill="none" stroke="${s}" stroke-width="4"/>
    <circle cx="32" cy="0" r="9" fill="none" stroke="${s}" stroke-width="4"/>
  `,
  globe: (s) => `
    <circle cx="0" cy="0" r="42" fill="none" stroke="${s}" stroke-width="4"/>
    <ellipse cx="0" cy="0" rx="18" ry="42" fill="none" stroke="${s}" stroke-width="3"/>
    <path d="M-42 0 L42 0" fill="none" stroke="${s}" stroke-width="3"/>
    <path d="M-38 -18 Q0 -6 38 -18" fill="none" stroke="${s}" stroke-width="3"/>
    <path d="M-38 18 Q0 6 38 18" fill="none" stroke="${s}" stroke-width="3"/>
  `,
  leaf: (s) => `
    <path d="M0 -46 Q40 -30 40 8 Q40 44 0 46 Q-40 44 -40 8 Q-40 -30 0 -46 Z" fill="none" stroke="${s}" stroke-width="4" stroke-linejoin="round"/>
    <path d="M0 -40 L0 44" fill="none" stroke="${s}" stroke-width="3" stroke-linecap="round"/>
  `,
  sun: (s) => `
    <circle cx="0" cy="0" r="22" fill="none" stroke="${s}" stroke-width="4.5"/>
    <g stroke="${s}" stroke-width="4.5" stroke-linecap="round">
      <path d="M0 -42 L0 -32"/>
      <path d="M0 32 L0 42"/>
      <path d="M-42 0 L-32 0"/>
      <path d="M32 0 L42 0"/>
      <path d="M-29.7 -29.7 L-22.6 -22.6"/>
      <path d="M22.6 22.6 L29.7 29.7"/>
      <path d="M-29.7 29.7 L-22.6 22.6"/>
      <path d="M22.6 -22.6 L29.7 -29.7"/>
    </g>
  `,
  wave: (s) => `
    <path d="M-44 0 Q-33 -34 -22 0 Q-11 34 0 0 Q11 -34 22 0 Q33 34 44 0" fill="none" stroke="${s}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
  `,
  button: (s) => `
    <circle cx="-16" cy="0" r="18" fill="none" stroke="${s}" stroke-width="4"/>
    <circle cx="-19" cy="-4" r="2.2" fill="${s}"/>
    <circle cx="-13" cy="-4" r="2.2" fill="${s}"/>
    <circle cx="-19" cy="4" r="2.2" fill="${s}"/>
    <circle cx="-13" cy="4" r="2.2" fill="${s}"/>
    <path d="M4 -22 Q40 0 4 22" fill="none" stroke="${s}" stroke-width="4" stroke-linecap="round"/>
  `,
};

function buildSvg({ tone, icon, w, h }) {
  const t = TONES[tone];
  const iconFn = ICONS[icon];
  const cx = w / 2;
  const cy = h / 2;
  const gradId = `g-${tone}-${icon}`;
  const blobId = `blob-${tone}-${icon}`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-hidden="true">
  <defs>
    <linearGradient id="${gradId}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${t.from}"/>
      <stop offset="100%" stop-color="${t.to}"/>
    </linearGradient>
    <radialGradient id="${blobId}" cx="50%" cy="35%" r="65%">
      <stop offset="0%" stop-color="${t.to}" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="${t.to}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#${gradId})"/>
  <rect width="${w}" height="${h}" fill="url(#${blobId})"/>
  <g transform="translate(${cx} ${cy}) scale(${Math.min(w, h) / 220})">
    ${iconFn(t.accent)}
  </g>
</svg>`;
}

/** Source of truth: every generated placeholder referenced by lib/content fixtures. */
export const MANIFEST = [
  { file: "mc-montessori-hero-pouring-wide-1600.svg", tone: "wood", icon: "jug", w: 1600, h: 900 },
  { file: "mc-vedic-hero-sunrise-wide-1600.svg", tone: "saffron", icon: "sun", w: 1600, h: 900 },

  { file: "mc-montessori-practical-life-hero-1200.svg", tone: "wood", icon: "jug", w: 1200, h: 800 },
  { file: "mc-montessori-sensorial-hero-1200.svg", tone: "clay", icon: "tower", w: 1200, h: 800 },
  { file: "mc-montessori-language-hero-1200.svg", tone: "wood", icon: "letter", w: 1200, h: 800 },
  { file: "mc-montessori-mathematics-hero-1200.svg", tone: "clay", icon: "beads", w: 1200, h: 800 },
  { file: "mc-montessori-culture-science-hero-1200.svg", tone: "leaf", icon: "globe", w: 1200, h: 800 },
  { file: "mc-vedic-mental-mathematics-hero-1200.svg", tone: "saffron", icon: "beads", w: 1200, h: 800 },
  { file: "mc-vedic-sound-phonetics-hero-1200.svg", tone: "saffron", icon: "wave", w: 1200, h: 800 },
  { file: "mc-vedic-nature-hero-1200.svg", tone: "leaf", icon: "leaf", w: 1200, h: 800 },
  { file: "mc-vedic-daily-rhythm-hero-1200.svg", tone: "sky", icon: "sun", w: 1200, h: 800 },

  { file: "mc-montessori-practical-life-pouring-activity-960.svg", tone: "wood", icon: "jug", w: 960, h: 1200 },
  { file: "mc-montessori-practical-life-buttoning-activity-960.svg", tone: "wood", icon: "button", w: 960, h: 1200 },
  { file: "mc-montessori-sensorial-pink-tower-activity-960.svg", tone: "clay", icon: "tower", w: 960, h: 1200 },
  { file: "mc-montessori-language-sandpaper-letters-activity-960.svg", tone: "wood", icon: "letter", w: 960, h: 1200 },
  { file: "mc-montessori-mathematics-golden-beads-activity-960.svg", tone: "clay", icon: "beads", w: 960, h: 1200 },
  { file: "mc-montessori-culture-science-landform-activity-960.svg", tone: "leaf", icon: "globe", w: 960, h: 1200 },
  { file: "mc-vedic-mental-mathematics-pattern-activity-960.svg", tone: "saffron", icon: "beads", w: 960, h: 1200 },
  { file: "mc-vedic-sound-phonetics-chanting-activity-960.svg", tone: "saffron", icon: "wave", w: 960, h: 1200 },
  { file: "mc-vedic-nature-observation-activity-960.svg", tone: "leaf", icon: "leaf", w: 960, h: 1200 },
  { file: "mc-vedic-daily-rhythm-morning-activity-960.svg", tone: "sky", icon: "sun", w: 960, h: 1200 },

  { file: "mc-montessori-material-golden-beads-800.svg", tone: "clay", icon: "beads", w: 800, h: 800 },
  { file: "mc-montessori-material-pink-tower-800.svg", tone: "clay", icon: "tower", w: 800, h: 800 },
  { file: "mc-montessori-material-sandpaper-letters-800.svg", tone: "wood", icon: "letter", w: 800, h: 800 },
  { file: "mc-montessori-material-sound-cylinders-800.svg", tone: "clay", icon: "wave", w: 800, h: 800 },
  { file: "mc-montessori-material-globe-800.svg", tone: "leaf", icon: "globe", w: 800, h: 800 },
  { file: "mc-vedic-material-wooden-abacus-800.svg", tone: "saffron", icon: "beads", w: 800, h: 800 },
  { file: "mc-shared-material-nature-tray-800.svg", tone: "leaf", icon: "leaf", w: 800, h: 800 },
  { file: "mc-montessori-material-pouring-set-800.svg", tone: "wood", icon: "jug", w: 800, h: 800 },
  { file: "mc-vedic-material-rhythm-cards-800.svg", tone: "sky", icon: "sun", w: 800, h: 800 },
];

mkdirSync(OUT_DIR, { recursive: true });
for (const entry of MANIFEST) {
  writeFileSync(join(OUT_DIR, entry.file), buildSvg(entry), "utf8");
}

console.log(`Generated ${MANIFEST.length} placeholder assets in ${OUT_DIR}`);
