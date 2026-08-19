import UserService from '../../services/UserService';
import AuthService from '../../services/AuthService';
import ProductService from '../../services/ProductService';
import {
  generateUniqueEmail,
  generateUniqueProductName
} from '../../support/testData';

describe('Authorization API', () => {
  let userId;

  afterEach(() => {
    if (userId) {
      UserService.deleteUser(userId);
    }
  });

  it('should reject product creation by a non-admin user', () => {
    cy.fixture('users').then((users) => {
      const standardUser = {
        nome: users.standardUser.name,
        email: generateUniqueEmail(),
        password: users.standardUser.password,
        administrador: users.standardUser.administrator
      };

      cy.fixture('products').then((products) => {
        const product = {
          nome: generateUniqueProductName(),
          preco: products.defaultProduct.price,
          descricao: products.defaultProduct.description,
          quantidade: products.defaultProduct.quantity
        };

        UserService.createUser(standardUser).then((userResponse) => {
          expect(userResponse.status).to.eq(201);
          userId = userResponse.body._id;

          AuthService.login(standardUser.email, standardUser.password).then(
            (loginResponse) => {
              expect(loginResponse.status).to.eq(200);

              const token = loginResponse.body.authorization;

              ProductService.createProduct(product, token).then(
                (productResponse) => {
                  expect(productResponse.status).to.eq(403);

                  expect(productResponse.body).to.have.property(
                    'message',
                    'Rota exclusiva para administradores'
                  );
                }
              );
            }
          );
        });
      });
    });
  });
});
