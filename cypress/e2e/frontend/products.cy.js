import LoginPage from "../../pages/LoginPage";
import ProductsPage from "../../pages/ProductsPage";
import UserService from "../../services/UserService";
import { generateUniqueEmail } from "../../support/testData";

describe("Product Flow", () => {
  let user;
  let userId;

  beforeEach(() => {
    cy.fixture("users").then((users) => {
      user = {
        nome: users.standardUser.name,
        email: generateUniqueEmail(),
        password: users.standardUser.password,
        administrador: users.standardUser.administrator,
      };

      UserService.createUser(user).then((response) => {
        expect(response.status).to.eq(201);
        userId = response.body._id;
      });
    });
  });

  afterEach(() => {
    if (userId) {
      UserService.deleteUser(userId);
    }
  });

  it("should search for a product and add it to the shopping list", () => {
    LoginPage.visit();
    LoginPage.login(user.email, user.password);

    cy.url().should("not.include", "/login");

    cy.get(".card")
      .first()
      .find(".card-title")
      .invoke("text")
      .then((productName) => {
        const name = productName.trim();

        ProductsPage.searchProduct(name);
        ProductsPage.verifyProductVisible(name);
        ProductsPage.addFirstVisibleProductToList();
        ProductsPage.verifyProductAdded(name);
      });
  });
});
