import { test, expect } from "@playwright/test";

test("Login and Create Note Flow", async ({ page }) => {
  const email = "Supreme@yopmail.com";
  const password = "Admin@123";
  const description = "Notes app workflow validation using automation";

  await page.goto("https://practice.expandtesting.com/notes/app");
  await page.getByText("Login").click();

  await expect(page.getByTestId("login-email")).toBeVisible();
  await expect(page.getByTestId("login-password")).toBeVisible();

  await page.getByTestId("login-email").fill(email);
  await expect(page.getByTestId("login-email")).toHaveValue(email);

  await page.getByTestId("login-password").fill(password);
  await expect(page.getByTestId("login-password")).toHaveValue(password);

  await page.getByTestId("login-submit").click();
  //   await expect(page.getByTestId("logout-button")).toBeVisible();

  await page.getByTestId("add-new-note").click();
  await expect(page.getByTestId("note-category")).toBeVisible();

  await page.getByTestId("note-category").selectOption("Personal");
  await expect(page.getByTestId("note-category")).toHaveValue("Personal");

  await page.getByTestId("note-title").fill("My First Note");
  await expect(page.getByTestId("note-title")).toHaveValue("My First Note");

  await page.getByLabel("Description:").fill(description);
  await expect(page.getByLabel("Description:")).toHaveValue(description);

  await page.getByTestId("note-submit").click();
  await expect(page.getByText("My First Note")).toBeVisible();
  await expect(page.getByText(description)).toBeVisible();
});
