'use client';

import { useParams } from 'next/navigation';

import { BreadCrumb } from '@snipcode/front/components/directory/breadcrumb';
import { ViewSnippet } from '@snipcode/front/components/directory/snippets/form/view-snippet';
import { useFindSnippet } from '@snipcode/front/services';

import { useFolderDirectory } from '@/hooks/use-folder-directory';

export const ViewSnippetContainer = () => {
  const queryParams = useParams<{ id: string }>();
  const { handleBreadcrumbClick, rootFolderId } = useFolderDirectory();

  const snippetId = queryParams.id;

  const { data, isLoading } = useFindSnippet(snippetId);

  const isSnippetFound = !isLoading && data;

  return (
    <div className="py-10">
      {isSnippetFound ? (
        <div className="max-w-7xl py-8 mx-auto sm:px-6 lg:px-8">
          <BreadCrumb
            current={data.snippet.id}
            paths={data.paths.concat([{ id: snippetId, name: data.snippet.name }])}
            rootFolderId={rootFolderId}
            onPathClick={handleBreadcrumbClick}
          />
          <div className="px-5 pb-5 mt-6 mx-auto bg-white shadow-sm rounded-lg">
            <ViewSnippet snippet={data.snippet} />
          </div>
        </div>
      ) : null}
    </div>
  );
};
