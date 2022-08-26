import type { AWS } from '@serverless/typescript';

import renderer from '@/functions/renderer';

const serverlessConfiguration: AWS = {
  custom: {
    esbuild: {
      bundle: true,
      concurrency: 10,
      define: { 'require.resolve': undefined },
      exclude: ['aws-sdk', 'vscode-oniguruma'],
      minify: false,
      platform: 'node',
      sourcemap: true,
      target: 'node16',
    },
  },
  frameworkVersion: '3',
  functions: { renderer },
  package: { individually: true },
  plugins: ['serverless-esbuild'],
  provider: {
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    name: 'aws',
    runtime: 'nodejs16.x',
  },
  service: 'code-embed',
  useDotenv: true,
};

module.exports = serverlessConfiguration;
