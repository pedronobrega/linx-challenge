import Redis, { RedisOptions } from 'ioredis';
import dotenv from 'dotenv';

const path = `./.env.${process.env.ENVIRONMENT}`;
dotenv.config({ path });

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

  async get(key: string): Promise<string> {
    let filteredValue = null;

    filteredValue = await this.redis.get(key);

    return filteredValue || '';
  }

  async set(
    key: string,
    value: string,
    secondsToExpire: number,
  ): Promise<string | null> {
    const filteredValue = await this.redis.set(
      key,
      value,
      'EX',
      secondsToExpire,
    );
    return filteredValue;
  }

  async del(key: string): Promise<number> {
    const filteredValue = await this.redis.del(key);
    return filteredValue;
  }
}

export default Cache;
