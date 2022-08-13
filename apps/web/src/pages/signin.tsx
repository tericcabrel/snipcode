import { authenticatedUserQuery } from '@sharingan/front';
import { GetServerSidePropsContext } from 'next';
import type { NextPage } from 'next';
import dynamic from 'next/dynamic';

import { addApolloState, initializeApollo } from '@/utils/apollo-client';

const SignIn = dynamic(() => import('@/containers/auth/login'));

const SignInPage: NextPage = () => {
  return <SignIn />;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const apolloClient = initializeApollo({ context });

  try {
    await apolloClient.query({
      query: authenticatedUserQuery,
      variables: {},
    });
  } catch (err) {}

  return addApolloState(apolloClient, {
    props: {},
  });
}

export default SignInPage;
