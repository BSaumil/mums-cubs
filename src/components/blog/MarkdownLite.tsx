/**
 * Parses the small markdown subset used by blog post bodies: "## " headings,
 * "- " bullet runs, and blank-line-separated paragraphs. No dependency on a
 * markdown library — the format is deliberately this narrow.
 */
function parseBlocks(body: string) {
  const lines = body.trim().split("\n");
  const blocks: { type: "h2" | "p" | "ul"; content: string | string[] }[] = [];
  let listBuffer: string[] = [];
  let paragraphBuffer: string[] = [];

  function flushParagraph() {
    if (paragraphBuffer.length > 0) {
      blocks.push({ type: "p", content: paragraphBuffer.join(" ") });
      paragraphBuffer = [];
    }
  }

  function flushList() {
    if (listBuffer.length > 0) {
      blocks.push({ type: "ul", content: [...listBuffer] });
      listBuffer = [];
    }
  }

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (line.startsWith("## ")) {
      flushParagraph();
      flushList();
      blocks.push({ type: "h2", content: line.slice(3).trim() });
    } else if (line.startsWith("- ")) {
      flushParagraph();
      listBuffer.push(line.slice(2).trim());
    } else if (line === "") {
      flushParagraph();
      flushList();
    } else {
      flushList();
      paragraphBuffer.push(line);
    }
  }
  flushParagraph();
  flushList();

  return blocks;
}

export function MarkdownLite({ body }: { body: string }) {
  const blocks = parseBlocks(body);

  return (
    <div className="space-y-4">
      {blocks.map((block, index) => {
        if (block.type === "h2") {
          return (
            <h2 key={index} className="pt-2 text-xl font-semibold">
              {block.content as string}
            </h2>
          );
        }
        if (block.type === "ul") {
          return (
            <ul key={index} className="list-disc space-y-1.5 pl-5 text-[var(--text-secondary)]">
              {(block.content as string[]).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          );
        }
        return (
          <p key={index} className="leading-relaxed text-[var(--text-secondary)]">
            {block.content as string}
          </p>
        );
      })}
    </div>
  );
}
