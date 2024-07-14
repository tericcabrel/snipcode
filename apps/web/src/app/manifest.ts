import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    background_color: '#ffffff',
    description: 'Snipcode – The code snippets management tools for developers',
    display: 'standalone',
    icons: [
      {
        purpose: 'maskable',
        sizes: '192x192',
        src: '/android-chrome-192x192.png',
        type: 'image/png',
      },
      {
        purpose: 'maskable',
        sizes: '512x512',
        src: '/android-chrome-512x512.png',
        type: 'image/png',
      },
    ],
    name: 'Snipcode App',
    short_name: 'Snipcode',
    start_url: '/',
    theme_color: '#ffffff',
  };
}
