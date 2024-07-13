import { generatePageMetadata } from '@/lib/seo';

import { ViewSnippetContainer } from './container';

export const metadata = generatePageMetadata({
  noIndex: true,
  title: 'Snipcode - Snippet', // TODO see how to make this dynamic
});

const ViewSnippetPage = () => {
  return <ViewSnippetContainer />;
};

export default ViewSnippetPage;
