import { Server } from 'http';
import { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { addResolversToSchema } from '@graphql-tools/schema';
import { resolvers } from '../resources/newsletter/resolvers';
import { env } from '../configs/env';
import { AppContext } from '../types/common';

export const startGraphqlServer = async (app: Application, httpServer: Server) => {
  const schema = loadSchemaSync('**/*.graphql', {
    loaders: [new GraphQLFileLoader()],
  });

  const schemaWithResolvers = addResolversToSchema({
    resolvers,
    schema,
  });

  const server = new ApolloServer({
    context: ({ req, res }): AppContext => ({
      req,
      res,
    }),
    introspection: env.ENABLE_INTROSPECTION,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }), // graceful shutdown
    ],
    schema: schemaWithResolvers,
  });

  await server.start();

  server.applyMiddleware({ app });

  return server;
};
