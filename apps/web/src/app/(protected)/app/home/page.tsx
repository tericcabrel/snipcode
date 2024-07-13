import { generatePageMetadata } from '@/lib/seo';

import { HomeContainer } from './container';

export const metadata = generatePageMetadata({
  noIndex: true,
  title: 'Home',
});

const PrivateHomePage = () => {
  return <HomeContainer />;
};

export default PrivateHomePage;
