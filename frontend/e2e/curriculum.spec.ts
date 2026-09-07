import { test, expect } from "@playwright/test";

test("curriculum hub filters areas by path", async ({ page }) => {
  await page.goto("/curriculum");
  await expect(page.getByRole("heading", { name: "Practical Life" })).toBeVisible();

  await page.getByRole("button", { name: "Vedic" }).click();

  await expect(page.getByRole("heading", { name: "Practical Life" })).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "Nature Connection" })).toBeVisible();
});

test("curriculum area detail renders activities and links to an activity page", async ({ page }) => {
  await page.goto("/curriculum/practical-life");
  await expect(page.getByRole("heading", { name: "Practical Life", exact: true })).toBeVisible();

  await page.getByRole("link", { name: /Pouring Water/ }).click();

  await expect(page).toHaveURL(/\/activities\/pouring-water/);
  await expect(page.getByRole("heading", { name: "Pouring Water" })).toBeVisible();
  await expect(page.getByText("Step 1")).toBeVisible();
});

test("an unknown curriculum area returns 404", async ({ page }) => {
  const response = await page.goto("/curriculum/does-not-exist");
  expect(response?.status()).toBe(404);
});
