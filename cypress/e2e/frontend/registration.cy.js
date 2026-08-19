import RegistrationPage from '../../pages/RegistrationPage';
import { generateUniqueEmail } from '../../support/testData';

describe('User Registration', () => {
  it('should register a new user successfully', () => {
    const user = {
      name: 'QA Automation User',
      email: generateUniqueEmail(),
      password: 'Test123!'
    };

    RegistrationPage.visit();
    RegistrationPage.registerUser(user);
    RegistrationPage.verifyRegistrationSuccess();
    cy.url().should('not.include', '/cadastrarusuarios');
  });
});
