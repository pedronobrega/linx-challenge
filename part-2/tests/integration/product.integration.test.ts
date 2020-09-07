/* eslint-disable @typescript-eslint/ban-ts-comment */
import connection from '../../src/database';
import ProductService from '../../src/services/Product.service';

describe('Product Integration Test', () => {
  beforeAll(() => {
    connection.query('begin');
  });

  afterAll(() => {
    connection.query('rollback');
  });

  it('Should Create Product', async () => {
    // Arrange
    const product = {
      productId: 999,
      images: ['http://www.img.com/1.png'],
    };

    // Act
    const createdProduct = await ProductService.create(product);

    // Assert
    expect(createdProduct).toStrictEqual(product);
  });
});
