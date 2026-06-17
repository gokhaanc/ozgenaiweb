import { expect, test } from "@playwright/test";

test("localized landing page renders and tabs work", async ({ page }) => {
  await page.goto("/en");
  await page.waitForLoadState("networkidle");
  await expect(page.getByRole("heading", { name: /Less manual work/i })).toBeVisible();
  const services = page.locator("#services");

  await services.getByRole("button", { name: "Websites", exact: true }).click();
  await expect(
    services.getByRole("heading", {
      name: /We build fast websites/i,
    }),
  ).toBeVisible();
});

test("Turkish page and contact service preselection render", async ({ page }) => {
  await page.goto("/tr");
  await expect(page.getByRole("heading", { name: /Daha az manuel iş/i })).toBeVisible();

  await page.goto("/en?service=ai-donusumu#contact");
  await expect(page.getByLabel("Service of interest")).toHaveValue("ai-donusumu");
});

test("about page renders on mobile-sized viewport", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/en/about");
  await expect(page.getByRole("heading", { name: /OzGen AI is an AI-supported/i })).toBeVisible();
});
