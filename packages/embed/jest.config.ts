import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  roots: ['.'],
  preset: 'ts-jest',
  testMatch: ['**/?(*.)+(spec|test).[jt]s'],
  testEnvironment: 'node',
  clearMocks: true,
  maxWorkers: 1,
  snapshotFormat: {
    printBasicPrototype: false,
  },
};

export default config;
