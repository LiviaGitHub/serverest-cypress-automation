class RegistrationPage {
  visit() {
    cy.visit("/cadastrarusuarios");
  }

  fillName(name) {
    cy.get('[data-testid="nome"]').clear().type(name);
  }

  fillEmail(email) {
    cy.get('[data-testid="email"]').clear().type(email);
  }

  fillPassword(password) {
    cy.get('[data-testid="password"]').clear().type(password);
  }

  submit() {
    cy.get('[data-testid="cadastrar"]').click();
  }

  registerUser({ name, email, password }) {
    this.fillName(name);
    this.fillEmail(email);
    this.fillPassword(password);
    this.submit();
  }

  verifyDuplicateEmailError() {
    cy.contains("Este email já está sendo usado").should("be.visible");
  }
}

export default new RegistrationPage();
