const description = "Notes app workflow validation using automation";

const name = "Supereme Karki";
const email = "supreme@yopmail.com";
const password = "Wronggg";

let apiResults = [];

describe("Track API responses", () => {
  const iterations = 1; // Number of times to repeat the test
  const startIndex = 1;

  Cypress._.times(iterations, (index) => {
    // Intercept and collect API results
    before(() => {
      cy.intercept("**/*", (req) => {
        req.continue((res) => {
          if (res.statusCode >= 500) {
            // status === 401 || status === 404 || (status >= 200 && status < 300);
            apiResults.push({
              url: req.url,
              method: req.method,
              statusCode: res.statusCode,
              responseBody: res.body,
              timestamp: new Date().toISOString(),
            });
          }
        });
      });
    });

    afterEach(() => {
      cy.task("writeApiResults", {
        results: apiResults,
        filename: "Cypress_Automation/results_api/Login-results-TC-3.json",
      });
      cy.task("writeApiResultsExcel", {
        results: apiResults,
        filename: "Cypress_Automation/results_api/Login-results-TC-3.xlsx",
      });
    });

    it(`Iteration ${
      index + 1
    }: Create a new lead and capture API calls`, () => {
      Cypress.on("uncaught:exception", (err, runnable) => {
        return false; // Prevent test failure on uncaught exceptions
      });
      cy.viewport(1440, 900);
      cy.visit("https://practice.expandtesting.com/notes/app ");
      cy.wait(5000);
      // Click on Login button
      cy.contains("Login").click();

      cy.get('[data-testid="login-email"]').should("be.visible");
      cy.get('[data-testid="login-password"]').should("be.visible");

      // email
      cy.get('[data-testid="login-email"]')
        .type(email)
        .should("have.value", email);

      //password
      cy.get('[data-testid="login-password"]')
        .type(password)
        .should("have.value", password);

      // Submit login
      cy.get('[data-testid="login-submit"]').click();

      //error
      cy.contains("Incorrect email address or password").should("be.visible");
      //   // Prepare test data for Excel
      const testData = [
        {
          Username: name,
          Email: email,
          Password: password,
          Timestamp: new Date().toISOString(),
          Status: "Completed",
        },
      ];

      // Write test data to Excel
      cy.task("writeToExcel", {
        filePath: "Cypress/results/Login-data-TC-3.xlsx",
        sheetName: "Login",
        data: testData,
      });
    });
  });
});
