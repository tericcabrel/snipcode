import { useAuthenticatedUserQuery } from '@/graphql/users/queries/authenticated-user';
import { AuthenticatedUserQuery } from '@/graphql/generated';
import { AuthenticatedUser } from '@/typings/queries';

const formatAuthenticatedUserResult = (data?: AuthenticatedUserQuery): AuthenticatedUser | undefined => {
  if (!data?.me) {
    return;
  }

  const { email, firstName, id, isEnabled, lastName, pictureUrl, role, username } = data.me;

  return {
    email,
    id,
    isEnabled,
    name: `${firstName} ${lastName ?? ''}`,
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
