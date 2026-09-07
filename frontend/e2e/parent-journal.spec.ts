import { test, expect } from "@playwright/test";

test("a parent can save and delete a private observation note", async ({ page }) => {
  await page.goto("/curriculum/practical-life");

  const journal = page.getByRole("heading", { name: "Your notes" }).locator("..");
  await expect(journal.getByText("No notes yet for this area.")).toBeVisible();

  await journal.getByRole("textbox").fill("Noticed steadier pouring today.");
  await journal.getByRole("button", { name: "Save note" }).click();

  await expect(journal.getByText("Noticed steadier pouring today.")).toBeVisible();

  // Persists across a reload (localStorage, not component state).
  await page.reload();
  const reloadedJournal = page.getByRole("heading", { name: "Your notes" }).locator("..");
  await expect(reloadedJournal.getByText("Noticed steadier pouring today.")).toBeVisible();

  await reloadedJournal.getByRole("button", { name: /Delete note/ }).click();
  await expect(reloadedJournal.getByText("No notes yet for this area.")).toBeVisible();
});
