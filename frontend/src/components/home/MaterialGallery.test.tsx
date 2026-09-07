import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { MaterialGallery } from "./MaterialGallery";
import { materials } from "@/lib/content/materials";

describe("MaterialGallery", () => {
  it("shows every material by default", () => {
    render(<MaterialGallery materials={materials} />);
    for (const material of materials) {
      expect(screen.getByText(material.name)).toBeInTheDocument();
    }
  });

  it("filters to one category when its button is pressed", async () => {
    const user = userEvent.setup();
    render(<MaterialGallery materials={materials} />);

    await user.click(screen.getByRole("button", { name: "Language" }));

    expect(screen.getByText("Sandpaper Letters")).toBeInTheDocument();
    expect(screen.queryByText("Golden Beads")).not.toBeInTheDocument();
  });

  it("marks the active filter with aria-pressed", async () => {
    const user = userEvent.setup();
    render(<MaterialGallery materials={materials} />);

    const allButton = screen.getByRole("button", { name: "All" });
    expect(allButton).toHaveAttribute("aria-pressed", "true");

    const mathButton = screen.getByRole("button", { name: "Math" });
    await user.click(mathButton);

    expect(mathButton).toHaveAttribute("aria-pressed", "true");
    expect(allButton).toHaveAttribute("aria-pressed", "false");
  });
});
