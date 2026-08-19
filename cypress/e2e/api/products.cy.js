import ProductService from '../../services/ProductService';
import UserService from '../../services/UserService';
import { generateUniqueProductName } from '../../support/testData';

describe('Products API', () => {
  let productId;
  let userId;
  let token;

  afterEach(() => {
    if (productId && token) {
      ProductService.deleteProduct(productId, token);
    }

    if (userId) {
      UserService.deleteUser(userId);
    }
  });

  it('should create and retrieve a product as an authenticated administrator', () => {
    cy.fixture('products').then((products) => {
      cy.createAndLoginUser('true').then((session) => {
        token = session.token;
        userId = session.userId;

        const product = {
          nome: generateUniqueProductName(),
          preco: products.defaultProduct.price,
          descricao: products.defaultProduct.description,
          quantidade: products.defaultProduct.quantity
        };

        ProductService.createProduct(product, token).then((createResponse) => {
          expect(createResponse.status).to.eq(201);
          expect(createResponse.body).to.have.property(
            'message',
            'Cadastro realizado com sucesso'
          );

          expect(createResponse.body).to.have.property('_id').and.not.be.empty;

          productId = createResponse.body._id;

          ProductService.getProductById(productId).then((getResponse) => {
            expect(getResponse.status).to.eq(200);
            expect(getResponse.body.nome).to.eq(product.nome);
            expect(getResponse.body.preco).to.eq(product.preco);
            expect(getResponse.body.descricao).to.eq(product.descricao);
            expect(getResponse.body.quantidade).to.eq(product.quantidade);
          });
        });
      });
    });
  });
});
