import RegistrationPage from "../../../pages/RegistrationPage";

const description = "Notes app workflow validation using automation";
const name = "Superme Karki";
const email = "supreme@yopmail.com";
const password = "Admin@123";

const iterations = 1;
let apiResults = [];

describe("Registration Test", () => {
  before(() => {
    // Intercept all API calls and capture results
    cy.intercept("**/*", (req) => {
      req.continue((res) => {
        // Capture API failures and info
        if (res.statusCode >= 500) {
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

    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });
  });

  afterEach(() => {
    cy.task("writeApiResults", {
      results: apiResults,
      filename: "Cypress/results_api/registration-results-TC-4.json",
    });
    cy.task("writeApiResultsExcel", {
      results: apiResults,
      filename: "Cypress/results_api/registration-results-TC-4.xlsx",
    });
  });

  Cypress._.times(iterations, (index) => {
    it(`Iteration ${index + 1}: Register new user and capture API calls`, () => {
      RegistrationPage.visit();
      cy.wait(5000);
      //register view
      cy.get('[data-testid="open-register-view"]').click();
      cy.wait(2000);
      // email
      //   cy.get('[data-testid="register-email"]')
      //     .type(email)
      //     .should("have.value", email);
      //   cy.wait(2000);

      //   //password
      //   cy.get('[data-testid="register-password"]')
      //     .type(password)
      //     .should("have.value", password);
      //   cy.wait(2000);

      //   //name
      //   cy.get('[data-testid="register-name"]')
      //     .type(name)
      //     .should("have.value", name);
      //   cy.wait(2000);

      //   //confirm password
      //   cy.get('[data-testid="register-confirm-password"]')
      //     .type(password)
      //     .should("have.value", password);
      //   cy.wait(2000);

      // Submit form
      cy.get('[data-testid="register-submit"]').click();
      cy.wait(2000);

      cy.contains("Email address is required").should("be.visible");
      cy.contains("User name is required").should("be.visible");
      cy.contains("Password is required").should("be.visible");
      cy.contains("Confirm Password is required").should("be.visible");

      ///
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
        filePath: "Cypress/results/registration-data-TC-4.xlsx",
        sheetName: "Registration",
        data: testData,
      });
    });
  });
});
