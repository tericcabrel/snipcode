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

  type Mutation {
    createSnippet(input: CreateSnippetInput!): Snippet!
  }

  type Query {
    allSnippets: [Snippet!]!
    mySnippets: [Snippet!]!
  }
`;
