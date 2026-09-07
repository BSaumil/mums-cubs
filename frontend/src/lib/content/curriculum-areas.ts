import type { Activity, CurriculumArea, VisualAsset } from "@/lib/types";

const heroAsset = (
  file: string,
  alt: string,
  dominantTone: VisualAsset["dominantTone"],
  w = 1200,
  h = 800,
): VisualAsset => ({
  id: file.replace(/\.svg$/, ""),
  src: `/images/placeholders/${file}`,
  alt,
  width: w,
  height: h,
  type: "illustration",
  dominantTone,
  isPlaceholder: true,
});

const activityAsset = (file: string, alt: string, dominantTone: VisualAsset["dominantTone"]): VisualAsset => ({
  id: file.replace(/\.svg$/, ""),
  src: `/images/placeholders/${file}`,
  alt,
  width: 960,
  height: 1200,
  type: "illustration",
  dominantTone,
  isPlaceholder: true,
});

const realAsset = (file: string, alt: string, dominantTone: VisualAsset["dominantTone"]): VisualAsset => ({
  id: file.replace(/\.png$/, ""),
  src: `/images/real/${file}`,
  alt,
  width: 1254,
  height: 1254,
  type: "photo",
  dominantTone,
  isPlaceholder: false,
});

const practicalLifeActivity: Activity = {
  id: "pouring-water",
  slug: "pouring-water",
  title: "Pouring Water",
  visual: realAsset(
    "mc-real-practical-life-1254.png",
    "A child's hands pouring water from a jug into a small bowl.",
    "wood",
  ),
  duration: { min: 5, max: 10 },
  ageBand: "18m-3",
  environment: "indoor",
  interaction: "independent",
  objective: "Control movement through repetition.",
  contextLabel: "Montessori Practice",
  materials: [{ materialId: "pouring-set", name: "Pouring Set" }],
  steps: [
    { order: 1, actionVerb: "observe", caption: "Watch the tray being set from left to right.", image: activityAsset("mc-montessori-practical-life-pouring-activity-960.svg", "A pouring tray set out with two small jugs.", "wood") },
    { order: 2, actionVerb: "pour", caption: "Pour slowly from the full jug into the empty one.", image: activityAsset("mc-montessori-practical-life-pouring-activity-960.svg", "Child pouring water carefully between two jugs.", "wood") },
    { order: 3, actionVerb: "repeat", caption: "Repeat as many times as concentration allows.", image: activityAsset("mc-montessori-practical-life-pouring-activity-960.svg", "Child repeating the pouring sequence independently.", "wood") },
  ],
  observableOutcomes: ["Steadier hand control", "Longer independent focus", "Calm after completing the cycle"],
};

const genAsset = (file: string, alt: string, dominantTone: VisualAsset["dominantTone"]): VisualAsset => ({
  id: file.replace(/\.jpg$/, ""),
  src: `/images/real/${file}`,
  alt,
  width: 1024,
  height: 1024,
  type: "photo",
  dominantTone,
  isPlaceholder: false,
});

const buttoningActivity: Activity = {
  id: "buttoning-frame",
  slug: "buttoning-frame",
  title: "Buttoning Frame",
  visual: genAsset(
    "mc-gen-buttoning-frame-1024.jpg",
    "A child's fingers working a row of buttons on a wooden dressing frame.",
    "wood",
  ),
  duration: { min: 5, max: 8 },
  ageBand: "3-6",
  environment: "indoor",
  interaction: "independent",
  objective: "Refine fine-motor coordination needed for self-dressing.",
  contextLabel: "Montessori Practice",
  materials: [],
  steps: [
    { order: 1, actionVerb: "observe", caption: "Notice how each button meets its hole.", image: genAsset("mc-gen-buttoning-frame-1024.jpg", "A wooden dressing frame with a row of buttons.", "wood") },
    { order: 2, actionVerb: "repeat", caption: "Work down the row, then undo and start again.", image: genAsset("mc-gen-buttoning-frame-1024.jpg", "Child working buttons one by one down the frame.", "wood") },
  ],
  observableOutcomes: ["Pincer-grip strength", "Sequencing left to right"],
};

