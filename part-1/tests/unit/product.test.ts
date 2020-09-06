import product from '../../src/services/Product.service';

jest.mock('../../src/services/Product.service');

describe('Product Unit Test', () => {
  it('Should Create Product', () => {
    // Arrange
    const expectedProduct = [
      {
        id: 1234,
        name: 'Cadeiraa',
      },
    ];

    // Act
    product.create(expectedProduct);

    // Assert
    expect(product.create).toHaveBeenCalledTimes(1);
    expect(product.create).toHaveBeenCalledWith(expectedProduct);
  });

  it('Should Get Product', () => {
    // Arrange
    const expectedProduct = [
      {
        id: 1235,
        name: 'Mesaa',
      },
    ];

    // Act
    product.get(1235);

    // Assert
    expect(product.get).toHaveBeenCalledTimes(1);
    expect(product.get).toHaveBeenCalledWith(1235);
  });
});
