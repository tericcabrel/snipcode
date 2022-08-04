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

  type Mutation {
    createFolder(input: CreateFolderInput!): Folder!
    deleteFolders(folderIds: [String!]!): Boolean!
  }

  extend type Query {
    listFolders(folderId: String): [Folder!]!
    listDirectory(folderId: String!): Directory
  }
`;
