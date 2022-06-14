const SITE_URL = process.env.NEXT_PUBLIC_APP_URL;

module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      // { userAgent: '*', disallow: '/login' },
      { userAgent: '*', allow: '/' },
    ],
    additionalSitemaps: [`${SITE_URL}/sitemap.xml`],
  },
  exclude: ['/login', '/board', '/profile', '/settings', '/private*'],
};
