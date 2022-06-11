import Head from 'next/head';

import FeatureSection from '@/components/home/feature-section';
import HeroSection from '@/components/home/hero-section';
import NewsletterSection from '@/components/home/newsletter/newsletter-section';
import PublicLayout from '@/components/layout/public/public-layout';

const Home = () => {
  return (
    <PublicLayout>
      <Head>
        <title>Sharingan - Create and share your code snippets with the world</title>
      </Head>
      <HeroSection />
      <FeatureSection />
      <NewsletterSection />
    </PublicLayout>
  );
};

export default Home;
