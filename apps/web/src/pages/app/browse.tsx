import { findPublicSnippetsQuery } from '@snipcode/front/graphql';
import { formatPublicSnippetsResult } from '@snipcode/front/services';
import { PublicSnippetResult } from '@snipcode/front/typings/queries';
import { SNIPPET_ITEM_PER_PAGE } from '@snipcode/front/utils/constants';
import type { GetServerSidePropsContext, NextPage } from 'next';

import { Browse } from '@/containers/private/browse';
import { addApolloState, initializeApollo } from '@/utils/apollo-client';

type Props = {
  data: PublicSnippetResult;
};

const BrowsePage: NextPage<Props> = ({ data }: Props) => {
  return <Browse data={data} />;
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const apolloClient = initializeApollo({ context });

  try {
    const queryResult = await apolloClient.query({
      query: findPublicSnippetsQuery,
      variables: { input: { itemPerPage: SNIPPET_ITEM_PER_PAGE } },
    });

    return addApolloState(apolloClient, {
      props: {
        data: formatPublicSnippetsResult(queryResult.data),
      },
    });
  } catch (err) {
    // TODO send to sentry
    console.log(err);

    return {
      props: {},
    };
  }
};

export default BrowsePage;
