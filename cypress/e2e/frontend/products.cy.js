import LoginPage from '../../pages/LoginPage';
import ProductsPage from '../../pages/ProductsPage';
import UserService from '../../services/UserService';
import { generateUniqueEmail } from '../../support/testData';

describe('Product Flow', () => {
  let user;
  let userId;

  beforeEach(() => {
    user = {
      nome: 'QA Product User',
      email: generateUniqueEmail(),
      password: 'Test123!',
      administrador: 'false'
    };

    UserService.createUser(user).then((response) => {
      expect(response.status).to.eq(201);
      userId = response.body._id;
    });
  });

  afterEach(() => {
    if (userId) UserService.deleteUser(userId);
  });

  it('should search for a product and add it to the shopping list', () => {
    LoginPage.visit();
    LoginPage.login(user.email, user.password);
    cy.url().should('not.include', '/login');

    cy.get('.card').first().invoke('text').then((text) => {
      const productName = text.trim().split('\n')[0].trim();
      ProductsPage.searchProduct(productName);
      ProductsPage.verifyProductVisible(productName);
      ProductsPage.addFirstVisibleProductToList();
      ProductsPage.verifyProductAdded(productName);
    });
  });
});
