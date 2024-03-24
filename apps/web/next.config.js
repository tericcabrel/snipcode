const { withSentryConfig } = require('@sentry/nextjs');

/** @type {import('next').NextConfig} */
const nextConfigOptions = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'],
  },
  transpilePackages: ['@snipcode/front'],
};

// For all available options, see: https://github.com/getsentry/sentry-webpack-plugin#options.
const sentryWebpackPluginOptions = {
  dryRun: true,
  silent: true,
};

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withSentryConfig(nextConfigOptions, sentryWebpackPluginOptions, { hideSourceMaps: true });
