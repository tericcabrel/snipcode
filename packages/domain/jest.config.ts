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
  coverageDirectory: 'coverage',
  collectCoverage: false, // When set to true, coverage is performed even if coverage flag isn't provided
  collectCoverageFrom: ['src/**/*.ts', '!src/index.ts'],
  coverageThreshold: {
    global: {
      branches: 40,
      functions: 60,
      lines: 60,
      statements: 60,
    },
  },
  coverageReporters: ['json', 'lcov', 'text', 'text-summary'],
};

export default config;
