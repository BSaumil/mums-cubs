import { test, expect } from "@playwright/test";

test("renders the hero and primary sections", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Small Hands");
  await expect(page.getByRole("heading", { name: "Two Beautiful Paths, One Brighter Tomorrow" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "A Glimpse Into Their World" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Live Material Gallery" })).toBeVisible();
});

test("Pick Your Path updates the URL and the active state", async ({ page }) => {
  await page.goto("/");
  const vedicLink = page.getByRole("navigation", { name: "Choose a learning path" }).getByRole("link", { name: "Vedic" });

  await vedicLink.click();

  await expect(page).toHaveURL(/path=vedic/);
  await expect(vedicLink).toHaveAttribute("aria-current", "true");
});

test("material gallery filters by category", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("group", { name: "Filter materials by category" }).getByRole("button", { name: "Language" }).click();

  await expect(page.getByText("Sandpaper Letters")).toBeVisible();
  await expect(page.getByText("Golden Beads")).toHaveCount(0);
});
