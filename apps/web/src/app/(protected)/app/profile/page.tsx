import { ProfileContainer } from './container';

import { generatePageMetadata } from '@/lib/seo';

export const metadata = generatePageMetadata({
  noIndex: true,
  title: 'Profile',
});

const ProfilePage = () => {
  return <ProfileContainer />;
};

export default ProfilePage;
