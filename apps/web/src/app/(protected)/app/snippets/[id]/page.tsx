import { ViewSnippetContainer } from './container';

import { generatePageMetadata } from '@/lib/seo';

export const metadata = generatePageMetadata({
  noIndex: true,
  title: 'Snipcode - Snippet', // TODO see how to make this dynamic
});

const ViewSnippetPage = () => {
  return <ViewSnippetContainer />;
};

export default ViewSnippetPage;
