import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  collectCoverageFrom: ['**/*.{js,jsx,ts,tsx}', '!**/*.d.ts', '!**/node_modules/**'],
  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
    '^.+\\.(jpg|jpeg|png|gif|webp|avif|svg)$': '<rootDir>/__mocks__/fileMock.js',
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/containers/(.*)$': '<rootDir>/src/containers/$1',
    '^@/graphql/(.*)$': '<rootDir>/src/graphql/$1',
    '^@/hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@/services/(.*)$': '<rootDir>/src/services/$1',
    '^@/styles/(.*)$': '<rootDir>/src/styles/$1',
    '^@/typings/(.*)$': '<rootDir>/src/typings/$1',
    '^@/utils/(.*)$': '<rootDir>/src/utils/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/__tests__/setup/jest.setup.ts'],
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/__tests__/ui/**/*.(ts|tsx)'],
  testPathIgnorePatterns: ['./.next/', './node_modules/'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
};

export default config;
