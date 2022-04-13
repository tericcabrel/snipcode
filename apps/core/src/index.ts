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
  const app = express();

  const httpServer = http.createServer(app);

  const graphqlServer = await startGraphqlServer(app, httpServer);

  setupRestEndpoints(app);

  const RedisStore = connectRedis(session);
  const redisClient = new Redis(env.REDIS_URL);

  app.use(
    session({
      cookie: {
        // 1 year
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 365,
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

  httpServer
    .listen(env.PORT, async () => {
      await loadData();

      logger.info(`🚀 Server ready at ${env.HOST}:${env.PORT}${graphqlServer.graphqlPath}`);
    })
    .setTimeout(2000);

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
