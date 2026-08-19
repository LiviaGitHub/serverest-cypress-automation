import RegistrationPage from "../../pages/RegistrationPage";
import { generateUniqueEmail } from "../../support/testData";

describe("User Registration", () => {
  it("should register a new user successfully", () => {
    cy.fixture("users").then((users) => {
      const user = {
        name: users.standardUser.name,
        email: generateUniqueEmail(),
        password: users.standardUser.password,
      };

      RegistrationPage.visit();
      RegistrationPage.registerUser(user);

      RegistrationPage.verifyRegistrationSuccess();
      cy.url().should("not.include", "/cadastrarusuarios");
    });
  });
});
