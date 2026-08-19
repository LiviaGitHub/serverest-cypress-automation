class ProductsPage {
  searchProduct(productName) {
    cy.get('[data-testid="pesquisar"]').clear().type(productName);
    cy.get('[data-testid="botaoPesquisar"]').click();
  }

  verifyProductVisible(productName) {
    cy.contains(productName).should('be.visible');
  }

  addFirstVisibleProductToList() {
    cy.get('[data-testid="adicionarNaLista"]').first().click();
  }

  verifyProductAdded(productName) {
    cy.contains(productName).should('be.visible');
  }
}
export default new ProductsPage();
