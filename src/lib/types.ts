export type Paradigm = "montessori" | "vedic" | "integrated";

export type ContextLabel =
  | "Montessori Practice"
  | "Gurukul-Inspired Practice"
  | "Cultural / Philosophical Framework"
  | "Mathematical Method"
  | "Modern Developmental Learning"
  | "Family Activity";

export type AgeBand = "18m-3" | "3-6" | "6-9" | "9-12";

export type DevelopmentDomain =
  | "physical"
  | "cognitive"
  | "language"
  | "emotional"
  | "social"
  | "nature"
  | "character"
  | "reflection";

export type DominantTone = "wood" | "clay" | "leaf" | "saffron" | "sky";

export interface SkillTag {
  id: string;
  label: string;
}

export interface VisualAsset {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  focalPoint?: { x: number; y: number };
  type: "photo" | "illustration" | "diagram" | "video" | "animation";
  dominantTone?: DominantTone;
  credit?: string;
  /** True while real production photography has not replaced this asset. */
  isPlaceholder?: boolean;
}

export type ActionVerb =
  | "pour"
  | "touch"
  | "match"
  | "trace"
  | "count"
  | "listen"
  | "observe"
  | "repeat"
  | "arrange";

export interface VisualStep {
  order: number;
  image: VisualAsset;
  caption: string;
  actionVerb: ActionVerb;
}

export interface MaterialReference {
  materialId: string;
  name: string;
}

export interface Activity {
  id: string;
  slug: string;
  title: string;
  visual: VisualAsset;
  duration?: { min: number; max: number };
  ageBand: AgeBand;
  environment: "indoor" | "outdoor" | "either";
  interaction: "independent" | "guided" | "group";
  objective: string;
  contextLabel: ContextLabel;
  materials: MaterialReference[];
  steps: VisualStep[];
  observableOutcomes: string[];
  safetyNotes?: string[];
}

export interface Material {
  id: string;
  slug: string;
  name: string;
  category: "practical" | "sensorial" | "language" | "math" | "nature" | "sound" | "rhythm";
  paradigm: Paradigm;
  visual: VisualAsset;
  description: string;
  ageBand: AgeBand;
}

export interface Principle {
  id: string;
  title: string;
  description: string;
}

export interface CurriculumArea {
  id: string;
  slug: string;
  title: string;
  paradigm: Paradigm;
  ageBands: AgeBand[];
  leadSentence: string;
  heroAsset: VisualAsset;
  visualBadge: string;
  contextLabel: ContextLabel;
  developmentalDomains: DevelopmentDomain[];
  activities: Activity[];
  materialIds: string[];
  parentObservation: string;
  educatorNotes?: string;
  relatedAreas: string[];
}

export interface CulturalContext {
  id: string;
  title: string;
  summary: string;
}

export interface LearningFramework {
  id: Paradigm;
  name: string;
  visualTheme: string;
  principles: Principle[];
  curriculumAreas: CurriculumArea[];
  developmentalDomains: DevelopmentDomain[];
  traditions?: CulturalContext[];
}

export type EducationalEvent =
  | "path_selected"
  | "curriculum_area_viewed"
  | "material_opened"
  | "activity_started"
  | "activity_completed"
  | "mindmap_node_opened"
  | "rhythm_customised"
  | "sound_played"
  | "age_band_changed"
  | "parent_observation_saved";
