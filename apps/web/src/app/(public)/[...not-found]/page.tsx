import { notFound } from 'next/navigation';

// Workaround for handling not found route when using multiples root layouts: https://github.com/vercel/next.js/discussions/50034
const NotFoundDummyPage = () => {
  notFound();
};

export default NotFoundDummyPage;
