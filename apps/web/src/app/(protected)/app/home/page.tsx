import { HomeContainer } from './container';

import { generatePageMetadata } from '@/lib/seo';

export const metadata = generatePageMetadata({
  noIndex: true,
  title: 'Home',
});

const PrivateHomePage = () => {
  return <HomeContainer />;
};

export default PrivateHomePage;
