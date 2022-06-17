import { gql } from 'apollo-server-core';

export default gql`
  type Result {
    message: String!
  }

  input CreateFolderInput {
    parentId: String!
    name: String!
  }

  type Mutation {
    createFolder(input: CreateFolderInput!): Folder!
    deleteFolders(folderIds: [String!]!): Boolean!
  }

  type Query {
    listFolders(folderId: String): [Folder!]!
  }
`;
