import PrivateLayout from '@/components/layout/private/private-layout';
import { useSubscribeToNewsletter } from '@/graphql/newsletters/mutations/subscribe-newsletter';

const Home = () => {
  const [subscribe] = useSubscribeToNewsletter();

  const handleSubscribe = async () => {
    await subscribe({
      variables: {
        email: 'contact@tericcabrel.com',
      },
    });
  };

  return (
    <PrivateLayout>
      <main className="main">
        <h1 className="title">Welcome to Dashboard</h1>
        <br />
        <button onClick={handleSubscribe}>Subscribe</button>
      </main>
    </PrivateLayout>
  );
};

export default Home;
