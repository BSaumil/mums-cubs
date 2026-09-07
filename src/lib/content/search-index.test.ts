import { describe, expect, it } from "vitest";
import { searchContent, searchIndex } from "./search-index";

describe("search index", () => {
  it("includes curriculum areas, activities, materials and blog posts", () => {
    const kinds = new Set(searchIndex.map((item) => item.kind));
    expect(kinds).toEqual(new Set(["curriculum", "activity", "blog", "material"]));
  });

  it("has no duplicate ids", () => {
    const ids = searchIndex.map((item) => item.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("returns no results for an empty query", () => {
    expect(searchContent("")).toHaveLength(0);
    expect(searchContent("   ")).toHaveLength(0);
  });

  it("matches by title case-insensitively", () => {
    const results = searchContent("golden beads");
    expect(results.some((item) => item.title === "Golden Beads")).toBe(true);
  });

  it("matches by description text", () => {
    const results = searchContent("decimal system");
    expect(results.length).toBeGreaterThan(0);
  });

  it("returns no results for a nonsense query", () => {
    expect(searchContent("zzznonexistentqueryzzz")).toHaveLength(0);
  });
});
