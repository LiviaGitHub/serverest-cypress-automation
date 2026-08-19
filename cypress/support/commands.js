import UserService from '../services/UserService';
import AuthService from '../services/AuthService';
import { generateUniqueEmail } from './testData';

Cypress.Commands.add('createAndLoginUser', (administrator = 'false') => {
  const user = {
    nome: 'QA Automation User',
    email: generateUniqueEmail(),
    password: 'Test123!',
    administrador: administrator
  };

  return UserService.createUser(user).then((userResponse) => {
    expect(userResponse.status).to.eq(201);

    return AuthService.login(user.email, user.password).then((loginResponse) => {
      expect(loginResponse.status).to.eq(200);
      return {
        user,
        userId: userResponse.body._id,
        token: loginResponse.body.authorization
      };
    });
  });
});
