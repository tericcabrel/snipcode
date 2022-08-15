import { useFindSnippet } from '@sharingan/front';
import { BreadCrumb, ViewSnippet } from '@sharingan/front';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

import Layout from '@/components/layout/private/layout';
import { useFolderDirectory } from '@/hooks/use-folder-directory';

const FolderView = () => {
  const router = useRouter();
  const { handleBreadcrumbClick, rootFolderId } = useFolderDirectory();

  const snippetId = router.query.id as string;

  const { data, isLoading } = useFindSnippet(snippetId);

  const isSnippetFound = !isLoading && Boolean(data);

  if (!data) {
    return <div>Not found</div>;
  }

  return (
    <Layout>
      <NextSeo title={'Snippet'} />
      <div className="py-10">
        {isSnippetFound && (
          <div className="max-w-7xl py-8 mx-auto sm:px-6 lg:px-8">
            <BreadCrumb
              paths={data.paths}
              current={data.snippet.folderId}
              onPathClick={handleBreadcrumbClick}
              rootFolderId={rootFolderId}
            />
            <ViewSnippet snippet={data.snippet} />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default FolderView;
