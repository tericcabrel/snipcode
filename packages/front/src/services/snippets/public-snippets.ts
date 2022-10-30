import { PublicSnippetsQuery } from '../../graphql/generated';
import { usePublicSnippetsQuery } from '../../graphql/snippets/queries/public-snippets';
import { PublicSnippetResult } from '../../typings/queries';

type UsePublicSnippetsArgs = {
  itemPerPage?: number | null;
  nextToken?: string | null;
};

export const formatPublicSnippetsResult = (data?: PublicSnippetsQuery): PublicSnippetResult | undefined => {
  if (!data?.publicSnippets) {
    return;
  }

  const { hasMore, itemPerPage, items, nextToken } = data.publicSnippets;

  return {
    hasMore,
    itemPerPage,
    items: items.map((snippet) => ({
      content: snippet.shortContent,
      createdAt: snippet.createdAt,
      description: snippet.description ?? null,
      id: snippet.id,
      language: snippet.language,
      lineHighLight: snippet.lineHighlight ? JSON.parse(snippet.lineHighlight) : [],
      name: snippet.name,
      theme: snippet.theme,
      user: {
        name: snippet.user.name,
        pictureUrl: snippet.user.pictureUrl,
        username: snippet.user.username,
      },
    })),
    nextToken,
  };
};

export const usePublicSnippets = (args: UsePublicSnippetsArgs) => {
  const query = usePublicSnippetsQuery(args);

  const data = formatPublicSnippetsResult(query.data);

  return {
    data,
    isLoading: query.loading && !query.error && !query.data,
  };
};
