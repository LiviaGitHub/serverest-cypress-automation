import AuthService from '../../services/AuthService';
import { generateUniqueEmail } from '../../support/testData';

describe('Authentication API', () => {
  it('should reject login with invalid credentials', () => {
    AuthService.login(generateUniqueEmail(), 'InvalidPassword').then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body).to.have.property('message', 'Email e/ou senha inválidos');
    });
  });
});
