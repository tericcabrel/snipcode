import { ToastProvider } from '@snipcode/front/components/toast/provider';
import React, { PropsWithChildren } from 'react';

import { AuthenticatedLayout } from './layout/content';

import { ApolloWrapper } from '@/lib/apollo/client';
import { generatePageMetadata } from '@/lib/seo';

import '@/styles/globals.css';

export const metadata = generatePageMetadata({
  noIndex: true,
});

const AppLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="en">
      <body>
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
