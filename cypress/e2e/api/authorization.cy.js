import UserService from "../../services/UserService";
import AuthService from "../../services/AuthService";
import ProductService from "../../services/ProductService";
import {
  generateUniqueEmail,
  generateUniqueProductName,
} from "../../support/testData";

describe("Authorization API", () => {
  let userId;

  it("should reject product creation by a non-admin user", () => {
    cy.fixture("users").then((users) => {
      const standardUser = {
        nome: users.standardUser.name,
        email: generateUniqueEmail(),
        password: users.standardUser.password,
        administrador: "false",
      };

      const product = {
        nome: generateUniqueProductName(),
        preco: 100,
        descricao: "Unauthorized product creation attempt",
        quantidade: 10,
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
                  "message",
                  "Rota exclusiva para administradores",
                );
              },
            );
          },
        );
      });
    });
  });

  afterEach(() => {
    if (userId) {
      UserService.deleteUser(userId);
    }
  });
});
