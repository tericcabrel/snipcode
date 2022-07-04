import { gql } from 'apollo-server-core';

export default gql`
  type Result {
    message: String!
  }

  extend type Mutation {
    subscribeToNewsletter(email: String!): Result!
  }

  extend type Query {
    hello: String! @deprecated
  }
`;
