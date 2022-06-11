import { NextSeo } from 'next-seo';
import dynamic from 'next/dynamic';

const PageNotFound = dynamic(() => import('@/containers/page-not-found'));

const NotFoundPage = () => {
  return (
    <>
      <NextSeo title="Sharingan - Page not found" nofollow noindex />
      <PageNotFound />
    </>
  );
};

export default NotFoundPage;
