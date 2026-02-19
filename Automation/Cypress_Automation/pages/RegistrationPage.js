const { ENV } = require("../config/env");

class RegistrationPage {
  visit() {
    cy.visit(ENV.BASE_URL);
  }

  enterUsername(username) {
    cy.get("#username").type(username);
  }

  enterEmail(email) {
    cy.get("#email").type(email);
  }

  enterPassword(password) {
    cy.get("#password").type(password);
  }

  enterConfirmPassword(password) {
    cy.get("#confirmPassword").type(password);
  }

  clickRegister() {
    cy.get('button[type="submit"]').click();
  }

  registerWithValidData() {
    this.enterUsername(ENV.TEST_USER.username);
    this.enterEmail(ENV.TEST_USER.email);
    this.enterPassword(ENV.TEST_USER.password);
    this.enterConfirmPassword(ENV.TEST_USER.password);
    this.clickRegister();
  }
}

module.exports = new RegistrationPage();
