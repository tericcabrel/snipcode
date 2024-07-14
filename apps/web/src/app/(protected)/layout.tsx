import '@/styles/globals.css';

import { ToastProvider } from '@snipcode/front/components/toast/provider';
import { Inter as FontSans } from 'next/font/google';
import React, { PropsWithChildren } from 'react';

import { ApolloWrapper } from '@/lib/apollo/client';
import { generatePageMetadata } from '@/lib/seo';
import { cn } from '@/lib/utils';

import { AuthenticatedLayout } from './layout/content';

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
            <ToastProvider>
              <AuthenticatedLayout>{children}</AuthenticatedLayout>
            </ToastProvider>
          </ApolloWrapper>
        </div>
      </body>
    </html>
  );
};

export default AppLayout;
