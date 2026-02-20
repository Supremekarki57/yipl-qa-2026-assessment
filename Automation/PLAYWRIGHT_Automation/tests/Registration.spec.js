import { test, expect } from "@playwright/test";

const name = "Super Karki";
const email = `supremekarki${Date.now()}@yopmail.com`;
const password = "Admin@123";

test("Register new user - Strong Assertions", async ({ page }) => {
  await page.goto("https://practice.expandtesting.com/notes/app/");
  await page.waitForLoadState("networkidle");

  await expect(page).toHaveURL(/notes\/app/);
  await expect(page).toHaveTitle(/Notes/i);

  await page.getByTestId("open-register-view").click();
  await page.waitForSelector('[data-testid="register-email"]');

  await page.getByTestId("register-email").fill(email);
  await page.waitForTimeout(500);

  await page.getByTestId("register-password").fill(password);
  await page.waitForTimeout(500);

  await page.getByTestId("register-name").fill(name);
  await page.waitForTimeout(500);

  await page.getByTestId("register-confirm-password").fill(password);
  await page.waitForTimeout(500);

  await page.getByTestId("register-submit").click();
  await page.waitForNavigation({ waitUntil: "networkidle" });

  await expect(page.getByTestId("login-view")).toBeVisible();
  await page.getByTestId("login-email").fill(email);
  await page.getByTestId("login-password").fill(password);
  await page.getByTestId("login-submit").click();

  await page.waitForNavigation({ waitUntil: "networkidle" });
  await expect(page).toHaveURL(/login|notes\/app/);
});
