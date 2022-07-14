import { AuthenticatedUserQuery } from '@/graphql/generated';
import { useAuthenticatedUserQuery } from '@/graphql/users/queries/authenticated-user';
import { AuthenticatedUser } from '@/typings/queries';
import { COOKIE_NAME } from '@/utils/constants';

const formatAuthenticatedUserResult = (data?: AuthenticatedUserQuery): AuthenticatedUser | undefined => {
  if (!data?.authenticatedUser) {
    return;
  }

  const { email, id, isEnabled, name, pictureUrl, role, username } = data.authenticatedUser;

  return {
    email,
    id,
    isEnabled,
    name,
    pictureUrl: pictureUrl ?? null,
    role: role.name,
    username: username ?? null,
  };
};

const useUserInLocalStorage = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  return localStorage.getItem(COOKIE_NAME);
};

export const useAuthenticatedUser = () => {
  const user = useUserInLocalStorage();

  const query = useAuthenticatedUserQuery(Boolean(user));

  const data = formatAuthenticatedUserResult(query.data);

  if (data) {
    localStorage.setItem(COOKIE_NAME, JSON.stringify(data));
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
