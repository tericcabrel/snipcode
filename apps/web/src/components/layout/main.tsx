import Head from 'next/head';
import { Fragment, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return (
    <Fragment>
      <Head>
        <title>Sharingan</title>
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <meta content="Create and share your code snippets with the world." name="description" />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <div id="main">{children}</div>
    </Fragment>
  );
};

export default MainLayout;
