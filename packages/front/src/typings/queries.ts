import { RoleName } from '../graphql/generated';

export type AuthenticatedUser = {
  email: string;
  id: string;
  isEnabled: boolean;
  name: string;
  pictureUrl: string | null;
  role: RoleName;
  rootFolderId: string;
  username: string | null;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type SignupUserInput = {
  email: string;
  name: string;
  password: string;
};

export type FolderItem = {
  fileCount: number;
  id: string;
  name: string;
};

export type FilePath = {
  id: string;
  name: string;
};

export type SnippetItem = {
  folderId: string;
  id: string;
  language: string;
  name: string;
};

export type DirectoryList = {
  folders: FolderItem[];
  paths: FilePath[];
  snippets: SnippetItem[];
};
