/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export type RoleName = 'user' | 'admin';
export type OauthProvider = 'email' | 'github' | 'stackoverflow' | 'twitter';
export type SnippetVisibility = 'public' | 'private';
export type SnippetSortMethod = 'recently_created' | 'recently_updated';

export interface SignupUserInput {
  email: string;
  name: string;
  password: string;
}

export interface CreateFolderInput {
  parentId: string;
  name: string;
}

export interface UpdateFolderInput {
  name: string;
}

export interface CreateSnippetInput {
  folderId: string;
  name: string;
  content: string;
  contentHighlighted: string;
  language: string;
  lineHighlight?: Nullable<string>;
  visibility: SnippetVisibility;
  description?: Nullable<string>;
  theme: string;
}

export interface UpdateSnippetInput {
  name: string;
  content: string;
  contentHighlighted: string;
  language: string;
  lineHighlight?: Nullable<string>;
  visibility: SnippetVisibility;
  description?: Nullable<string>;
  theme: string;
}

export interface PublicSnippetsInput {
  nextToken?: Nullable<string>;
  itemPerPage?: Nullable<number>;
  sortMethod?: Nullable<SnippetSortMethod>;
  keyword?: Nullable<string>;
}

export interface LoginResult {
  __typename?: 'LoginResult';
  token: string;
}

export interface SignupUserResult {
  __typename?: 'SignupUserResult';
  message: string;
  userId: string;
}

export interface ConfirmUserResult {
  __typename?: 'ConfirmUserResult';
  message: string;
}

export interface IQuery {
  __typename?: 'IQuery';
  authenticatedUser(): User | Promise<User>;
  listFolders(folderId?: Nullable<string>): Folder[] | Promise<Folder[]>;
  findFolder(folderId: string): Folder | Promise<Folder>;
  listDirectory(folderId: string): Nullable<Directory> | Promise<Nullable<Directory>>;
  ping(): Nullable<string> | Promise<Nullable<string>>;
  publicSnippets(input: PublicSnippetsInput): PublicSnippetsResult | Promise<PublicSnippetsResult>;
  mySnippets(): Snippet[] | Promise<Snippet[]>;
  findSnippet(snippetId: string): SnippetInfo | Promise<SnippetInfo>;
  hello(): string | Promise<string>;
}

export interface IMutation {
  __typename?: 'IMutation';
  loginUser(email: string, password: string): LoginResult | Promise<LoginResult>;
  logoutUser(): boolean | Promise<boolean>;
  signupUser(input: SignupUserInput): SignupUserResult | Promise<SignupUserResult>;
  confirmUser(token: string): ConfirmUserResult | Promise<ConfirmUserResult>;
  createFolder(input: CreateFolderInput): Folder | Promise<Folder>;
  deleteFolders(folderIds: string[]): boolean | Promise<boolean>;
  updateFolder(id: string, input: UpdateFolderInput): Folder | Promise<Folder>;
  createSnippet(input: CreateSnippetInput): Snippet | Promise<Snippet>;
  updateSnippet(id: string, input: UpdateSnippetInput): Snippet | Promise<Snippet>;
  deleteSnippet(id: string): boolean | Promise<boolean>;
  subscribeToNewsletter(email: string): SubscribeToNewsletterResult | Promise<SubscribeToNewsletterResult>;
}

export interface Directory {
  __typename?: 'Directory';
  folders: Folder[];
  snippets: Snippet[];
  paths: Folder[];
}

export interface Role {
  __typename?: 'Role';
  id: string;
  name: RoleName;
  level: number;
  description?: Nullable<string>;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  __typename?: 'User';
  id: string;
  email: string;
  username?: Nullable<string>;
  name: string;
  timezone?: Nullable<string>;
  isEnabled: boolean;
  pictureUrl?: Nullable<string>;
  role: Role;
  oauthProvider?: Nullable<OauthProvider>;
  createdAt: Date;
  updatedAt: Date;
  rootFolder: Folder;
  folders: Folder[];
}

export interface Folder {
  __typename?: 'Folder';
  id: string;
  name: string;
  isFavorite: boolean;
  isArchived: boolean;
  isHidden: boolean;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  parent?: Nullable<Folder>;
  subFolders: Folder[];
  subFoldersCount: number;
}

export interface Snippet {
  __typename?: 'Snippet';
  id: string;
  name: string;
  content: string;
  contentHighlighted: string;
  language: string;
  lineHighlight?: Nullable<string>;
  size: number;
  visibility: SnippetVisibility;
  description?: Nullable<string>;
  theme: string;
  createdAt: Date;
  updatedAt: Date;
  folder: Folder;
  user: User;
}

export interface SnippetInfo {
  __typename?: 'SnippetInfo';
  snippet: Snippet;
  paths: Folder[];
}

export interface PublicSnippetsResult {
  __typename?: 'PublicSnippetsResult';
  items: Snippet[];
  hasMore: boolean;
  itemPerPage?: Nullable<number>;
  nextToken?: Nullable<string>;
}

export interface SubscribeToNewsletterResult {
  __typename?: 'SubscribeToNewsletterResult';
  message: string;
}

type Nullable<T> = T | null;
