import PrivateLayout from '@/components/layout/private/private-layout';

const Home = () => {
  return (
    <PrivateLayout>
      <main className="main">
        <h1 className="title">Welcome to Dashboard</h1>
      </main>
    </PrivateLayout>
  );
};

export default Home;
