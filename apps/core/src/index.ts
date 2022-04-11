import http from 'http';
import express from 'express';
import { env } from './configs/env';
import { logger } from './configs/logger';
import { startGraphqlServer } from './server/graphql';
import { setupRestEndpoints } from './server/rest';
import { loadData } from './utils/db/loader';

export const startServer = async () => {
  const app = express();

  const httpServer = http.createServer(app);

  const graphqlServer = await startGraphqlServer(app, httpServer);

  setupRestEndpoints(app);

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
