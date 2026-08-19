import LoginPage from "../../pages/LoginPage";
import { generateUniqueEmail } from "../../support/testData";

describe("Login", () => {
  it("should display an error for invalid credentials", () => {
    cy.fixture("users").then((users) => {
      const email = generateUniqueEmail();

      LoginPage.visit();
      LoginPage.login(email, users.invalidUser.password);

      LoginPage.verifyErrorMessage("Email e/ou senha inválidos");
      cy.url().should("include", "/login");
    });
  });
});
