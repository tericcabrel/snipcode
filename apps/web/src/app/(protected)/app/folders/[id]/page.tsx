import { ViewFolderContainer } from './container';

import { generatePageMetadata } from '@/lib/seo';

export const metadata = generatePageMetadata({
  noIndex: true,
  title: 'Snipcode - Folder', // TODO see how to make this dynamic
});

const ViewFolderPage = () => {
  return <ViewFolderContainer />;
};

export default ViewFolderPage;
