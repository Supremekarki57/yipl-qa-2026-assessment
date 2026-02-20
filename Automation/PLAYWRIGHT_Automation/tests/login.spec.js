
import { test, expect } from "@playwright/test";

test("Login and Create Note Flow", async ({ page }) => {
  const email = "Supreme@yopmail.com";
  const password = "Admin@123";
  const description = "Notes app workflow validation using automation";

  // Navigate to application
  await page.goto("https://practice.expandtesting.com/notes/app");

  // Click Login
  await page.getByText("Login").click();

  //  login fields 
  await expect(page.getByTestId("login-email")).toBeVisible();
  await expect(page.getByTestId("login-password")).toBeVisible();

  //  email
  await page.getByTestId("login-email").fill(email);
  await expect(page.getByTestId("login-email")).toHaveValue(email);

  //  password
  await page.getByTestId("login-password").fill(password);
  await expect(page.getByTestId("login-password")).toHaveValue(password);

  // Submit
  await page.getByTestId("login-submit").click();

  //  login
  await expect(page.getByTestId("logout-button")).toBeVisible();

await page.waitForTimeout(2000);
 
});
