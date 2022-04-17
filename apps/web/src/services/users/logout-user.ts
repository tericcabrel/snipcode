import { useLogoutUserMutation } from '@/graphql/users/mutations/logout-user';

export const useLogoutUser = () => {
  return useLogoutUserMutation();
};
