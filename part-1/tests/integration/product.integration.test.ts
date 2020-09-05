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
      id: 123,
      name: 'mesa',
    };

    // Act
    const createdProduct = await ProductService.create([product]);

    // Assert
    expect(createdProduct?.length).toBe(1);
    // @ts-ignore
    expect(createdProduct[0]).toStrictEqual(product);
  });

  it('Should Get Product', async () => {
    // Arrange
    const product = {
      id: 124,
      name: 'cadeira',
    };

    const createdProduct = await ProductService.create([product]);

    // Act
    // @ts-ignore
    const filteredProduct = await ProductService.get(createdProduct[0].id);

    // Assert
    expect(filteredProduct).toStrictEqual(product);
  });
});
