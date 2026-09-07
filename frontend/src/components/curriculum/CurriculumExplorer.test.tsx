import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { CurriculumExplorer } from "./CurriculumExplorer";
import { curriculumAreas } from "@/lib/content/curriculum-areas";

describe("CurriculumExplorer", () => {
  it("shows every area by default", () => {
    render(<CurriculumExplorer areas={curriculumAreas} />);
    for (const area of curriculumAreas) {
      expect(screen.getByText(area.title)).toBeInTheDocument();
    }
  });

  it("filters to a single path when a path filter is pressed", async () => {
    const user = userEvent.setup();
    render(<CurriculumExplorer areas={curriculumAreas} />);

    await user.click(screen.getByRole("button", { name: "Vedic" }));

    expect(screen.getByText("Nature Connection")).toBeInTheDocument();
    expect(screen.queryByText("Practical Life")).not.toBeInTheDocument();
  });

  it("shows an empty state when no area matches the combined filters", async () => {
    const user = userEvent.setup();
    render(<CurriculumExplorer areas={curriculumAreas} />);

    await user.click(screen.getByRole("button", { name: "Montessori" }));
    await user.click(screen.getByRole("button", { name: "9–12" }));

    expect(screen.getByText(/no curriculum areas match/i)).toBeInTheDocument();
  });
});
