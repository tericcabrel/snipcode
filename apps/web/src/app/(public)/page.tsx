import React from 'react';

import { FeatureSection } from '@/components/home/feature-section';
import { HeroSection } from '@/components/home/hero-section';
import { NewsletterForm } from '@/components/home/newsletter/newsletter-form';
import { NewsletterSection } from '@/components/home/newsletter/newsletter-section';
import { ApolloWrapper } from '@/lib/apollo/client';
import { generatePageMetadata } from '@/lib/seo';

export const metadata = generatePageMetadata();

type PageProps = {
  apolloWrapperElement?: (children: React.ReactNode) => React.ReactNode;
};

const HomePage = ({ apolloWrapperElement }: PageProps) => {
  return (
    <>
      <HeroSection />
      <FeatureSection />
      <NewsletterSection
        newsletterFormElement={
          apolloWrapperElement ? (
            apolloWrapperElement(<NewsletterForm />)
          ) : (
            <ApolloWrapper>
              <NewsletterForm />
            </ApolloWrapper>
          )
        }
      />
    </>
  );
};

export default HomePage;
