import connectRedis from 'connect-redis';
import { Application } from 'express';
import session from 'express-session';
import Redis from 'ioredis';

import { env } from '../configs/env';
import { COOKIE_NAME } from '../utils/constants';

export const setupApplicationSession = (expressApplication: Application) => {
  const RedisStore = connectRedis(session);
  const redisClient = new Redis(env.REDIS_URL);

  expressApplication.use(
    session({
      cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
        sameSite: 'lax', // csrf
        secure: env.IS_PROD, // Only works on https
      },
      name: COOKIE_NAME,
      resave: false,
      saveUninitialized: false,
      secret: env.SESSION_SECRET,
      store: new RedisStore({
        client: redisClient,
        disableTTL: true,
        disableTouch: true,
      }),
    }),
  );

  return { redisClient };
};
