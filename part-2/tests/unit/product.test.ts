import product from '../../src/services/Product.service';

jest.mock('../../src/services/Product.service');

describe('Product Unit Test', () => {
  it('Should Create Product', () => {
    // Arrange
    const expectedProduct = {
      productId: 999,
      images: ['http://www.img.com/1.png'],
    };

    // Act
    product.create(expectedProduct);

    // Assert
    expect(product.create).toHaveBeenCalledTimes(1);
    expect(product.create).toHaveBeenCalledWith(expectedProduct);
  });
});
