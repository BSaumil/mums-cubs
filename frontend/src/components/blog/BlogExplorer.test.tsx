import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { BlogExplorer } from "./BlogExplorer";
import { blogPosts } from "@/lib/content/blog-posts";

describe("BlogExplorer", () => {
  it("shows every post by default", () => {
    render(<BlogExplorer posts={blogPosts} />);
    expect(screen.getAllByRole("link")).toHaveLength(blogPosts.length);
  });

  it("filters to one category when its button is pressed", async () => {
    const user = userEvent.setup();
    render(<BlogExplorer posts={blogPosts} />);

    await user.click(screen.getByRole("button", { name: "Materials Spotlight" }));

    expect(screen.getByText("The Buttoning Frame: A Small Material With a Big Job")).toBeInTheDocument();
    expect(screen.queryByText("A Beginner's Guide to Practical Life Activities at Home")).not.toBeInTheDocument();
  });

  it("marks the active filter with aria-pressed", async () => {
    const user = userEvent.setup();
    render(<BlogExplorer posts={blogPosts} />);

    const allButton = screen.getByRole("button", { name: "All" });
    expect(allButton).toHaveAttribute("aria-pressed", "true");

    const familyButton = screen.getByRole("button", { name: "Family Life" });
    await user.click(familyButton);

    expect(familyButton).toHaveAttribute("aria-pressed", "true");
    expect(allButton).toHaveAttribute("aria-pressed", "false");
  });
});
