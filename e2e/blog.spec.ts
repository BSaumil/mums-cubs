import { test, expect } from "@playwright/test";

test("blog index lists articles and filters by category", async ({ page }) => {
  await page.goto("/blog");
  await expect(page.getByRole("heading", { name: "A Beginner's Guide to Practical Life Activities at Home" })).toBeVisible();

  await page.getByRole("button", { name: "Materials Spotlight" }).click();
  await expect(page.getByRole("heading", { name: "A Beginner's Guide to Practical Life Activities at Home" })).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "The Buttoning Frame: A Small Material With a Big Job" })).toBeVisible();
});

test("a blog post links back to the index and to its related curriculum area", async ({ page }) => {
  await page.goto("/blog/beginners-guide-practical-life-activities-at-home");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("A Beginner's Guide to Practical Life Activities at Home");

  await page.getByRole("link", { name: "Practical Life" }).click();
  await expect(page).toHaveURL(/\/curriculum\/practical-life/);
});

test("an unknown blog slug returns 404", async ({ page }) => {
  const response = await page.goto("/blog/does-not-exist");
  expect(response?.status()).toBe(404);
});

test("sitemap.xml includes blog post URLs", async ({ page }) => {
  const response = await page.goto("/sitemap.xml");
  const body = await response?.text();
  expect(body).toContain("/blog/beginners-guide-practical-life-activities-at-home");
});
