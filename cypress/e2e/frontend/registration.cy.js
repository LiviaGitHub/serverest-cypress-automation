import RegistrationPage from "../../pages/RegistrationPage";
import UserService from "../../services/UserService";
import { generateUniqueEmail } from "../../support/testData";

describe("User Registration", () => {
  let userId;

  afterEach(() => {
    if (userId) {
      UserService.deleteUser(userId);
    }
  });

  it("should reject registration with an already registered email", () => {
    cy.fixture("users").then((users) => {
      const existingUser = {
        nome: users.standardUser.name,
        email: generateUniqueEmail(),
        password: users.standardUser.password,
        administrador: users.standardUser.administrator,
      };

      // Arrange: create an existing user through the API
      UserService.createUser(existingUser).then((response) => {
        expect(response.status).to.eq(201);
        userId = response.body._id;

        // Act: try to register with the same email through the UI
        RegistrationPage.visit();

        RegistrationPage.registerUser({
          name: "Duplicate User",
          email: existingUser.email,
          password: existingUser.password,
        });

        // Assert
        RegistrationPage.verifyDuplicateEmailError();
      });
    });
  });
});
