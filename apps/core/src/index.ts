import { ApolloServer } from 'apollo-server';
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { addResolversToSchema } from '@graphql-tools/schema';
import { env } from './configs/env';
import { logger } from './configs/logger';
import { resolvers } from './resources/newsletter/resolvers';
import { loadData } from './utils/db/loader';

const schema = loadSchemaSync('**/*.graphql', {
  loaders: [new GraphQLFileLoader()],
});

const schemaWithResolvers = addResolversToSchema({
  resolvers,
  schema,
});

const server = new ApolloServer({
  healthCheckPath: '/health',
  introspection: env.ENABLE_INTROSPECTION,
  schema: schemaWithResolvers,
});

void server.listen({ port: env.PORT }).then(async ({ url }) => {
  await loadData();

  logger.info(`🚀  Server ready at ${url}graphql`);
});
