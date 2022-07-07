import { NextSeo } from 'next-seo';

import PrivateLayout from '@/components/layout/private/private-layout';

const Home = () => {
  return (
    <PrivateLayout>
      <NextSeo title="Home" />
      <main className="main">
        <h1 className="title">Welcome to Dashboard</h1>
        <br />
      </main>
    </PrivateLayout>
  );
};

export default Home;
