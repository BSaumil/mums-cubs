import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { ParentJournal } from "./ParentJournal";

describe("ParentJournal", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("shows an empty state before any note is saved", async () => {
    render(<ParentJournal areaSlug="practical-life" />);
    await waitFor(() => expect(screen.getByText("No notes yet for this area.")).toBeInTheDocument());
  });

  it("saves a note and persists it to localStorage under the area slug", async () => {
    const user = userEvent.setup();
    render(<ParentJournal areaSlug="practical-life" />);
    await waitFor(() => screen.getByRole("textbox"));

    await user.type(screen.getByRole("textbox"), "Poured for a full ten minutes today.");
    await user.click(screen.getByRole("button", { name: "Save note" }));

    expect(await screen.findByText("Poured for a full ten minutes today.")).toBeInTheDocument();
    const stored = JSON.parse(window.localStorage.getItem("mc-journal:practical-life") ?? "[]");
    expect(stored).toHaveLength(1);
    expect(stored[0].note).toBe("Poured for a full ten minutes today.");
  });

  it("does not save a blank or whitespace-only note", async () => {
    const user = userEvent.setup();
    render(<ParentJournal areaSlug="practical-life" />);
    await waitFor(() => screen.getByRole("button", { name: "Save note" }));

    expect(screen.getByRole("button", { name: "Save note" })).toBeDisabled();
    await user.type(screen.getByRole("textbox"), "   ");
    expect(screen.getByRole("button", { name: "Save note" })).toBeDisabled();
  });

  it("deletes a saved note", async () => {
    const user = userEvent.setup();
    render(<ParentJournal areaSlug="practical-life" />);
    await waitFor(() => screen.getByRole("textbox"));

    await user.type(screen.getByRole("textbox"), "A note to remove.");
    await user.click(screen.getByRole("button", { name: "Save note" }));
    await screen.findByText("A note to remove.");

    await user.click(screen.getByRole("button", { name: /Delete note/ }));

    expect(screen.queryByText("A note to remove.")).not.toBeInTheDocument();
    expect(screen.getByText("No notes yet for this area.")).toBeInTheDocument();
  });

  it("keeps separate notes per curriculum area", async () => {
    window.localStorage.setItem(
      "mc-journal:sensorial",
      JSON.stringify([{ id: "1", date: new Date().toISOString(), note: "Sensorial-only note" }]),
    );

    render(<ParentJournal areaSlug="practical-life" />);
    await waitFor(() => expect(screen.getByText("No notes yet for this area.")).toBeInTheDocument());
    expect(screen.queryByText("Sensorial-only note")).not.toBeInTheDocument();
  });
});
