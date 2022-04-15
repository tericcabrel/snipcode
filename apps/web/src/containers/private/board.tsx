import PrivateLayout from '@/components/layout/private/private-layout';

const Home = () => {
  return (
    <PrivateLayout>
      <div className="container">
        <main className="main">
          <h1 className="title">
            Welcome to <a href="https://nextjs.org">Sharingan</a>
          </h1>
          <button>Sign out</button>
        </main>
      </div>
    </PrivateLayout>
  );
};

export default Home;
