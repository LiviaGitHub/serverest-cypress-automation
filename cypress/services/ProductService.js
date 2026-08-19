class ProductService {
  createProduct(product, token) {
    return cy.request({
      method: 'POST',
      url: `${Cypress.env('apiUrl')}/produtos`,
      headers: { authorization: token },
      body: product,
      failOnStatusCode: false
    });
  }

  getProductById(id) {
    return cy.request({
      method: 'GET',
      url: `${Cypress.env('apiUrl')}/produtos/${id}`,
      failOnStatusCode: false
    });
  }

  deleteProduct(id, token) {
    return cy.request({
      method: 'DELETE',
      url: `${Cypress.env('apiUrl')}/produtos/${id}`,
      headers: { authorization: token },
      failOnStatusCode: false
    });
  }
}
export default new ProductService();
