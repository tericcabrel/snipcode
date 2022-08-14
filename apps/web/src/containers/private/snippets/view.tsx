import { NextSeo } from 'next-seo';

import Layout from '@/components/layout/private/layout';

const FolderView = () => {
  return (
    <Layout>
      <NextSeo title={'Snippet'} />
      <div className="py-10">
        <div>Snippet found</div>
      </div>
    </Layout>
  );
};

export default FolderView;
