import UserService from '../../services/UserService';
import { generateUniqueEmail } from '../../support/testData';

describe('Users API', () => {
  it('should create a new user successfully', () => {
    const user = {
      nome: 'API Automation User',
      email: generateUniqueEmail(),
      password: 'Test123!',
      administrador: 'false'
    };

    UserService.createUser(user).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('message', 'Cadastro realizado com sucesso');
      expect(response.body).to.have.property('_id').and.not.be.empty;

      const userId = response.body._id;

      UserService.getUserById(userId).then((getResponse) => {
        expect(getResponse.status).to.eq(200);
        expect(getResponse.body.nome).to.eq(user.nome);
        expect(getResponse.body.email).to.eq(user.email);
      }).then(() => UserService.deleteUser(userId));
    });
  });
});
