import '@/styles/globals.css';

import { Inter as FontSans } from 'next/font/google';
import React, { PropsWithChildren } from 'react';

import { ApolloWrapper } from '@/lib/apollo/client';
import { generatePageMetadata } from '@/lib/seo';
import { cn } from '@/lib/utils';

import { PublicFooter } from './layout/footer';
import { PublicHeader } from './layout/header';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata = generatePageMetadata();

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="en">
      <body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
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
