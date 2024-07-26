import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    './src/**/*.ts?(x)',
    '!./src/vite-env.d.ts',
    '!./src/services/interfaces.ts',
  ],
  coverageDirectory: '<rootDir>/reports/coverage',
  coverageProvider: 'v8',
  coverageReporters: [
    [
      'html',
      {
        subdir: 'html',
      },
    ],
  ],
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  roots: ['<rootDir>'],
  setupFiles: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '\\.(gif|ttf|eot|svg|png|jpg)$': '<rootDir>/src/test/__mocks__/fileMock.js',
    '\\.(scss)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};

export default createJestConfig(config);
