import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PhotoTray } from "./PhotoTray";
import type { VisualAsset } from "@/lib/types";

const image: VisualAsset = {
  id: "test-asset",
  src: "/images/placeholders/mc-montessori-practical-life-pouring-activity-960.svg",
  alt: "Child pouring water between two jugs.",
  width: 960,
  height: 1200,
  type: "illustration",
  dominantTone: "wood",
  isPlaceholder: true,
};

describe("PhotoTray", () => {
  it("renders as a link when href is provided", () => {
    render(
      <PhotoTray
        id="pouring-water"
        image={image}
        title="Pouring Water"
        lead="Control movement through repetition."
        paradigm="montessori"
        ageBand="18m-3"
        objective="Control movement through repetition."
        skillTags={[{ id: "coordination", label: "Coordination" }]}
        href="/activities/pouring-water"
      />,
    );
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/activities/pouring-water");
    expect(screen.getByText("Pouring Water")).toBeInTheDocument();
    expect(screen.getByText("Coordination")).toBeInTheDocument();
    expect(screen.getByText("Age 18m–3")).toBeInTheDocument();
  });

  it("renders as a static block when no href is provided", () => {
    render(
      <PhotoTray
        id="pouring-water"
        image={image}
        title="Pouring Water"
        lead="Control movement through repetition."
        paradigm="montessori"
        ageBand="18m-3"
        objective="Control movement through repetition."
        skillTags={[]}
      />,
    );
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    expect(screen.getByText("Pouring Water")).toBeInTheDocument();
  });
});
