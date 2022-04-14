import Head from 'next/head';
import Link from 'next/link';
import PublicLayout from '@/components/layout/public/public-layout';

const Home = () => {
  return (
    <PublicLayout>
      <div className="container">
        <Head>
          <title>Sharingan</title>
          <meta name="description" content="Create and share your code snippets with the world." />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="main">
          <h1 className="title">
            Welcome to <a href="https://nextjs.org">Sharingan</a>
          </h1>
          <Link href={`https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`}>
            <a>Sign up with GitHub</a>
          </Link>
        </main>
      </div>
    </PublicLayout>
  );
};

export default Home;
