import UserService from "../services/UserService";
import AuthService from "../services/AuthService";
import { generateUniqueEmail } from "./testData";

Cypress.Commands.add("createAndLoginUser", (administrator = "false") => {
  cy.fixture("users").then((users) => {
    const userData =
      administrator === "true" ? users.adminUser : users.standardUser;

    const user = {
      nome: userData.name,
      email: generateUniqueEmail(),
      password: userData.password,
      administrador: administrator,
    };

    return UserService.createUser(user).then((userResponse) => {
      expect(userResponse.status).to.eq(201);

      return AuthService.login(user.email, user.password).then(
        (loginResponse) => {
          expect(loginResponse.status).to.eq(200);

          return {
            user,
            userId: userResponse.body._id,
            token: loginResponse.body.authorization,
          };
        },
      );
    });
  });
});
