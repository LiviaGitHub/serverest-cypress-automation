import LoginPage from '../../pages/LoginPage';

describe('Login', () => {
  it('should display an error for invalid credentials', () => {
    LoginPage.visit();
    LoginPage.login(`invalid.${Date.now()}@test.com`, 'WrongPassword123');
    LoginPage.verifyErrorMessage('Email e/ou senha inválidos');
    cy.url().should('include', '/login');
  });
});
