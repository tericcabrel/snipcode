import { MetadataRoute } from 'next';

import { APP_URL } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      lastModified: new Date(),
      url: `${APP_URL}/signup`,
    },
    {
      lastModified: new Date(),
      url: `${APP_URL}/signin`,
    },
  ];
}
