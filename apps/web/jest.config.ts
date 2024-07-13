import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  collectCoverageFrom: ['**/*.{js,jsx,ts,tsx}', '!**/*.d.ts', '!**/node_modules/**'],
  detectOpenHandles: true,
  forceExit: true,
  logHeapUsage: true,
  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/tests/mocks/styleMock.js',
    '^.+\\.(jpg|jpeg|png|gif|webp|avif|svg)$': '<rootDir>/tests/mocks/fileMock.js',
    '^@/app/(.*)$': '<rootDir>/src/app/$1',
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@/styles/(.*)$': '<rootDir>/src/styles/$1',
    '^@/lib/(.*)$': '<rootDir>/src/lib/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/*.test.(ts|tsx)'],
  testPathIgnorePatterns: ['./.next/', './node_modules/'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  transformIgnorePatterns: ['/node_modules/(?!(uuid|@hookform/resolvers))'],
};

export default config;
