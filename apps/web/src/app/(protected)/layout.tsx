import '@/styles/globals.css';

import { Toaster } from '@snipcode/front/components/ui/toaster';
import { Inter as FontSans } from 'next/font/google';
import React, { PropsWithChildren } from 'react';

import { AuthenticatedLayout } from './layout/content';

import { ApolloWrapper } from '@/lib/apollo/client';
import { generatePageMetadata } from '@/lib/seo';
import { cn } from '@/lib/utils';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata = generatePageMetadata({
  noIndex: true,
});

const AppLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="en">
      <body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
        <div>
          <ApolloWrapper>
            <Toaster />
            <AuthenticatedLayout>{children}</AuthenticatedLayout>
          </ApolloWrapper>
        </div>
      </body>
    </html>
  );
};

export default AppLayout;
