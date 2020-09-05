import Redis, { RedisOptions } from 'ioredis';

class Cache {
  redis: Redis.Redis;

  constructor() {
    const options: RedisOptions = {
      port: (process.env.REDIS_PORT && +process.env.REDIS_PORT) || 6379,
      host: process.env.REDIS_HOST || 'localhost',
      keyPrefix: 'node_cache:',
    };
    this.redis = new Redis(options);
  }

  async get(key: string) {
    let filteredValue = null;

    filteredValue = await this.redis.get(key);

    return filteredValue ? JSON.parse(filteredValue) : '';
  }

  async set(key: string, value: string, secondsToExpire: number) {
    const filteredValue = await this.redis.set(
      key,
      value,
      'EX',
      secondsToExpire,
    );
    return filteredValue;
  }

  async del(key: string) {
    const filteredValue = await this.redis.del(key);
    return filteredValue;
  }
}

export default new Cache();
