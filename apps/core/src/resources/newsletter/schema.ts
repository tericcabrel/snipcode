import { gql } from 'apollo-server';

const typeDefs = gql`
  type Result {
    message: String!
  }

  type Mutation {
    subscribeToNewsletter(email: String!): Result!
  }

  type Query {
    hello: String!
  }
`;

export default typeDefs;
