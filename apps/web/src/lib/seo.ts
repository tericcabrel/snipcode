import { Metadata } from 'next';

import { APP_URL } from '@/lib/constants';

type GeneratePageMetadataOptions = {
  description?: string;
  icons?: Metadata['icons'];
  image?: string | null;
  noIndex?: boolean;
  title?: string;
};

const DESCRIPTION =
  'Snipcode is the code snippets management tools for developers to easily create, organize and share your code snippets with others developers.';
const TITLE = 'Snipcode - code snippets management tools for developers';

const DEFAULT_ICONS = [
  {
    rel: 'apple-touch-icon',
    sizes: '32x32',
    url: '/apple-touch-icon.png',
  },
  {
    rel: 'icon',
    sizes: '32x32',
    type: 'image/png',
    url: '/favicon-32x32.png',
  },
  {
    rel: 'icon',
    sizes: '16x16',
    type: 'image/png',
    url: '/favicon-16x16.png',
  },
];

export const generatePageMetadata = ({
  description = DESCRIPTION,
  icons = DEFAULT_ICONS,
  image = `${APP_URL}/assets/og.png`,
  noIndex = false,
  title = TITLE,
}: GeneratePageMetadataOptions = {}): Metadata => {
  const images = image ? [{ height: 720, url: image, width: 1280 }] : [];
  const twitterImage = image ? { card: 'summary_large_image', images: [image] } : {};
  const pageIndex = noIndex ? { follow: false, index: false } : {};

  return {
    description,
    icons,
    metadataBase: new URL(APP_URL),
    openGraph: {
      description,
      images,
      locale: 'en-US',
      siteName: title,
      title,
      type: 'website',
      url: APP_URL,
    },
    title,
    twitter: {
      creator: '@snipcode_dev',
      description,
      title,
      ...twitterImage,
    },
    ...pageIndex,
  };
};
