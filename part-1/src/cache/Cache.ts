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
    let value = null;

    value = await this.redis.get(key);

    return value ? JSON.parse(value) : '';
  }

  set(key: string, value: string, secondsToExpire: number) {
    return this.redis.set(key, value, 'EX', secondsToExpire).then(result => {
      return result;
    });
  }

  del(key: string) {
    return this.redis.del(key);
  }
}

export default new Cache();
