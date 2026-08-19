class UserService {
  createUser(user) {
    return cy.request({
      method: 'POST',
      url: `${Cypress.env('apiUrl')}/usuarios`,
      body: user,
      failOnStatusCode: false
    });
  }

  getUserById(id) {
    return cy.request({
      method: 'GET',
      url: `${Cypress.env('apiUrl')}/usuarios/${id}`,
      failOnStatusCode: false
    });
  }

  deleteUser(id) {
    return cy.request({
      method: 'DELETE',
      url: `${Cypress.env('apiUrl')}/usuarios/${id}`,
      failOnStatusCode: false
    });
  }
}
export default new UserService();
