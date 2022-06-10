import { AuthenticatedUserQuery } from '@/graphql/generated';
import { useAuthenticatedUserQuery } from '@/graphql/users/queries/authenticated-user';
import { AuthenticatedUser } from '@/typings/queries';

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

export const useAuthenticatedUser = () => {
  const query = useAuthenticatedUserQuery();

  return {
    data: formatAuthenticatedUserResult(query.data),
    isLoading: query.loading,
  };
};
