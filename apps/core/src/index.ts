import http from 'http';
import express from 'express';
import connectRedis from 'connect-redis';
import session from 'express-session';
import Redis from 'ioredis';
import { env } from './configs/env';
import { logger } from './configs/logger';
import { startGraphqlServer } from './server/graphql';
import { setupRestEndpoints } from './server/rest';
import { loadData } from './utils/db/loader';
import { COOKIE_NAME } from './utils/constants';

export const startServer = async () => {
  const expressApplication = express();

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
      secret: 'MySessionKey',
      store: new RedisStore({
        client: redisClient,
        disableTTL: true,
        disableTouch: true,
      }),
    }),
  );

  const httpServer = http.createServer(expressApplication);

  const graphqlServer = await startGraphqlServer(expressApplication, httpServer);

  setupRestEndpoints(expressApplication);

  httpServer
    .listen(env.PORT, async () => {
      await loadData();

      logger.info(`🚀 Server ready at ${env.HOST}:${env.PORT}${graphqlServer.graphqlPath}`);
    })
    .setTimeout(10000);

  return { graphqlServer, httpServer };
};

void (async () => {
  await startServer();
})();

process.on('unhandledRejection', (e: any) => {
  logger.error(e);
});

process.on('uncaughtException', (e) => {
  logger.error(e);
});
