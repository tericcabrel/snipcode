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
  }

  type Snippet {
    id: ID!
    name: String!
    content: String!
    language: String!
    size: Int!
    visibility: SnippetVisibility!
    description: String
    createdAt: Date!
    updatedAt: Date!
    folder: Folder!
    user: User!
  }
`;
