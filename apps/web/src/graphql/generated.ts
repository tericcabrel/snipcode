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
  /** Date custom scalar type */
  Date: any;
};

export type Mutation = {
  __typename?: 'Mutation';
  logoutUser: Scalars['Boolean'];
  subscribeToNewsletter: Result;
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
  authenticatedUser?: Maybe<User>;
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
export type User = {
  __typename?: 'User';
  createdAt: Scalars['Date'];
  email: Scalars['String'];
  id: Scalars['ID'];
  isEnabled: Scalars['Boolean'];
  name: Scalars['String'];
  oauthProvider?: Maybe<OauthProvider>;
  pictureUrl?: Maybe<Scalars['String']>;
  role: Role;
  timezone?: Maybe<Scalars['String']>;
  updatedAt: Scalars['Date'];
  username?: Maybe<Scalars['String']>;
};

export type LogoutUserMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutUserMutation = { __typename?: 'Mutation', logoutUser: boolean };

export type AuthenticatedUserQueryVariables = Exact<{ [key: string]: never; }>;


export type AuthenticatedUserQuery = { __typename?: 'Query', authenticatedUser?: { __typename: 'User', id: string, email: string, isEnabled: boolean, name: string, pictureUrl?: string | null, username?: string | null, role: { __typename: 'Role', name: RoleName } } | null };
