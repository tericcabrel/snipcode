import http from 'http';
import express from 'express';
import { env } from './configs/env';
import { logger } from './configs/logger';
import { startGraphqlServer } from './server/graphql';
import { setupRestEndpoints } from './server/rest';
import { loadData } from './utils/db/loader';
import { setupApplicationSession } from './server/session';

export const startServer = async () => {
  const expressApplication = express();

  setupApplicationSession(expressApplication);

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
