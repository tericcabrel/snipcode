import type { NextPage } from 'next';
import dynamic from 'next/dynamic';

const Home = dynamic(() => import('@/containers/home'));

const HomePage: NextPage = () => {
  return <Home />;
};

export default HomePage;
