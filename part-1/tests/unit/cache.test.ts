jest.mock('../../src/cache/Cache');
// eslint-disable-next-line import/first
import Cache from '../../src/cache/Cache';

const testToken = 'test:';
const cacheModel = new Cache();

describe('Cache Unit Test', () => {
  it('Should Set Value', () => {
    // Arrange
    const value = 'cache_test1';
    const key = testToken + value;

    // Act
    cacheModel.set(key, value, 3);

    // Assert
    expect(cacheModel.set).toHaveBeenCalledTimes(1);
    expect(cacheModel.set).toHaveBeenCalledWith(key, value, 3);
  });

  it('Should Get Value', () => {
    // Arrange
    const expectedValue = 'cache_test2';
    const key = testToken + expectedValue;
    cacheModel.set(key, expectedValue, 3);

    // Act
    cacheModel.get(key);

    // Assert
    expect(cacheModel.get).toHaveBeenCalledTimes(1);
    expect(cacheModel.get).toHaveBeenCalledWith(key);
  });

  it('Should Delete Value', () => {
    // Arrange
    const value = 'cache_test3';
    const key = testToken + value;
    cacheModel.set(key, value, 3);

    // Act
    cacheModel.del(key);

    // Assert
    expect(cacheModel.del).toHaveBeenCalledTimes(1);
    expect(cacheModel.del).toHaveBeenCalledWith(key);
  });
});
