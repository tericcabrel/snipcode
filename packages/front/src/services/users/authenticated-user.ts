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

export const useAuthenticatedUser = () => {
  const query = useAuthenticatedUserQuery();

  const data = formatAuthenticatedUserResult(query.data);

  return {
    data: formatAuthenticatedUserResult(query.data),
    isLoading: Boolean(data) ? false : query.loading,
  };
};