const pinkTowerActivity: Activity = {
  id: "pink-tower-build",
  slug: "pink-tower-build",
  title: "Building the Pink Tower",
  visual: realAsset(
    "mc-real-sensorial-1254.png",
    "A child stacking ten graduated pink cubes from largest to smallest.",
    "clay",
  ),
  duration: { min: 8, max: 15 },
  ageBand: "3-6",
  environment: "indoor",
  interaction: "independent",
  objective: "Discriminate size in three dimensions and build a visual sense of order.",
  contextLabel: "Montessori Practice",
  materials: [{ materialId: "pink-tower", name: "Pink Tower" }],
  steps: [
    { order: 1, actionVerb: "observe", caption: "Compare two cubes before choosing the largest.", image: activityAsset("mc-montessori-sensorial-pink-tower-activity-960.svg", "Child comparing two pink cubes side by side.", "clay") },
    { order: 2, actionVerb: "arrange", caption: "Stack each cube centred on the one below.", image: activityAsset("mc-montessori-sensorial-pink-tower-activity-960.svg", "Child stacking cubes into a graduated tower.", "clay") },
    { order: 3, actionVerb: "repeat", caption: "Knock it down gently and build again.", image: activityAsset("mc-montessori-sensorial-pink-tower-activity-960.svg", "Completed pink tower of ten graduated cubes.", "clay") },
  ],
  observableOutcomes: ["Visual size discrimination", "Steady hand-eye coordination", "Pride in a completed sequence"],
};

const sandpaperLettersActivity: Activity = {
  id: "trace-sandpaper-letters",
  slug: "trace-sandpaper-letters",
  title: "Tracing Sandpaper Letters",
  visual: realAsset(
    "mc-real-language-1254.png",
    "A child tracing wooden letter tiles on a low table.",
    "wood",
  ),
  duration: { min: 5, max: 10 },
  ageBand: "3-6",
  environment: "indoor",
  interaction: "guided",
  objective: "Connect a letter's sound, shape and muscular memory before writing.",
  contextLabel: "Montessori Practice",
  materials: [{ materialId: "sandpaper-letters", name: "Sandpaper Letters" }],
  steps: [
    { order: 1, actionVerb: "listen", caption: "Say the letter's sound, not its name.", image: activityAsset("mc-montessori-language-sandpaper-letters-activity-960.svg", "An adult introducing a letter sound beside the card.", "wood") },
    { order: 2, actionVerb: "trace", caption: "Trace the shape with two fingers in writing direction.", image: activityAsset("mc-montessori-language-sandpaper-letters-activity-960.svg", "Child tracing a sandpaper letter with two fingers.", "wood") },
  ],
  observableOutcomes: ["Sound-symbol association", "Correct letter-formation direction"],
};

const goldenBeadsActivity: Activity = {
  id: "golden-beads-explore",
  slug: "golden-beads-explore",
  title: "Exploring Golden Beads",
  visual: realAsset(
    "mc-real-mathematics-1254.png",
    "A child arranging golden bead quantities from a unit to a thousand cube.",
    "clay",
  ),
  duration: { min: 10, max: 20 },
  ageBand: "3-6",
  environment: "indoor",
  interaction: "guided",
  objective: "Feel quantity as a physical amount before it becomes a written numeral.",
  contextLabel: "Montessori Practice",
  materials: [{ materialId: "golden-beads", name: "Golden Beads" }],
  steps: [
    { order: 1, actionVerb: "touch", caption: "Hold a unit, a ten-bar, a hundred-square.", image: activityAsset("mc-montessori-mathematics-golden-beads-activity-960.svg", "Child holding golden bead units, tens and hundreds.", "clay") },
    { order: 2, actionVerb: "count", caption: "Count each quantity aloud before naming it.", image: activityAsset("mc-montessori-mathematics-golden-beads-activity-960.svg", "Child counting beads aloud one by one.", "clay") },
    { order: 3, actionVerb: "match", caption: "Match the quantity to its printed numeral card.", image: activityAsset("mc-montessori-mathematics-golden-beads-activity-960.svg", "Bead quantity placed beside its matching numeral card.", "clay") },
  ],
  observableOutcomes: ["Quantity-to-numeral matching", "Comfort with place value", "Confident counting sequence"],
};

