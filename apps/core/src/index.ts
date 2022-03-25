import { ApolloServer } from 'apollo-server';
import typeDefs from './resources/newsletter/schema';
import { resolvers } from './resources/newsletter/resolvers';
import { sortNumbers } from '@sharingan/utils';
import { env } from './configs/env';

const server = new ApolloServer({
  healthCheckPath: '/health',
  introspection: env.ENABLE_INTROSPECTION,
  resolvers,
  typeDefs,
});

console.log(sortNumbers([67, 80, 4, 11, 90, 54, 22]));

void server.listen({ port: env.PORT }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}graphql`);
});
