import { Server } from 'http';

import { mergeSchemas } from '@graphql-tools/schema';
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
  PluginDefinition,
} from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import { Application } from 'express';

import { env } from '../configs/env';
import resolvers from '../resources/resolvers';
import schemas from '../resources/schemas';
import { AppContext } from '../types/common';
import { CORS_APOLLO_STUDIO_URL } from '../utils/constants';
import { buildGraphQLContext } from './config/build-context';

const explorerPlugin: PluginDefinition[] = env.IS_PROD
  ? []
  : [ApolloServerPluginLandingPageLocalDefault({ embed: true })];

export const startGraphqlServer = async (expressApplication: Application, httpServer: Server) => {
  const schemaWithResolvers = mergeSchemas({
    resolvers,
    typeDefs: schemas,
  });

  const apolloServer = new ApolloServer({
    context: async ({ req, res }): Promise<AppContext> => await buildGraphQLContext(req, res),
    debug: env.IS_DEV,
    introspection: env.ENABLE_INTROSPECTION,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }), // graceful shutdown
      ...explorerPlugin,
    ],
    schema: schemaWithResolvers,
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({
    app: expressApplication,
    cors: {
      credentials: true,
      origin: [env.WEB_APP_URL, CORS_APOLLO_STUDIO_URL],
    },
  });

  return apolloServer;
};
