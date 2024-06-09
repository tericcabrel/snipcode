import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  roots: ['.'],
  preset: 'ts-jest',
  testMatch: ['**/?(*.)+(spec|test).[jt]s'],
  testEnvironment: 'node',
  clearMocks: true,
  maxWorkers: 1,
  prettierPath: require.resolve('prettier-2'), // Waiting for the release of v30 to use Prettier 3
  snapshotFormat: {
    printBasicPrototype: false,
  },
};

export default config;
