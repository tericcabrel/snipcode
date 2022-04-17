import { Server } from 'http';
import { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { addResolversToSchema } from '@graphql-tools/schema';
import { newsletterService, roleService, userService } from '@sharingan/domain';
import { resolvers } from '../resources/resolvers';
import { AppContext } from '../types/common';
import { env } from '../configs/env';
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
        newsletter: newsletterService,
        role: roleService,
        user: userService,
      },
      req,
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
