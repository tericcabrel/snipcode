import { PublicSnippetsQuery } from '../../graphql/generated';
import { useLazyPublicSnippetsQuery } from '../../graphql/snippets/queries/public-snippets';
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
  const [query] = useLazyPublicSnippetsQuery();

  // const data = formatPublicSnippetsResult(query.data);

  const findPublicSnippets = (args: UsePublicSnippetsArgs) => {
    return query({
      variables: {
        args: {
          itemPerPage: args.itemPerPage,
          nextToken: args.nextToken,
        },
      },
    });
  };

  return {
    findPublicSnippets,
  };
};
