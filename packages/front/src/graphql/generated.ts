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
  contentHighlighted: Scalars['String'];
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
  deleteSnippet: Scalars['Boolean'];
  loginUser: LoginResult;
  logoutUser: Scalars['Boolean'];
  signupUser: SignupUserResult;
  subscribeToNewsletter: Result;
  updateFolder: Folder;
  updateSnippet: Snippet;
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

export type MutationDeleteSnippetArgs = {
  id: Scalars['ID'];
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

export type MutationUpdateFolderArgs = {
  id: Scalars['ID'];
  input: UpdateFolderInput;
};

export type MutationUpdateSnippetArgs = {
  id: Scalars['ID'];
  input: UpdateSnippetInput;
};

export const OauthProvider = {
  Github: 'github',
  Stackoverflow: 'stackoverflow',
  Twitter: 'twitter',
} as const;

export type OauthProvider = typeof OauthProvider[keyof typeof OauthProvider];
export type PublicSnippetsInput = {
  itemPerPage?: InputMaybe<Scalars['Int']>;
  keyword?: InputMaybe<Scalars['String']>;
  nextToken?: InputMaybe<Scalars['String']>;
  sortMethod?: InputMaybe<SnippetSortMethod>;
};

export type PublicSnippetsResult = {
  __typename?: 'PublicSnippetsResult';
  hasMore: Scalars['Boolean'];
  itemPerPage?: Maybe<Scalars['Int']>;
  items: Array<Snippet>;
  nextToken?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
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
  publicSnippets: PublicSnippetsResult;
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

export type QueryPublicSnippetsArgs = {
  input: PublicSnippetsInput;
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
  User: 'user',
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
  contentHighlighted: Scalars['String'];
  createdAt: Scalars['Date'];
  description?: Maybe<Scalars['String']>;
  folder: Folder;
  id: Scalars['ID'];
  language: Scalars['String'];
  lineHighlight?: Maybe<Scalars['String']>;
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

export const SnippetSortMethod = {
  RecentlyCreated: 'recently_created',
  RecentlyUpdated: 'recently_updated',
} as const;

export type SnippetSortMethod = typeof SnippetSortMethod[keyof typeof SnippetSortMethod];
export const SnippetVisibility = {
  Private: 'private',
  Public: 'public',
} as const;

export type SnippetVisibility = typeof SnippetVisibility[keyof typeof SnippetVisibility];
export type UpdateFolderInput = {
  name: Scalars['String'];
};

export type UpdateSnippetInput = {
  content: Scalars['String'];
  contentHighlighted: Scalars['String'];
  description?: InputMaybe<Scalars['String']>;
  language: Scalars['String'];
  lineHighlight?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  theme: Scalars['String'];
  visibility: SnippetVisibility;
};

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

export type CreateFolderMutation = { __typename?: 'Mutation'; createFolder: { __typename?: 'Folder'; id: string } };

export type DeleteFoldersMutationVariables = Exact<{
  folderIds: Array<Scalars['String']> | Scalars['String'];
}>;

export type DeleteFoldersMutation = { __typename?: 'Mutation'; deleteFolders: boolean };

export type UpdateFolderMutationVariables = Exact<{
  id: Scalars['ID'];
  input: UpdateFolderInput;
}>;

export type UpdateFolderMutation = {
  __typename?: 'Mutation';
  updateFolder: { __typename: 'Folder'; id: string; name: string; updatedAt: any };
};

export type FindFolderQueryVariables = Exact<{
  folderId: Scalars['String'];
}>;

export type FindFolderQuery = { __typename?: 'Query'; findFolder: { __typename?: 'Folder'; id: string; name: string } };

export type ListDirectoryQueryVariables = Exact<{
  folderId: Scalars['String'];
}>;

export type ListDirectoryQuery = {
  __typename?: 'Query';
  listDirectory?: {
    __typename?: 'Directory';
    folders: Array<{ __typename?: 'Folder'; id: string; name: string; subFoldersCount: number }>;
    snippets: Array<{ __typename?: 'Snippet'; id: string; name: string; language: string; content: string }>;
    paths: Array<{ __typename?: 'Folder'; id: string; name: string }>;
  } | null;
};

export type SubscribeNewsletterMutationVariables = Exact<{
  email: Scalars['String'];
}>;

export type SubscribeNewsletterMutation = {
  __typename?: 'Mutation';
  subscribeToNewsletter: { __typename?: 'Result'; message: string };
};

export type CreateSnippetMutationVariables = Exact<{
  input: CreateSnippetInput;
}>;

export type CreateSnippetMutation = { __typename?: 'Mutation'; createSnippet: { __typename?: 'Snippet'; id: string } };

export type DeleteSnippetMutationVariables = Exact<{
  id: Scalars['ID'];
}>;

export type DeleteSnippetMutation = { __typename?: 'Mutation'; deleteSnippet: boolean };

export type UpdateSnippetMutationVariables = Exact<{
  id: Scalars['ID'];
  input: UpdateSnippetInput;
}>;

export type UpdateSnippetMutation = {
  __typename?: 'Mutation';
  updateSnippet: {
    __typename: 'Snippet';
    id: string;
    name: string;
    description?: string | null;
    language: string;
    lineHighlight?: string | null;
    visibility: SnippetVisibility;
    content: string;
    theme: string;
    updatedAt: any;
  };
};

export type FindSnippetQueryVariables = Exact<{
  snippetId: Scalars['String'];
}>;

export type FindSnippetQuery = {
  __typename?: 'Query';
  findSnippet: {
    __typename?: 'SnippetInfo';
    paths: Array<{ __typename?: 'Folder'; id: string; name: string }>;
    snippet: {
      __typename: 'Snippet';
      id: string;
      name: string;
      description?: string | null;
      language: string;
      lineHighlight?: string | null;
      visibility: SnippetVisibility;
      content: string;
      contentHighlighted: string;
      theme: string;
      createdAt: any;
      updatedAt: any;
      folder: { __typename?: 'Folder'; id: string };
    };
  };
};

export type PublicSnippetsQueryVariables = Exact<{
  input: PublicSnippetsInput;
}>;

export type PublicSnippetsQuery = {
  __typename?: 'Query';
  publicSnippets: {
    __typename: 'PublicSnippetsResult';
    hasMore: boolean;
    itemPerPage?: number | null;
    nextToken?: string | null;
    items: Array<{
      __typename: 'Snippet';
      id: string;
      name: string;
      description?: string | null;
      language: string;
      lineHighlight?: string | null;
      contentHighlighted: string;
      theme: string;
      createdAt: any;
      user: { __typename?: 'User'; id: string; username?: string | null; name: string; pictureUrl?: string | null };
    }>;
  };
};

export type LoginUserMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;

export type LoginUserMutation = { __typename?: 'Mutation'; loginUser: { __typename: 'LoginResult'; token: string } };

export type LogoutUserMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutUserMutation = { __typename?: 'Mutation'; logoutUser: boolean };

export type SignupUserMutationVariables = Exact<{
  input: SignupUserInput;
}>;

export type SignupUserMutation = {
  __typename?: 'Mutation';
  signupUser: { __typename?: 'SignupUserResult'; message: string };
};

export type AuthenticatedUserQueryVariables = Exact<{ [key: string]: never }>;

export type AuthenticatedUserQuery = {
  __typename?: 'Query';
  authenticatedUser: {
    __typename: 'User';
    id: string;
    email: string;
    isEnabled: boolean;
    name: string;
    pictureUrl?: string | null;
    username?: string | null;
    role: { __typename: 'Role'; name: RoleName };
    rootFolder: { __typename: 'Folder'; id: string };
  };
};
