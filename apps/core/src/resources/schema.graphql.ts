import { gql } from 'apollo-server-core';

export default gql`
  scalar Date

  enum RoleName {
    user
    admin
  }

  enum OauthProvider {
    github
    stackoverflow
    twitter
  }

  enum SnippetVisibility {
    public
    private
  }

  type Role {
    id: ID!
    name: RoleName!
    level: Int!
    description: String
    createdAt: Date!
    updatedAt: Date!
  }

  type User {
    id: ID!
    email: String!
    username: String
    name: String!
    timezone: String
    isEnabled: Boolean!
    pictureUrl: String
    role: Role!
    oauthProvider: OauthProvider
    createdAt: Date!
    updatedAt: Date!
    rootFolder: Folder!
    folders: [Folder!]!
  }

  type Folder {
    id: ID!
    name: String!
    isFavorite: Boolean!
    createdAt: Date!
    updatedAt: Date!
    user: User!
    parent: Folder
    subFolders: [Folder!]!
    subFoldersCount: Int!
  }

  type Snippet {
    id: ID!
    name: String!
    content: String!
    shortContent: String!
    language: String!
    lineHighlight: String
    size: Int!
    visibility: SnippetVisibility!
    description: String
    theme: String!
    createdAt: Date!
    updatedAt: Date!
    folder: Folder!
    user: User!
  }

  type Query {
    ping: String
      @deprecated(
        reason: "https://stackoverflow.com/questions/59868942/graphql-a-schema-must-have-a-query-operation-defined"
      )
  }
`;
