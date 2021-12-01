import { createClient } from 'redis';
import { sendSuccessResponse } from './response-helper';

const client = createClient({ url: `redis://${process.env.REDIS_HOST_NAME}:${process.env.REDIS_PORT}` });

const connectRedis = async () => {
  try {
    await client.connect();
    console.log('Redis Connection Successful');
  } catch (err) {
    setTimeout(connectRedis, 2000);
  }
};

export const setCache = async (key, value) => {
  await client.set(key, JSON.stringify(value), {
    EX: 60,
  });
};

const getValue = async (key) => {
  return JSON.parse(await client.get(key));
};

export const cacheMiddleware = async (req, res, next) => {
  const data = await getValue(`${req.originalUrl}:${JSON.stringify(req.body)}`);

  if (!data) return next();

  console.log('Cache Hit');

  return sendSuccessResponse(res, data);
};

connectRedis();
