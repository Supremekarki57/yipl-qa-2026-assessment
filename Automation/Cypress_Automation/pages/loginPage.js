class LoginPage {

  visit() {
      cy.visit("https://practice.expandtesting.com/notes/app ");
  }

  login() {
          cy.viewport(1440, 900);

    cy.get('#username').type(Cypress.env('NAME'))
    cy.get('#password').type(Cypress.env('PASSWORD'))
    cy.get('button[type="submit"]').click()
  }
}

export default new LoginPage()
