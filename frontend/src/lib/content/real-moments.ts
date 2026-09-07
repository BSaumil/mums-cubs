import type { VisualAsset } from "@/lib/types";

export interface RealMoment {
  id: string;
  title: string;
  href: string;
  image: VisualAsset;
}

const moment = (
  file: string,
  title: string,
  alt: string,
  href: string,
  dominantTone: VisualAsset["dominantTone"],
): RealMoment => ({
  id: file.replace(/\.png$/, ""),
  title,
  href,
  image: {
    id: file.replace(/\.png$/, ""),
    src: `/images/real/${file}`,
    alt,
    width: 1254,
    height: 1254,
    type: "photo",
    dominantTone,
    isPlaceholder: false,
  },
});

export const realMoments: RealMoment[] = [
  moment("mc-real-small-hands-big-possibilities-1254.png", "Small Hands, Big Possibilities", "A child playing with wooden cylinder blocks — where Montessori meets Vedic wisdom.", "/discover", "wood"),
  moment("mc-real-two-paths-overview-1254.png", "Two Paths, One Brighter Tomorrow", "A Montessori pink-tower moment and a Vedic namaste moment, side by side.", "/discover", "clay"),
  moment("mc-real-vedic-path-1254.png", "The Vedic Path", "A child seated in namaste, representing the Vedic path — rhythm, nature, mindfulness and character.", "/discover/vedic", "saffron"),
  moment("mc-real-dinacharya-1254.png", "Dinacharya", "A mother and daughter sharing a calm sunrise moment as part of their daily rhythm.", "/curriculum/daily-rhythm", "sky"),
  moment("mc-real-daily-rhythm-1254.png", "Daily Rhythm", "A mother and daughter watching the sunrise together, beginning their day with intention.", "/curriculum/daily-rhythm", "sky"),
  moment("mc-real-chanting-phonetics-1254.png", "Chanting & Phonetics", "A mother and son chanting together, hands pressed in namaste.", "/curriculum/sound-phonetics", "saffron"),
  moment("mc-real-chanting-rhythm-1254.png", "Chanting & Rhythm", "A child sitting calmly with a hand drum, hands in namaste.", "/curriculum/sound-phonetics", "saffron"),
  moment("mc-real-sanskrit-sounds-1200.png", "Sanskrit Sounds", "A child practising Sanskrit sound cards with a parent.", "/curriculum/sound-phonetics", "saffron"),
  moment("mc-real-vedic-mathematics-1254.png", "Vedic Mathematics", "A child arranging number and pattern cards beside a wooden abacus.", "/curriculum/mental-mathematics", "saffron"),
  moment("mc-real-nature-connection-1200.png", "Nature Connection", "A child closely examining a leaf in a garden.", "/curriculum/nature", "leaf"),
  moment("mc-real-nature-classroom-1254.png", "Nature, Their First Classroom", "A child planting a seedling in the garden.", "/curriculum/nature", "leaf"),
  moment("mc-real-pancha-mahabhuta-1254.png", "Pancha Mahabhuta", "A child holding earth beside bowls representing the five elements.", "/philosophy", "leaf"),
  moment("mc-real-gratitude-mindfulness-1200.png", "Gratitude & Mindfulness", "A child pausing to reflect, journal in hand.", "/philosophy", "clay"),
  moment("mc-real-character-development-1200.png", "Character Development", "Two children sharing and building together.", "/parents", "wood"),
  moment("mc-real-family-rituals-1200.png", "Family Rituals", "A family sharing a small ritual together at home.", "/curriculum/daily-rhythm", "sky"),
  moment("mc-real-practical-life-1254.png", "Practical Life", "A child's hands pouring water from a jug into a small bowl.", "/curriculum/practical-life", "wood"),
  moment("mc-real-sensorial-1254.png", "Sensorial", "A child stacking ten graduated pink cubes from largest to smallest.", "/curriculum/sensorial", "clay"),
  moment("mc-real-language-1254.png", "Language", "A child tracing wooden letter tiles on a low table.", "/curriculum/language", "wood"),
  moment("mc-real-mathematics-1254.png", "Mathematics", "Golden bead quantities arranged from a single unit to a thousand cube.", "/curriculum/mathematics", "clay"),
  moment("mc-real-culture-science-1254.png", "Culture & Science", "A child exploring a globe and world puzzle map.", "/curriculum/culture-science", "leaf"),
];
