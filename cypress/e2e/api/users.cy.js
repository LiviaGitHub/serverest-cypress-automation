import UserService from "../../services/UserService";
import { generateUniqueEmail } from "../../support/testData";

describe("Users API", () => {
  let userId;

  afterEach(() => {
    if (userId) {
      UserService.deleteUser(userId);
    }
  });

  it("should create a user and validate persisted data", () => {
    cy.fixture("users").then((users) => {
      const user = {
        nome: users.standardUser.name,
        email: generateUniqueEmail(),
        password: users.standardUser.password,
        administrador: users.standardUser.administrator,
      };

      UserService.createUser(user).then((createResponse) => {
        expect(createResponse.status).to.eq(201);
        expect(createResponse.body).to.have.property(
          "message",
          "Cadastro realizado com sucesso",
        );

        expect(createResponse.body).to.have.property("_id").and.not.be.empty;

        userId = createResponse.body._id;

        UserService.getUserById(userId).then((getResponse) => {
          expect(getResponse.status).to.eq(200);
          expect(getResponse.body.nome).to.eq(user.nome);
          expect(getResponse.body.email).to.eq(user.email);
        });
      });
    });
  });
});
