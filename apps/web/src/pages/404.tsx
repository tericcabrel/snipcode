import dynamic from 'next/dynamic';
import { NextSeo } from 'next-seo';

const PageNotFound = dynamic(() => import('@/containers/page-not-found'));

const NotFoundPage = () => {
  return (
    <>
      <NextSeo title="Page not found" nofollow noindex />
      <PageNotFound />
    </>
  );
};

export default NotFoundPage;
