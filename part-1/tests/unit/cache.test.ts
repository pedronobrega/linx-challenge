jest.mock('../../src/cache/Cache');
// eslint-disable-next-line import/first
import Cache from '../../src/cache/Cache';

const testToken = 'test:';

describe('Cache Unit Test', () => {
  it('Should Set Value', () => {
    // Arrange
    const value = 'cache_test1';
    const key = testToken + value;

    // Act
    Cache.set(key, value, 3);

    // Assert
    expect(Cache.set).toHaveBeenCalledTimes(1);
    expect(Cache.set).toHaveBeenCalledWith(key, value, 3);
  });

  it('Should Get Value', () => {
    // Arrange
    const expectedValue = 'cache_test2';
    const key = testToken + expectedValue;
    Cache.set(key, expectedValue, 3);

    // Act
    Cache.get(key);

    // Assert
    expect(Cache.get).toHaveBeenCalledTimes(1);
    expect(Cache.get).toHaveBeenCalledWith(key);
  });

  it('Should Delete Value', () => {
    // Arrange
    const value = 'cache_test3';
    const key = testToken + value;
    Cache.set(key, value, 3);

    // Act
    Cache.del(key);

    // Assert
    expect(Cache.del).toHaveBeenCalledTimes(1);
    expect(Cache.del).toHaveBeenCalledWith(key);
  });
});
