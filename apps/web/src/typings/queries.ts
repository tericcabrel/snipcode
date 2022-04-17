import { RoleName } from '@/graphql/generated';

export type AuthenticatedUser = {
  email: string;
  id: string;
  isEnabled: boolean;
  name: string;
  pictureUrl: string | null;
  role: RoleName;
  username: string | null;
};
