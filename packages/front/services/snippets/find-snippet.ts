import { FindSnippetQuery } from '../../graphql/generated';
import { useFindSnippetQuery } from '../../graphql/snippets/queries/find-snippet';
import { SnippetInfo } from '../../types/queries';

const formatFindSnippetResult = (data?: FindSnippetQuery): SnippetInfo | undefined => {
  if (!data?.findSnippet) {
    return;
  }

  const { paths, snippet } = data.findSnippet;

  return {
    paths,
    snippet: {
      content: snippet.content,
      contentHighlighted: snippet.contentHighlighted ?? '',
      createdAt: snippet.createdAt,
      description: snippet.description ?? null,
      folderId: snippet.folder.id,
      id: snippet.id,
      isPrivate: snippet.visibility === 'private',
      language: snippet.language,
      lineHighLight: snippet.lineHighlight ? JSON.parse(snippet.lineHighlight) : [],
      name: snippet.name,
      theme: snippet.theme,
      updatedAt: snippet.updatedAt,
    },
  };
};

export const useFindSnippet = (snippetId: string) => {
  const query = useFindSnippetQuery(snippetId);

  const data = formatFindSnippetResult(query.data);

  return {
    data,
    isLoading: query.loading && !query.error && !query.data,
  };
};
