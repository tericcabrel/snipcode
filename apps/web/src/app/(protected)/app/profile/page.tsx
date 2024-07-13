import { generatePageMetadata } from '@/lib/seo';

import { ProfileContainer } from './container';

export const metadata = generatePageMetadata({
  noIndex: true,
  title: 'Profile',
});

const ProfilePage = () => {
  return <ProfileContainer />;
};

export default ProfilePage;
