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

  it("matches a tagged material (Sound Cylinders) under the Sound filter even though its category is Sensorial", async () => {
    const user = userEvent.setup();
    render(<MaterialGallery materials={materials} />);

    await user.click(screen.getByRole("button", { name: "Sound" }));

    expect(screen.getByText("Sound Cylinders")).toBeInTheDocument();
    expect(screen.queryByText("Golden Beads")).not.toBeInTheDocument();
  });

  it("keeps Sound Cylinders under the Sensorial filter (its primary pedagogical category)", async () => {
    const user = userEvent.setup();
    render(<MaterialGallery materials={materials} />);

    await user.click(screen.getByRole("button", { name: "Sensorial" }));

    expect(screen.getByText("Sound Cylinders")).toBeInTheDocument();
    expect(screen.getByText("Pink Tower")).toBeInTheDocument();
  });

  it("shows an empty state with a working reset when a filter matches nothing", async () => {
    const user = userEvent.setup();
    const materialsWithoutSound = materials.filter((material) => material.id !== "sound-cylinders");
    render(<MaterialGallery materials={materialsWithoutSound} />);

    await user.click(screen.getByRole("button", { name: "Sound" }));

    expect(screen.getByText("No materials match this filter yet.")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "View all materials" }));

    expect(screen.queryByText("No materials match this filter yet.")).not.toBeInTheDocument();
    expect(screen.getByText("Golden Beads")).toBeInTheDocument();
  });
});
