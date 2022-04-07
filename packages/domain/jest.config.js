module.exports = {
  roots: ['.'],
  preset: 'ts-jest',
  testMatch: ['**/?(*.)+(spec|test).[jt]s'],
  testEnvironment: 'node',
  clearMocks: true,
  maxWorkers: 1,
  snapshotFormat: {
    "printBasicPrototype": false
  },
  globalSetup: './tests/setup/global-setup.ts',
  setupFilesAfterEnv: ['./tests/setup/test-setup.ts'],
};
