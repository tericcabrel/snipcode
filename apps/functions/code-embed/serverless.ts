import type { AWS } from '@serverless/typescript';

import renderer from '@/functions/renderer';

const serverlessConfiguration: AWS = {
  configValidationMode: 'error',
  custom: {
    customCertificate: {
      certificateName: '${self:custom.domains.${self:provider.stage}.certificateName}',
      hostedZoneNames: 'sharingan.dev.',
      region: '${self:provider.region}',
    },
    customDomain: {
      apiType: 'rest',
      autoDomain: false,
      basePath: '',
      certificateName: '${self:custom.domains.${self:provider.stage}.certificateName}',
      createRoute53Record: false,
      domainName: '${self:custom.domains.${self:provider.stage}.domainName}',
      endpointType: 'edge',
    },
    domains: {
      dev: {
        certificateName: 'embedstaging.sharingan.dev',
        domainName: 'embedstaging.sharingan.dev',
      },
      prod: {
        certificateName: 'embed.sharingan.dev',
        domainName: 'embed.sharingan.dev',
      },
    },
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
  plugins: ['serverless-esbuild', 'serverless-offline', 'serverless-domain-manager', 'serverless-certificate-creator'],
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
      ENV: '${env:ENV}',
      NODE_OPTIONS: '--stack-trace-limit=1000',
      SENTRY_DSN: '${env:SENTRY_DSN}',
      WEB_APP_URL: '${env:WEB_APP_URL}',
    },
    name: 'aws',
    region: 'eu-west-1',
    runtime: 'nodejs16.x',
    stage: "${opt:stage, 'dev'}",
  },
  service: 'code-embed',
  useDotenv: true,
};

module.exports = serverlessConfiguration;
