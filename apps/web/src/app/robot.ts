import { MetadataRoute } from 'next';
import { headers } from 'next/headers';

export default function robots(): MetadataRoute.Robots {
  const headersList = headers();
  const domain = headersList.get('host') as string;

  return {
    rules: [
      {
        allow: '/',
        disallow: '/app/',
        userAgent: '*',
      },
    ],
    sitemap: `https://${domain}/sitemap.xml`,
  };
}
