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

  const isSnippetFound = !isLoading && data;

  return (
    <Layout>
      <NextSeo title={'Snippet'} />
      <div className="py-10">
        {isSnippetFound && (
          <div className="max-w-7xl py-8 mx-auto sm:px-6 lg:px-8">
            <BreadCrumb
              paths={data.paths.concat([{ id: snippetId, name: data.snippet.name }])}
              current={data.snippet.id}
              onPathClick={handleBreadcrumbClick}
              rootFolderId={rootFolderId}
            />
            <div className="px-5 pb-5 mt-6 mx-auto bg-white shadow-sm rounded-lg">
              <ViewSnippet snippet={data.snippet} />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default FolderView;
