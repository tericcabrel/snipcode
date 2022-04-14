import { Fragment, ReactNode } from 'react';
import Head from 'next/head';

type Props = {
  children: ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return (
    <Fragment>
      <Head>
        <title>Sharingan</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Create and share your code snippets with the world." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div id="main">{children}</div>
    </Fragment>
  );
};

export default MainLayout;
