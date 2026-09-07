import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { VisualBadge } from "./VisualBadge";

describe("VisualBadge", () => {
  it("renders the label text", () => {
    render(<VisualBadge label="Coordination" paradigm="montessori" />);
    expect(screen.getByText("Coordination")).toBeInTheDocument();
  });

  it("pairs each paradigm with a distinct icon, not colour alone", () => {
    const { container: montessori } = render(<VisualBadge label="A" paradigm="montessori" />);
    const { container: vedic } = render(<VisualBadge label="B" paradigm="vedic" />);
    const montessoriPath = montessori.querySelector("svg path")?.getAttribute("d");
    const vedicPath = vedic.querySelector("svg path")?.getAttribute("d");
    expect(montessoriPath).toBeTruthy();
    expect(vedicPath).toBeTruthy();
    expect(montessoriPath).not.toEqual(vedicPath);
  });

  it("renders without an icon or paradigm when neither is supplied", () => {
    render(<VisualBadge label="Plain" />);
    expect(screen.getByText("Plain")).toBeInTheDocument();
  });
});
