import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MarkdownLite } from "./MarkdownLite";

describe("MarkdownLite", () => {
  it("renders headings, paragraphs and bullet lists from the subset syntax", () => {
    const body = `## First Heading
This is a paragraph.

- One
- Two
- Three

## Second Heading
Another paragraph here.`;

    render(<MarkdownLite body={body} />);

    expect(screen.getByRole("heading", { name: "First Heading" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Second Heading" })).toBeInTheDocument();
    expect(screen.getByText("This is a paragraph.")).toBeInTheDocument();
    expect(screen.getByText("Another paragraph here.")).toBeInTheDocument();

    const list = screen.getByRole("list");
    expect(list).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
  });

  it("joins consecutive non-blank lines into a single paragraph", () => {
    const body = `## Heading
Line one of a paragraph
that continues on a second line.`;

    render(<MarkdownLite body={body} />);

    expect(screen.getByText("Line one of a paragraph that continues on a second line.")).toBeInTheDocument();
  });
});
