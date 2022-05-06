import { Resolvers } from '../types/graphql';
import { dateScalar } from './types/date';
import { deleteFolders } from './folders/mutations/deleteFolders';
import { listFolders } from './folders/queries/list-folders';
import { createSnippet } from './snippets/mutations/createSnippet';
import { createFolder } from './folders/mutations/createFolder';
import { subscribeToNewsletter } from './newsletter/mutations/subscribe';
import { logoutUser } from './users/mutations/logout-user';
import { authenticatedUser } from './users/queries/authenticated-user';

export const resolvers: Resolvers = {
  Date: dateScalar,
  Folder: {
    parent: (folder, _args, context) => {
      return context.db.folder.findById(folder.parentId);
    },
    subFolders: (folder, _args, context) => {
      return context.db.folder.findSubFolders(folder.id);
    },
    user: (folder, _args, context) => {
      return context.db.user.findById(folder.userId);
    },
  },
  Mutation: {
    createFolder,
    createSnippet,
    deleteFolders,
    logoutUser,
    subscribeToNewsletter,
  },
  Query: {
    authenticatedUser,
    listFolders,
  },
  Snippet: {
    folder: (snippet, _args, context) => {
      return context.db.folder.findById(snippet.id);
    },
  },
  User: {
    folders: (user, _args, context) => {
      return context.db.folder.findUserFolders(user.id);
    },
    role: (user, _args, context) => {
      return context.db.role.findById(user.roleId);
    },
  },
};
