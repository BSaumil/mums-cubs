import { describe, expect, it } from "vitest";
import { curriculumAreas, getActivityBySlug, getCurriculumAreaBySlug } from "./curriculum-areas";
import { getMaterialById, materials } from "./materials";
import { learningFrameworks } from "./learning-frameworks";

describe("content model integrity", () => {
  it("resolves every material referenced by a curriculum area", () => {
    for (const area of curriculumAreas) {
      for (const materialId of area.materialIds) {
        expect(getMaterialById(materialId), `${area.slug} references missing material "${materialId}"`).toBeDefined();
      }
    }
  });

  it("has no duplicate curriculum area slugs", () => {
    const slugs = curriculumAreas.map((area) => area.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("has no duplicate activity slugs across the whole site", () => {
    const slugs = curriculumAreas.flatMap((area) => area.activities.map((activity) => activity.slug));
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("has no duplicate material ids", () => {
    const ids = materials.map((material) => material.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("every activity step has a unique, sequential order", () => {
    for (const area of curriculumAreas) {
      for (const activity of area.activities) {
        const orders = activity.steps.map((step) => step.order);
        expect(orders).toEqual([...orders].sort((a, b) => a - b));
        expect(new Set(orders).size).toBe(orders.length);
      }
    }
  });

  it("resolves related area references to real areas", () => {
    for (const area of curriculumAreas) {
      for (const relatedSlug of area.relatedAreas) {
        expect(getCurriculumAreaBySlug(relatedSlug), `${area.slug} links to missing related area "${relatedSlug}"`).toBeDefined();
      }
    }
  });

  it("looks up an activity by slug alongside its owning area", () => {
    const found = getActivityBySlug("pouring-water");
    expect(found?.activity.title).toBe("Pouring Water");
    expect(found?.area.slug).toBe("practical-life");
  });

  it("returns undefined for a slug that does not exist", () => {
    expect(getCurriculumAreaBySlug("does-not-exist")).toBeUndefined();
    expect(getActivityBySlug("does-not-exist")).toBeUndefined();
    expect(getMaterialById("does-not-exist")).toBeUndefined();
  });

  it("every learning framework curriculum area list is non-empty", () => {
    for (const framework of learningFrameworks) {
      expect(framework.curriculumAreas.length).toBeGreaterThan(0);
    }
  });

  it("every visual asset has non-empty, descriptive alt text", () => {
    for (const area of curriculumAreas) {
      expect(area.heroAsset.alt.length).toBeGreaterThan(10);
      for (const activity of area.activities) {
        expect(activity.visual.alt.length).toBeGreaterThan(10);
        for (const step of activity.steps) {
          expect(step.image.alt.length).toBeGreaterThan(10);
        }
      }
    }
    for (const material of materials) {
      expect(material.visual.alt.length).toBeGreaterThan(10);
    }
  });
});
