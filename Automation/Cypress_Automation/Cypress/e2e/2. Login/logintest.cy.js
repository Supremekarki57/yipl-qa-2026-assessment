const loginPage = require("../../../pages/loginPage");
const description = "Test failed due to timeout";

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
    // });

    it(`Iteration ${
      index + 1
    }: Create a new lead and capture API calls`, () => {
      Cypress.on("uncaught:exception", (err, runnable) => {
        return false; // Prevent test failure on uncaught exceptions
      });

      ///
      it("Login using env variables", () => {
        LoginPage.visit();
        LoginPage.login();

        ///notes
        cy.wait(5000);
        cy.get('[data-testid="add-new-note"]').click();
        cy.wait(2000);
        cy.get('[data-testid="note-category"]').select("Personal");
        cy.wait(2000);
        cy.get('[data-testid="note-title"]').type("My First Note");
        cy.wait(2000);
        //   cy.get('[data-testid="note-content"]')
        cy.contains("Description:").click().type(description);

        // .and("be.visible")

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
});
