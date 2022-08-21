import { gql } from 'apollo-server-core';

export default gql`
  type SnippetInfo {
    snippet: Snippet!
    paths: [Folder!]!
  }

  input CreateSnippetInput {
    folderId: String!
    name: String!
    content: String!
    language: String!
    lineHighlight: String
    visibility: SnippetVisibility!
    description: String
    theme: String!
  }

  input UpdateSnippetInput {
    name: String!
    content: String!
    language: String!
    lineHighlight: String
    visibility: SnippetVisibility!
    description: String
    theme: String!
  }

  extend type Mutation {
    createSnippet(input: CreateSnippetInput!): Snippet!
    updateSnippet(id: ID!, input: UpdateSnippetInput!): Snippet!
    deleteSnippet(id: ID!): Boolean!
  }

  extend type Query {
    allSnippets: [Snippet!]!
    mySnippets: [Snippet!]!
    findSnippet(snippetId: String!): SnippetInfo!
  }
`;
