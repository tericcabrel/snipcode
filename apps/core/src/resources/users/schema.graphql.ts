import { gql } from 'apollo-server-core';

export default gql`
  type LoginResult {
    token: String!
  }

  input SignupUserInput {
    email: String!
    name: String!
    password: String!
  }

  type SignupUserResult {
    message: String!
  }

  type Query {
    authenticatedUser: User
  }

  type Mutation {
    loginUser(email: String!, password: String!): LoginResult!
    logoutUser: Boolean!
    signupUser(input: SignupUserInput!): SignupUserResult!
  }
`;
