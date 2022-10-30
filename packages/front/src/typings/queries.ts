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

export type LightFolderItem = {
  fileCount: number;
  id: string;
  name: string;
};

export type FilePath = {
  id: string;
  name: string;
};

export type LightSnippetItem = {
  content: string;
  folderId: string;
  id: string;
  language: string;
  name: string;
};

export type DirectoryList = {
  folders: LightFolderItem[];
  paths: FilePath[];
  snippets: LightSnippetItem[];
};

export type FindFolderData = {
  id: string;
  name: string;
};

export type SnippetItem = {
  content: string;
  contentHighlighted: string;
  createdAt: number;
  description: string | null;
  folderId: string;
  id: string;
  isPrivate: boolean;
  language: string;
  lineHighLight: [number, string][];
  name: string;
  theme: string;
  updatedAt: number;
};

export type SnippetInfo = {
  paths: FilePath[];
  snippet: SnippetItem;
};

export type PublicSnippetItem = {
  content: string;
  createdAt: number;
  description: string | null;
  id: string;
  language: string;
  lineHighLight: [number, string][];
  name: string;
  theme: string;
  user: {
    name: string;
    pictureUrl?: string | null;
    username?: string | null;
  };
};

export type PublicSnippetResult = {
  hasMore: boolean;
  itemPerPage?: number | null;
  items: PublicSnippetItem[];
  nextToken?: string | null;
};
