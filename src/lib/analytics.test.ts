import { describe, expect, it, vi } from "vitest";
import { track } from "./analytics";

describe("track", () => {
  it("pushes a typed payload onto window.dataLayer", () => {
    window.dataLayer = [];
    track("age_band_changed", { age: "3-6" });

    expect(window.dataLayer).toHaveLength(1);
    expect(window.dataLayer[0]).toMatchObject({ event: "age_band_changed", age: "3-6" });
    expect(typeof window.dataLayer[0].timestamp).toBe("number");
  });

  it("dispatches an mc:event CustomEvent for other listeners", () => {
    const listener = vi.fn();
    window.addEventListener("mc:event", listener);

    track("activity_started", { slug: "pouring-water" });

    expect(listener).toHaveBeenCalledTimes(1);
    const event = listener.mock.calls[0][0] as CustomEvent;
    expect(event.detail).toMatchObject({ event: "activity_started", slug: "pouring-water" });

    window.removeEventListener("mc:event", listener);
  });

  it("never throws when called without properties", () => {
    expect(() => track("path_selected")).not.toThrow();
  });
});