const landformActivity: Activity = {
  id: "landform-tray-explore",
  slug: "landform-tray-explore",
  title: "Exploring the Landform Tray",
  visual: realAsset(
    "mc-real-culture-science-1254.png",
    "A child exploring a globe and world puzzle map.",
    "leaf",
  ),
  duration: { min: 10, max: 15 },
  ageBand: "3-6",
  environment: "indoor",
  interaction: "guided",
  objective: "Build vocabulary and a physical sense for how land and water meet.",
  contextLabel: "Montessori Practice",
  materials: [{ materialId: "globe-landform", name: "Globe & Landform Tray" }],
  steps: [
    { order: 1, actionVerb: "observe", caption: "Notice where the tray rises and where it dips.", image: activityAsset("mc-montessori-culture-science-landform-activity-960.svg", "Child observing the raised and lowered areas of a landform tray.", "leaf") },
    { order: 2, actionVerb: "touch", caption: "Pour water to see a lake or an island appear.", image: activityAsset("mc-montessori-culture-science-landform-activity-960.svg", "Water poured into a landform tray to form a small lake.", "leaf") },
    { order: 3, actionVerb: "match", caption: "Match the shape to its name card.", image: activityAsset("mc-montessori-culture-science-landform-activity-960.svg", "A landform matched to its printed name card.", "leaf") },
  ],
  observableOutcomes: ["New geography vocabulary", "Cause-and-effect observation"],
};

const numberPatternActivity: Activity = {
  id: "number-pattern-seeing",
  slug: "number-pattern-seeing",
  title: "Seeing Number Patterns",
  visual: activityAsset(
    "mc-vedic-mental-mathematics-pattern-activity-960.svg",
    "Child arranging dot cards to notice a repeating number pattern.",
    "saffron",
  ),
  duration: { min: 10, max: 15 },
  ageBand: "6-9",
  environment: "indoor",
  interaction: "guided",
  objective: "Notice relationships between numbers before applying a procedure.",
  contextLabel: "Mathematical Method",
  materials: [{ materialId: "wooden-abacus", name: "Wooden Abacus" }],
  steps: [
    { order: 1, actionVerb: "observe", caption: "Look for what stays the same across a row.", image: activityAsset("mc-vedic-mental-mathematics-pattern-activity-960.svg", "Rows of dot cards arranged to reveal a pattern.", "saffron") },
    { order: 2, actionVerb: "count", caption: "Say the pattern aloud before writing it down.", image: activityAsset("mc-vedic-mental-mathematics-pattern-activity-960.svg", "Child counting a number pattern aloud.", "saffron") },
    { order: 3, actionVerb: "repeat", caption: "Try a new pattern using the abacus as a check.", image: activityAsset("mc-vedic-mental-mathematics-pattern-activity-960.svg", "Wooden abacus used to check a number pattern.", "saffron") },
  ],
  observableOutcomes: ["Mental number-relationship sense", "Reduced reliance on rote procedure"],
};

