import { findPublicSnippetsQuery } from '@snipcode/front/graphql';
import { PublicSnippetsQuery } from '@snipcode/front/graphql/generated';
import { SNIPPET_ITEM_PER_PAGE } from '@snipcode/front/lib/constants';
import { formatPublicSnippetsResult } from '@snipcode/front/services';
import { cookies } from 'next/headers';

import { getApolloClient } from '@/lib/apollo/server';
import { AUTH_COOKIE_NAME } from '@/lib/constants';
import { logErrorToSentry } from '@/lib/errors';

export const fetchSnippets = async () => {
  try {
    const authToken = cookies().get(AUTH_COOKIE_NAME);

    const { data } = await getApolloClient().query<PublicSnippetsQuery>({
      context: {
        headers: {
          Authorization: authToken?.value,
        },
      },
      query: findPublicSnippetsQuery,
      variables: { input: { itemPerPage: SNIPPET_ITEM_PER_PAGE } },
    });

    return formatPublicSnippetsResult(data);
  } catch (error: unknown) {
    logErrorToSentry(error);

    throw new Error('Failed to fetch public snippets');
  }
};
