import { ApolloServer } from 'apollo-server';
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { addResolversToSchema } from '@graphql-tools/schema';
import { sortNumbers } from '@sharingan/utils';
import { env } from './configs/env';
import { logger } from './configs/logger';
import { resolvers } from './resources/newsletter/resolvers';

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

console.log(sortNumbers([67, 80, 4, 11, 90, 54, 22]));

void server.listen({ port: env.PORT }).then(({ url }) => {
  logger.info(`🚀  Server ready at ${url}graphql`);
});