const chantingActivity: Activity = {
  id: "rhythmic-chanting",
  slug: "rhythmic-chanting",
  title: "Rhythmic Chanting Practice",
  visual: realAsset(
    "mc-real-sanskrit-sounds-1200.png",
    "A child practising Sanskrit sound cards together with a parent.",
    "saffron",
  ),
  duration: { min: 5, max: 10 },
  ageBand: "3-6",
  environment: "either",
  interaction: "guided",
  objective: "Train listening, pronunciation and sustained attention through rhythm.",
  contextLabel: "Gurukul-Inspired Practice",
  materials: [],
  steps: [
    { order: 1, actionVerb: "listen", caption: "Listen to a short verse spoken slowly.", image: realAsset("mc-real-chanting-rhythm-1254.png", "A child sitting calmly with a hand drum, listening for a verse.", "saffron") },
    { order: 2, actionVerb: "repeat", caption: "Repeat it back, matching the rhythm.", image: realAsset("mc-real-chanting-rhythm-1254.png", "A child repeating a verse, matching its rhythm with hands in namaste.", "saffron") },
  ],
  observableOutcomes: ["Clearer pronunciation", "Longer sustained listening"],
  safetyNotes: ["Keep volume at a comfortable conversational level."],
};

const natureWalkActivity: Activity = {
  id: "seasonal-nature-walk",
  slug: "seasonal-nature-walk",
  title: "Seasonal Nature Walk",
  visual: realAsset(
    "mc-real-nature-classroom-1254.png",
    "A child planting a seedling in the garden, treating nature as a classroom.",
    "leaf",
  ),
  duration: { min: 15, max: 30 },
  ageBand: "3-6",
  environment: "outdoor",
  interaction: "guided",
  objective: "Build a direct, unhurried relationship with the natural world.",
  contextLabel: "Gurukul-Inspired Practice",
  materials: [{ materialId: "nature-collection-tray", name: "Nature Collection Tray" }],
  steps: [
    { order: 1, actionVerb: "observe", caption: "Walk slowly and notice what has changed since last time.", image: activityAsset("mc-vedic-nature-observation-activity-960.svg", "Child walking slowly outdoors, looking closely at plants.", "leaf") },
    { order: 2, actionVerb: "touch", caption: "Collect a few leaves, seeds or stones.", image: activityAsset("mc-vedic-nature-observation-activity-960.svg", "Child collecting leaves and stones on a nature walk.", "leaf") },
    { order: 3, actionVerb: "arrange", caption: "Sort the collection back on the tray at home.", image: activityAsset("mc-vedic-nature-observation-activity-960.svg", "Collected natural objects sorted on a wooden tray.", "leaf") },
  ],
  observableOutcomes: ["Seasonal vocabulary", "Calm, unhurried attention"],
};

const morningRhythmActivity: Activity = {
  id: "build-morning-rhythm",
  slug: "build-morning-rhythm",
  title: "Building a Morning Rhythm",
  visual: realAsset(
    "mc-real-daily-rhythm-1254.png",
    "A mother and daughter watching the sunrise together, beginning their day with intention.",
    "sky",
  ),
  duration: { min: 10, max: 15 },
  ageBand: "3-6",
  environment: "indoor",
  interaction: "group",
  objective: "Help a child anticipate and understand the sequence of their own morning.",
  contextLabel: "Gurukul-Inspired Practice",
  materials: [{ materialId: "rhythm-cards", name: "Daily Rhythm Cards" }],
  steps: [
    { order: 1, actionVerb: "observe", caption: "Lay out the picture cards in a loose pile.", image: activityAsset("mc-vedic-daily-rhythm-morning-activity-960.svg", "Rhythm cards laid out on a table before sorting.", "sky") },
    { order: 2, actionVerb: "arrange", caption: "Arrange them in the order your morning actually happens.", image: activityAsset("mc-vedic-daily-rhythm-morning-activity-960.svg", "Cards arranged in sequence to show a morning rhythm.", "sky") },
    { order: 3, actionVerb: "repeat", caption: "Revisit and adjust the sequence together each week.", image: activityAsset("mc-vedic-daily-rhythm-morning-activity-960.svg", "Family reviewing a completed daily rhythm sequence.", "sky") },
  ],
  observableOutcomes: ["Reduced morning resistance", "A child who can predict what comes next"],
};

