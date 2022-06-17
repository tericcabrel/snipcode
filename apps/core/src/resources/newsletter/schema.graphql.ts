import { gql } from 'apollo-server-core';

export default gql`
  type Result {
    message: String!
  }

  type Mutation {
    subscribeToNewsletter(email: String!): Result!
  }
`;
