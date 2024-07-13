import React, { PropsWithChildren } from 'react';

import { ApolloWrapper } from '@/lib/apollo/client';
import { generatePageMetadata } from '@/lib/seo';

import { PublicFooter } from './layout/footer';
import { PublicHeader } from './layout/header';

import '@/styles/globals.css';

export const metadata = generatePageMetadata();

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="en">
      <body>
        <div className="overflow-x-hidden bg-gray-50 min-h-screen">
          <ApolloWrapper>
            <PublicHeader />
          </ApolloWrapper>
          {children}
          <PublicFooter />
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
