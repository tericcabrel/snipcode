const { withSentryConfig } = require('@sentry/nextjs');
const withTM = require('next-transpile-modules')(['@sharingan/front'])

/** @type {import('next').NextConfig} */
const nextConfigOptions = withTM({
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com']
  }
});

const sentryWebpackPluginOptions = {
  dryRun: true,
  silent: true
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withSentryConfig(nextConfigOptions, sentryWebpackPluginOptions);
