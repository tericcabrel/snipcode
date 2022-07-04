import { gql } from 'apollo-server-core';

export default gql`
  input CreateSnippetInput {
    folderId: String!
    name: String!
    content: String!
    language: String!
    visibility: SnippetVisibility!
    description: String
  }

  extend type Mutation {
    createSnippet(input: CreateSnippetInput!): Snippet!
  }

  extend type Query {
    allSnippets: [Snippet!]!
    mySnippets: [Snippet!]!
  }
`;
