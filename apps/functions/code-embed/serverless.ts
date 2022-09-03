import type { AWS } from '@serverless/typescript';

import renderer from '@/functions/renderer';

const serverlessConfiguration: AWS = {
  custom: {
    esbuild: {
      bundle: true,
      concurrency: 10,
      define: { 'require.resolve': undefined },
      exclude: ['aws-sdk', 'vscode-oniguruma', 'shiki', '@prisma'],
      minify: false,
      platform: 'node',
      sourcemap: true,
      target: 'node16',
    },
  },
  frameworkVersion: '3',
  functions: { renderer },
  layers: {
    Prisma: {
      path: 'layers/prisma-layer',
    },
    Shiki: {
      path: 'layers/shiki-layer',
    },
  },
  package: {
    individually: true,
    patterns: ['./src/**'],
  },
  plugins: ['serverless-esbuild', 'serverless-offline'],
  provider: {
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      DATABASE_URL: '${env:DATABASE_URL}',
      EMBED_JS_URL: '${env:EMBED_JS_URL}',
      EMBED_STYLE_URL: '${env:EMBED_STYLE_URL}',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      WEB_APP_URL: '${env:WEB_APP_URL}',
    },
    name: 'aws',
    region: 'eu-west-2',
    runtime: 'nodejs16.x',
  },
  service: 'code-embed',
  useDotenv: true,
};

module.exports = serverlessConfiguration;
