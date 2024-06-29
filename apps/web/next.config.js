const { withSentryConfig } = require('@sentry/nextjs');

/** @type {import('next').NextConfig} */
const nextConfigOptions = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'],
  },
  transpilePackages: ['@snipcode/front'],
};

module.exports = withSentryConfig(nextConfigOptions, {
  hideSourceMaps: true,
  org: 'snipcode',
  project: 'frontend',
  // release: "my-project-name@2.3.12",
  authToken: process.env.SENTRY_AUTH_TOKEN, // An auth token is required for uploading source maps.
  silent: false,
  telemetry: false,
});
