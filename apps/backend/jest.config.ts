import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  clearMocks: true,
  maxWorkers: 1,
  moduleFileExtensions: ['js', 'json', 'ts'],
  preset: 'ts-jest',
  roots: ['.'],
  snapshotFormat: {
    printBasicPrototype: false,
  },
  testEnvironment: 'node',
  testMatch: ['**/?(*.)+(spec|test).[jt]s'],
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
};

export default config;
