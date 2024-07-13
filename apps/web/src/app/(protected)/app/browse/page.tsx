import { generatePageMetadata } from '@/lib/seo';

import { BrowseContainer } from './container';
import { fetchSnippets } from './lib/fetch-snippets';

export const dynamic = 'force-dynamic';

export const metadata = generatePageMetadata({
  title: 'Snipcode - Browse code snippets',
});

const BrowsePage = async () => {
  const data = await fetchSnippets();

  if (!data) {
    throw new Error('Failed to fetch public snippets');
  }

  return <BrowseContainer data={data} />;
};

export default BrowsePage;
