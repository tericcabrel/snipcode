import { Resolvers } from '../types/graphql';
import { createFolder } from './folders/mutations/create-folder';
import { deleteFolders } from './folders/mutations/delete-folders';
import { updateFolder } from './folders/mutations/update-folder';
import { findFolder } from './folders/queries/find-folder';
import { listDirectory } from './folders/queries/list-directory';
import { listFolders } from './folders/queries/list-folders';
import { subFoldersCountResolver } from './folders/resolvers';
import { subscribeToNewsletter } from './newsletter/mutations/subscribe';
import { createSnippet } from './snippets/mutations/create-snippet';
import { deleteSnippet } from './snippets/mutations/delete-snippet';
import { updateSnippet } from './snippets/mutations/update-snippet';
import { findSnippet } from './snippets/queries/find-snippet';
import { mySnippets } from './snippets/queries/my-snippets';
import { publicSnippets } from './snippets/queries/public-snippets';
import { shortContentResolver } from './snippets/queries/resolvers/short-content';
import { dateScalar } from './types/date';
import { loginUser } from './users/mutations/login-user';
import { logoutUser } from './users/mutations/logout-user';
import { signupUser } from './users/mutations/signup-user';
import { authenticatedUser } from './users/queries/authenticated-user';

const resolvers: Resolvers = {
  Date: dateScalar,
  Folder: {
    parent: (folder, _args, context) => {
      return context.db.folder.findById(folder.parentId);
    },
    subFolders: (folder, _args, context) => {
      return context.db.folder.findSubFolders(folder.id);
    },
    subFoldersCount: subFoldersCountResolver,
    user: (folder, _args, context) => {
      return context.db.user.findById(folder.userId);
    },
  },
  Mutation: {
    createFolder,
    createSnippet,
    deleteFolders,
    deleteSnippet,
    loginUser,
    logoutUser,
    signupUser,
    subscribeToNewsletter,
    updateFolder,
    updateSnippet,
  },
  Query: {
    authenticatedUser,
    findFolder,
    findSnippet,
    hello: () => 'Hello from Sharingan',
    listDirectory,
    listFolders,
    mySnippets,
    ping: () => 'pong',
    publicSnippets,
  },
  Snippet: {
    folder: (snippet, _args, context) => {
      return context.db.folder.findById(snippet.folderId);
    },
    shortContent: shortContentResolver,
    user: (snippet, _args, context) => {
      return context.db.user.findById(snippet.userId);
    },
  },
  User: {
    folders: (user, _args, context) => {
      return context.db.folder.findUserFolders(user.id);
    },
    role: (user, _args, context) => {
      return context.db.role.findById(user.roleId);
    },
    rootFolder: (user, _args, context) => {
      return context.db.folder.findUserRootFolder(user.id);
    },
  },
};

export default resolvers;
