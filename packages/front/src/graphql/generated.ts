export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type CreateFolderInput = {
  name: Scalars['String'];
  parentId: Scalars['String'];
};

export type CreateSnippetInput = {
  content: Scalars['String'];
  description?: InputMaybe<Scalars['String']>;
  folderId: Scalars['String'];
  language: Scalars['String'];
  lineHighlight?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  theme: Scalars['String'];
  visibility: SnippetVisibility;
};

export type Directory = {
  __typename?: 'Directory';
  folders: Array<Folder>;
  paths: Array<Folder>;
  snippets: Array<Snippet>;
};

export type Folder = {
  __typename?: 'Folder';
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  isFavorite: Scalars['Boolean'];
  name: Scalars['String'];
  parent?: Maybe<Folder>;
  subFolders: Array<Folder>;
  subFoldersCount: Scalars['Int'];
  updatedAt: Scalars['Date'];
  user: User;
};

export type LoginResult = {
  __typename?: 'LoginResult';
  token: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createFolder: Folder;
  createSnippet: Snippet;
  deleteFolders: Scalars['Boolean'];
  loginUser: LoginResult;
  logoutUser: Scalars['Boolean'];
  signupUser: SignupUserResult;
  subscribeToNewsletter: Result;
};


export type MutationCreateFolderArgs = {
  input: CreateFolderInput;
};


export type MutationCreateSnippetArgs = {
  input: CreateSnippetInput;
};


export type MutationDeleteFoldersArgs = {
  folderIds: Array<Scalars['String']>;
};


export type MutationLoginUserArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationSignupUserArgs = {
  input: SignupUserInput;
};


export type MutationSubscribeToNewsletterArgs = {
  email: Scalars['String'];
};

export const OauthProvider = {
  Github: 'github',
  Stackoverflow: 'stackoverflow',
  Twitter: 'twitter'
} as const;

export type OauthProvider = typeof OauthProvider[keyof typeof OauthProvider];
export type Query = {
  __typename?: 'Query';
  allSnippets: Array<Snippet>;
  authenticatedUser: User;
  findFolder: Folder;
  findSnippet: SnippetInfo;
  /** @deprecated No longer supported */
  hello: Scalars['String'];
  listDirectory?: Maybe<Directory>;
  listFolders: Array<Folder>;
  mySnippets: Array<Snippet>;
  /** @deprecated https://stackoverflow.com/questions/59868942/graphql-a-schema-must-have-a-query-operation-defined */
  ping?: Maybe<Scalars['String']>;
};


export type QueryFindFolderArgs = {
  folderId: Scalars['String'];
};


export type QueryFindSnippetArgs = {
  snippetId: Scalars['String'];
};


export type QueryListDirectoryArgs = {
  folderId: Scalars['String'];
};


export type QueryListFoldersArgs = {
  folderId?: InputMaybe<Scalars['String']>;
};

export type Result = {
  __typename?: 'Result';
  message: Scalars['String'];
};

export type Role = {
  __typename?: 'Role';
  createdAt: Scalars['Date'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  level: Scalars['Int'];
  name: RoleName;
  updatedAt: Scalars['Date'];
};

export const RoleName = {
  Admin: 'admin',
  User: 'user'
} as const;

export type RoleName = typeof RoleName[keyof typeof RoleName];
export type SignupUserInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};

export type SignupUserResult = {
  __typename?: 'SignupUserResult';
  message: Scalars['String'];
};

export type Snippet = {
  __typename?: 'Snippet';
  content: Scalars['String'];
  createdAt: Scalars['Date'];
  description?: Maybe<Scalars['String']>;
  folder: Folder;
  id: Scalars['ID'];
  language: Scalars['String'];
  lineHighLight?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  size: Scalars['Int'];
  theme: Scalars['String'];
  updatedAt: Scalars['Date'];
  user: User;
  visibility: SnippetVisibility;
};

export type SnippetInfo = {
  __typename?: 'SnippetInfo';
  paths: Array<Folder>;
  snippet: Snippet;
};

export const SnippetVisibility = {
  Private: 'private',
  Public: 'public'
} as const;

export type SnippetVisibility = typeof SnippetVisibility[keyof typeof SnippetVisibility];
export type User = {
  __typename?: 'User';
  createdAt: Scalars['Date'];
  email: Scalars['String'];
  folders: Array<Folder>;
  id: Scalars['ID'];
  isEnabled: Scalars['Boolean'];
  name: Scalars['String'];
  oauthProvider?: Maybe<OauthProvider>;
  pictureUrl?: Maybe<Scalars['String']>;
  role: Role;
  rootFolder: Folder;
  timezone?: Maybe<Scalars['String']>;
  updatedAt: Scalars['Date'];
  username?: Maybe<Scalars['String']>;
};

export type CreateFolderMutationVariables = Exact<{
  input: CreateFolderInput;
}>;


export type CreateFolderMutation = { __typename?: 'Mutation', createFolder: { __typename?: 'Folder', id: string } };

export type FindFolderQueryVariables = Exact<{
  folderId: Scalars['String'];
}>;


export type FindFolderQuery = { __typename?: 'Query', findFolder: { __typename?: 'Folder', id: string, name: string } };

export type ListDirectoryQueryVariables = Exact<{
  folderId: Scalars['String'];
}>;


export type ListDirectoryQuery = { __typename?: 'Query', listDirectory?: { __typename?: 'Directory', folders: Array<{ __typename?: 'Folder', id: string, name: string, subFoldersCount: number }>, snippets: Array<{ __typename?: 'Snippet', id: string, name: string, language: string }>, paths: Array<{ __typename?: 'Folder', id: string, name: string }> } | null };

export type SubscribeNewsletterMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type SubscribeNewsletterMutation = { __typename?: 'Mutation', subscribeToNewsletter: { __typename?: 'Result', message: string } };

export type CreateSnippetMutationVariables = Exact<{
  input: CreateSnippetInput;
}>;


export type CreateSnippetMutation = { __typename?: 'Mutation', createSnippet: { __typename?: 'Snippet', id: string } };

export type FindSnippetQueryVariables = Exact<{
  snippetId: Scalars['String'];
}>;


export type FindSnippetQuery = { __typename?: 'Query', findSnippet: { __typename?: 'SnippetInfo', paths: Array<{ __typename?: 'Folder', id: string, name: string }>, snippet: { __typename?: 'Snippet', id: string, name: string, description?: string | null, language: string, lineHighLight?: string | null, visibility: SnippetVisibility, content: string, theme: string, createdAt: any, updatedAt: any } } };

export type LoginUserMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginUserMutation = { __typename?: 'Mutation', loginUser: { __typename: 'LoginResult', token: string } };

export type LogoutUserMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutUserMutation = { __typename?: 'Mutation', logoutUser: boolean };

export type SignupUserMutationVariables = Exact<{
  input: SignupUserInput;
}>;


export type SignupUserMutation = { __typename?: 'Mutation', signupUser: { __typename?: 'SignupUserResult', message: string } };

export type AuthenticatedUserQueryVariables = Exact<{ [key: string]: never; }>;


export type AuthenticatedUserQuery = { __typename?: 'Query', authenticatedUser: { __typename: 'User', id: string, email: string, isEnabled: boolean, name: string, pictureUrl?: string | null, username?: string | null, role: { __typename: 'Role', name: RoleName }, rootFolder: { __typename: 'Folder', id: string } } };
