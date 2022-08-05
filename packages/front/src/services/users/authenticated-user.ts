import { AuthenticatedUserQuery } from '../../graphql/generated';
import { useAuthenticatedUserQuery } from '../../graphql/users/queries/authenticated-user';
import { AuthenticatedUser } from '../../typings/queries';

const formatAuthenticatedUserResult = (data?: AuthenticatedUserQuery): AuthenticatedUser | undefined => {
  if (!data?.authenticatedUser) {
    return;
  }

  const { email, id, isEnabled, name, pictureUrl, role, rootFolder, username } = data.authenticatedUser;

  return {
    email,
    id,
    isEnabled,
    name,
    pictureUrl: pictureUrl ?? null,
    role: role.name,
    rootFolderId: rootFolder.id,
    username: username ?? null,
  };
};

const useUserInLocalStorage = (key: string) => {
  if (typeof window === 'undefined') {
    return null;
  }

  return localStorage.getItem(key);
};

export const useAuthenticatedUser = (cookieName: string) => {
  // TODO to replace with reading user's data from the apollo cache
  const user = useUserInLocalStorage(cookieName);

  const query = useAuthenticatedUserQuery(Boolean(user));

  const data = formatAuthenticatedUserResult(query.data);

  if (data) {
    localStorage.setItem(cookieName, JSON.stringify(data));
  }

  if (user) {
    return {
      data: JSON.parse(user) as AuthenticatedUser,
      isLoading: false,
    };
  }

  return {
    data: formatAuthenticatedUserResult(query.data),
    isLoading: Boolean(data) ? false : query.loading,
  };
};
