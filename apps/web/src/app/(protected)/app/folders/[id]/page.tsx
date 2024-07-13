import { generatePageMetadata } from '@/lib/seo';

import { ViewFolderContainer } from './container';

export const metadata = generatePageMetadata({
  noIndex: true,
  title: 'Snipcode - Folder', // TODO see how to make this dynamic
});

const ViewFolderPage = () => {
  return <ViewFolderContainer />;
};

export default ViewFolderPage;
