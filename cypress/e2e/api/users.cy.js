import UserService from "../../services/UserService";
import { generateUniqueEmail } from "../../support/testData";

describe("Users API", () => {
  it("should create a user and validate persisted data", () => {
    cy.fixture("users").then((users) => {
      const user = {
        nome: users.standardUser.name,
        email: generateUniqueEmail(),
        password: users.standardUser.password,
        administrador: users.standardUser.administrator,
      };

      UserService.createUser(user).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property(
          "message",
          "Cadastro realizado com sucesso",
        );
        expect(response.body).to.have.property("_id").and.not.be.empty;

        const userId = response.body._id;

        UserService.getUserById(userId)
          .then((getResponse) => {
            expect(getResponse.status).to.eq(200);
            expect(getResponse.body.nome).to.eq(user.nome);
            expect(getResponse.body.email).to.eq(user.email);
          })
          .then(() => UserService.deleteUser(userId));
      });
    });
  });
});
