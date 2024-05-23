import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  clearMocks: true,
  collectCoverage: false,
  // When set to true, coverage is performed even if coverage flag isn't provided
  collectCoverageFrom: ['src/**/*.ts', '!src/index.ts'],
  coverageDirectory: 'coverage',
  coverageReporters: ['json', 'lcov', 'text', 'text-summary'],
  coverageThreshold: {
    global: {
      branches: 40,
      functions: 60,
      lines: 60,
      statements: 60,
    },
  },
  maxWorkers: 1,
  preset: 'ts-jest',
  roots: ['.'],
  snapshotFormat: {
    printBasicPrototype: false,
  },
  testEnvironment: 'node',
  testMatch: ['**/?(*.)+(spec|test).[jt]s'],
  testPathIgnorePatterns: ['dist'],
};

export default config;
