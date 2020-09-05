import Cache from '../../src/cache/Cache';

const testToken = 'test-integration:';

describe('Cache Integration Test', () => {
  beforeEach(async () => {
    await Cache.del(`*${testToken}*`);
  });

  it('Should Set Value', async () => {
    // Arrange
    const value = 'integration:cache:{test:1}';
    const key = testToken + value;

    // Act
    const result = await Cache.set(key, value, 0.1);

    // Assert
    expect(result).toStrictEqual('OK');
  });

  it('Should Get Value', async () => {
    // Arrange
    const expectedValue = 'integration:cache:{test:2}';
    const key = testToken + expectedValue;
    await Cache.set(key, expectedValue, 0.1);

    // Act
    const result = await Cache.get(key);

    // Assert
    expect(result).toStrictEqual(expectedValue);
  });

  it('Should Delete Value', async () => {
    // Arrange
    const value = 'integration:cache:{test:3}';
    const key = testToken + value;
    await Cache.set(key, value, 0.1);

    // Act
    await Cache.del(key);
    const result = await Cache.get(key);

    // Assert
    expect(result).toBeFalsy();
  });
});
