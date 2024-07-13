import { PublicSnippetsQuery } from '../../graphql/generated';
import { useLazyPublicSnippetsQuery } from '../../graphql/snippets/queries/public-snippets';
import { PublicSnippetResult } from '../../typings/queries';

type FindPublicSnippetsArgs = {
  input: {
    itemPerPage?: number | null;
    keyword?: string;
    nextToken?: string | null;
    sortMethod: 'recently_updated' | 'recently_created';
  };
  onCompleted: (result: PublicSnippetResult | null) => void;
};

export const formatPublicSnippetsResult = (data?: PublicSnippetsQuery): PublicSnippetResult | null => {
  if (!data?.publicSnippets) {
    return null;
  }

  const { hasMore, itemPerPage, items, nextToken } = data.publicSnippets;

  return {
    hasMore,
    itemPerPage,
    items: items.map((snippet) => ({
      content: snippet.contentHighlighted,
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

export const usePublicSnippets = () => {
  const [query, { data, loading }] = useLazyPublicSnippetsQuery();

  const findPublicSnippets = (args: FindPublicSnippetsArgs) => {
    return query({
      onCompleted: (data) => {
        args.onCompleted(formatPublicSnippetsResult(data));
      },
      variables: {
        input: {
          itemPerPage: args.input.itemPerPage,
          keyword: args.input.keyword,
          nextToken: args.input.nextToken,
          sortMethod: args.input.sortMethod,
        },
      },
    });
  };

  return {
    data: formatPublicSnippetsResult(data),
    findPublicSnippets,
    isLoading: loading,
  };
};
