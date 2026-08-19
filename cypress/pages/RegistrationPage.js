class RegistrationPage {
  visit() { cy.visit('/cadastrarusuarios'); }
  fillName(name) { cy.get('[data-testid="nome"]').clear().type(name); }
  fillEmail(email) { cy.get('[data-testid="email"]').clear().type(email); }
  fillPassword(password) { cy.get('[data-testid="password"]').clear().type(password); }
  selectAdministrator() { cy.get('[data-testid="checkbox"]').check(); }
  submit() { cy.get('[data-testid="cadastrar"]').click(); }

  registerUser({ name, email, password, administrator = false }) {
    this.fillName(name);
    this.fillEmail(email);
    this.fillPassword(password);
    if (administrator) this.selectAdministrator();
    this.submit();
  }

  verifyRegistrationSuccess() {
    cy.contains('Cadastro realizado com sucesso').should('be.visible');
  }
}
export default new RegistrationPage();
