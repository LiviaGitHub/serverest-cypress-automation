import ProductService from '../../services/ProductService';
import UserService from '../../services/UserService';
import { generateUniqueProductName } from '../../support/testData';

describe('Products API', () => {
  it('should create a product using an authenticated administrator', () => {
    cy.createAndLoginUser('true').then(({ token, userId }) => {
      const product = {
        nome: generateUniqueProductName(),
        preco: 100,
        descricao: 'Created by Cypress API automation',
        quantidade: 10
      };

      ProductService.createProduct(product, token).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property('message', 'Cadastro realizado com sucesso');
        expect(response.body).to.have.property('_id').and.not.be.empty;

        const productId = response.body._id;

        ProductService.getProductById(productId).then((getResponse) => {
          expect(getResponse.status).to.eq(200);
          expect(getResponse.body.nome).to.eq(product.nome);
          expect(getResponse.body.preco).to.eq(product.preco);
          expect(getResponse.body.quantidade).to.eq(product.quantidade);
        }).then(() => ProductService.deleteProduct(productId, token))
          .then(() => UserService.deleteUser(userId));
      });
    });
  });
});
