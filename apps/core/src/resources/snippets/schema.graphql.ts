import { gql } from 'apollo-server-core';

export default gql`
  type SnippetInfo {
    snippet: Snippet!
    paths: [Folder!]!
  }

  type PublicSnippetsResult {
    items: [Snippet!]!
    hasMore: Boolean!
    itemPerPage: Int
    nextToken: String
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

  input PublicSnippetsArgs {
    nextToken: String
    itemPerPage: Int
  }

  extend type Mutation {
    createSnippet(input: CreateSnippetInput!): Snippet!
    updateSnippet(id: ID!, input: UpdateSnippetInput!): Snippet!
    deleteSnippet(id: ID!): Boolean!
  }

  extend type Query {
    publicSnippets(args: PublicSnippetsArgs!): PublicSnippetsResult!
    mySnippets: [Snippet!]!
    findSnippet(snippetId: String!): SnippetInfo!
  }
`;
