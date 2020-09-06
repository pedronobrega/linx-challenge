import Cache from '../../src/cache/Cache';

const testToken = 'test-integration:';
const cacheModel = new Cache();

describe('Cache Integration Test', () => {
  it('Should Set Value', async () => {
    // Arrange
    const value = '{test:1}';
    const key = testToken + value;

    // Act
    const response = await cacheModel.set(key, value, 1);

    // Assert
    expect(response).toStrictEqual('OK');
  });

  it('Should Get Value', async () => {
    // Arrange
    const expectedValue = '{test:2}';
    const key = testToken + expectedValue;
    await cacheModel.set(key, expectedValue, 1);

    // Act
    const response = await cacheModel.get(key);

    // Assert
    expect(response).toStrictEqual(expectedValue);
  });

  it('Should Delete Value', async () => {
    // Arrange
    const value = '{test:3}';
    const key = testToken + value;
    await cacheModel.set(key, value, 1);

    // Act
    await cacheModel.del(key);
    const response = await cacheModel.get(key);

    // Assert
    expect(response).toBeFalsy();
  });
});
