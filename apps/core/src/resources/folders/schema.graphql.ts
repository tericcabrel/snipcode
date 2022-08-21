import { gql } from 'apollo-server-core';

export default gql`
  type Directory {
    folders: [Folder!]!
    snippets: [Snippet!]!
    paths: [Folder!]!
  }

  input CreateFolderInput {
    parentId: String!
    name: String!
  }

  input UpdateFolderInput {
    name: String!
  }

  type Mutation {
    createFolder(input: CreateFolderInput!): Folder!
    deleteFolders(folderIds: [String!]!): Boolean!
    updateFolder(id: ID!, input: UpdateFolderInput!): Folder!
  }

  extend type Query {
    listFolders(folderId: String): [Folder!]!
    findFolder(folderId: String!): Folder!
    listDirectory(folderId: String!): Directory
  }
`;