export const curriculumAreas: CurriculumArea[] = [
  {
    id: "practical-life",
    slug: "practical-life",
    title: "Practical Life",
    paradigm: "montessori",
    ageBands: ["18m-3", "3-6"],
    leadSentence: "Everyday movement becomes independence.",
    heroAsset: realAsset("mc-real-practical-life-1254.png", "A child's hands pouring water from a jug into a small bowl.", "wood"),
    visualBadge: "Coordination",
    contextLabel: "Montessori Practice",
    developmentalDomains: ["physical", "cognitive"],
    activities: [practicalLifeActivity, buttoningActivity],
    materialIds: ["pouring-set"],
    parentObservation: "Notice how long your child stays with the movement before losing interest — that duration tends to grow.",
    relatedAreas: ["sensorial", "daily-rhythm"],
  },
  {
    id: "sensorial",
    slug: "sensorial",
    title: "Sensorial",
    paradigm: "montessori",
    ageBands: ["3-6"],
    leadSentence: "Children understand the world by refining the senses.",
    heroAsset: realAsset("mc-real-sensorial-1254.png", "A child stacking ten graduated pink cubes from largest to smallest.", "clay"),
    visualBadge: "Sensory Refinement",
    contextLabel: "Montessori Practice",
    developmentalDomains: ["cognitive", "physical"],
    activities: [pinkTowerActivity],
    materialIds: ["pink-tower", "sound-cylinders"],
    parentObservation: "Watch for self-correction — a child who notices a cube is out of order without being told.",
    relatedAreas: ["practical-life", "mathematics"],
  },
  {
    id: "language",
    slug: "language",
    title: "Language",
    paradigm: "montessori",
    ageBands: ["3-6"],
    leadSentence: "Touch, sound and symbol meet before fluent reading.",
    heroAsset: realAsset("mc-real-language-1254.png", "A child tracing wooden letter tiles on a low table.", "wood"),
    visualBadge: "Early Literacy",
    contextLabel: "Montessori Practice",
    developmentalDomains: ["language", "cognitive"],
    activities: [sandpaperLettersActivity],
    materialIds: ["sandpaper-letters"],
    parentObservation: "Listen for your child sounding out the first letter of their own name unprompted.",
    relatedAreas: ["sound-phonetics", "sensorial"],
  },
  {
    id: "mathematics",
    slug: "mathematics",
    title: "Mathematics",
    paradigm: "montessori",
    ageBands: ["3-6", "6-9"],
    leadSentence: "Quantity is touched before it becomes abstraction.",
    heroAsset: realAsset("mc-real-mathematics-1254.png", "Golden bead quantities arranged from a single unit to a thousand cube.", "clay"),
    visualBadge: "Concrete to Abstract",
    contextLabel: "Montessori Practice",
    developmentalDomains: ["cognitive"],
    activities: [goldenBeadsActivity],
    materialIds: ["golden-beads"],
    parentObservation: "Notice whether your child reaches for the physical beads or answers straight from memory — both are progress.",
    relatedAreas: ["mental-mathematics", "sensorial"],
  },
  {
    id: "culture-science",
    slug: "culture-science",
    title: "Culture & Science",
    paradigm: "montessori",
    ageBands: ["3-6", "6-9"],
    leadSentence: "The child discovers their place inside a larger world.",
    heroAsset: realAsset("mc-real-culture-science-1254.png", "A child exploring a globe and world puzzle map.", "leaf"),
    visualBadge: "Our World",
    contextLabel: "Montessori Practice",
    developmentalDomains: ["cognitive", "nature", "social"],
    activities: [landformActivity],
    materialIds: ["globe-landform"],
    parentObservation: "Watch for new vocabulary appearing in unrelated conversation — a sign the concept has taken root.",
    relatedAreas: ["nature", "mathematics"],
  },
  {
    id: "mental-mathematics",
    slug: "mental-mathematics",
    title: "Mental Mathematics & Number Sense",
    paradigm: "vedic",
    ageBands: ["6-9", "9-12"],
    leadSentence: "Number becomes pattern before it becomes procedure.",
    heroAsset: realAsset("mc-real-vedic-mathematics-1254.png", "A child arranging number and pattern cards beside a wooden abacus.", "saffron"),
    visualBadge: "Number Sense",
    contextLabel: "Mathematical Method",
    developmentalDomains: ["cognitive"],
    activities: [numberPatternActivity],
    materialIds: ["wooden-abacus"],
    parentObservation: "Ask your child to explain a pattern in their own words before checking the answer — the explanation matters more than speed.",
    relatedAreas: ["mathematics", "sound-phonetics"],
  },
  {
    id: "sound-phonetics",
    slug: "sound-phonetics",
    title: "Chanting, Rhythm & Phonetics",
    paradigm: "vedic",
    ageBands: ["3-6", "6-9"],
    leadSentence: "Rhythm trains listening, pronunciation and sustained attention.",
    heroAsset: realAsset("mc-real-chanting-phonetics-1254.png", "A mother and son chanting together, hands pressed in namaste.", "saffron"),
    visualBadge: "Listening & Rhythm",
    contextLabel: "Gurukul-Inspired Practice",
    developmentalDomains: ["language", "reflection"],
    activities: [chantingActivity],
    materialIds: [],
    parentObservation: "Notice whether your child can hold the rhythm for a few lines longer than last month.",
    relatedAreas: ["language", "daily-rhythm"],
  },
  {
    id: "nature",
    slug: "nature",
    title: "Nature Connection",
    paradigm: "vedic",
    ageBands: ["3-6", "6-9"],
    leadSentence: "Nature becomes both classroom and reference point.",
    heroAsset: realAsset("mc-real-nature-connection-1200.png", "A child closely examining a leaf in a garden.", "leaf"),
    visualBadge: "Outdoor Observation",
    contextLabel: "Gurukul-Inspired Practice",
    developmentalDomains: ["nature", "reflection"],
    activities: [natureWalkActivity],
    materialIds: ["nature-collection-tray"],
    parentObservation: "Look for a question your child asks unprompted on the walk — it points to what to explore next.",
    relatedAreas: ["culture-science", "daily-rhythm"],
  },
  {
    id: "daily-rhythm",
    slug: "daily-rhythm",
    title: "Dinacharya / Daily Rhythm",
    paradigm: "vedic",
    ageBands: ["18m-3", "3-6", "6-9"],
    leadSentence: "Repeated rhythms help children understand sequence, transition and rest.",
    heroAsset: realAsset("mc-real-dinacharya-1254.png", "A mother and daughter pausing together at sunrise, part of their Dinacharya morning rhythm.", "sky"),
    visualBadge: "Daily Rhythm",
    contextLabel: "Gurukul-Inspired Practice",
    developmentalDomains: ["character", "reflection", "emotional"],
    activities: [morningRhythmActivity],
    materialIds: ["rhythm-cards"],
    parentObservation: "A rhythm is a scaffold, not a schedule — notice which moments your child resists and adjust rather than enforce.",
    relatedAreas: ["practical-life", "nature"],
  },
];

export function getCurriculumAreaBySlug(slug: string): CurriculumArea | undefined {
  return curriculumAreas.find((area) => area.slug === slug);
}

export function getAllActivities(): Activity[] {
  return curriculumAreas.flatMap((area) => area.activities);
}

export function getActivityBySlug(slug: string): { activity: Activity; area: CurriculumArea } | undefined {
  for (const area of curriculumAreas) {
    const activity = area.activities.find((item) => item.slug === slug);
    if (activity) return { activity, area };
  }
  return undefined;
}
