import { Server } from 'http';

import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadSchemaSync } from '@graphql-tools/load';
import { addResolversToSchema } from '@graphql-tools/schema';
import {
  folderService,
  newsletterService,
  roleService,
  sessionService,
  snippetService,
  userService,
} from '@sharingan/domain';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import { Application } from 'express';

import { env } from '../configs/env';
import { resolvers } from '../resources/resolvers';
import { AppContext } from '../types/common';
import { CORS_APOLLO_STUDIO_URL } from '../utils/constants';

export const startGraphqlServer = async (expressApplication: Application, httpServer: Server) => {
  const schema = loadSchemaSync('**/*.graphql', {
    loaders: [new GraphQLFileLoader()],
  });

  const schemaWithResolvers = addResolversToSchema({
    resolvers,
    schema,
  });

  const apolloServer = new ApolloServer({
    context: ({ req, res }): AppContext => ({
      db: {
        folder: folderService,
        newsletter: newsletterService,
        role: roleService,
        session: sessionService,
        snippet: snippetService,
        user: userService,
      },
      req: Object.assign(req, { session: {} }),
      res,
    }),
    introspection: env.ENABLE_INTROSPECTION,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }), // graceful shutdown
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
