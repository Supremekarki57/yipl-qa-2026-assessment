const description = "Notes app workflow validation using automation";

const name = "Super Karki";
const email = "sa3@yopmail.com";
const password = "Admin@123";

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
        filename: "cypress/results_api/T_support-api-results.json",
      });
      cy.task("writeApiResultsExcel", {
        results: apiResults,
        filename: "cypress/results_api/T_support-api-results.xlsx",
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
      cy.get('[data-testid="open-register-view"]').click();
      cy.wait(2000);
      cy.get('[data-testid="register-email"]').type(`${email}`);
      cy.wait(2000);
      cy.get('[data-testid="register-password"]').type("Admin@123");
      cy.wait(2000);
      cy.get('[data-testid="register-name"]')
        // .type("Super Karki{Enter}")
        .type(`${name}`);
      cy.wait(2000);
      cy.get('[data-testid="register-confirm-password"]').type("Admin@123");
      cy.wait(2000);
      cy.get('[data-testid="register-submit"]').click();
      cy.wait(2000);
      cy.get('[data-testid="login-view"]').click();
      cy.wait(5000);
      // login
      cy.get('[data-testid="login-email"]').type(email);
      cy.wait(2000);
      cy.get('[data-testid="login-password"]').type(password);

      cy.wait(2000);
      cy.get('[data-testid="login-submit"]').click();

      ///notes
      cy.get('[data-testid="add-new-note"]').click();
      cy.wait(2000);
      cy.get('[data-testid="note-category"]').select("Personal");
      cy.wait(2000);
      cy.get('[data-testid="note-title"]').type("My First Note");
      cy.wait(2000);
      //   cy.get('[data-testid="note-content"]')
      cy.contains("Description:").click().type(description);

      // .and("be.visible")
      // .should("have.value", "")
      // .type(description[Math.floor(Math.random() * 10)]);
      cy.wait(2000);
      cy.get('[data-testid="note-submit"]').click();
      cy.wait(2000);
      cy.get('[data-testid="category-personal"] > :nth-child(1)').click();
      cy.wait(2000);
      // cy.get('[data-testid="note-title"]').should("have.text", "My First Note");

      //   // Prepare test data for Excel
      const testData = [
        {
          //   Username: username,
          //   Timestamp: new Date().toISOString(),
          //   Status: "Completed",
        },
      ];

      // Write test data to Excel
      cy.task("writeToExcel", {
        filePath: "cypress/results/T_support-data.xlsx",
        sheetName: "Subscribers",
        data: testData,
      });
    });
  });
});
