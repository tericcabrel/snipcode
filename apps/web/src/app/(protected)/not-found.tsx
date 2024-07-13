import { PageNotFound } from '@/components/common/page-not-found';
import { generatePageMetadata } from '@/lib/seo';

export const metadata = generatePageMetadata({
  noIndex: true,
  title: 'Page not found',
});

const NotFoundPage = () => {
  return <PageNotFound />;
};

export default NotFoundPage;
