export default {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    './src/**/*.ts?(x)',
    '!./src/main.tsx',
    '!./src/app.tsx',
    '!./src/vite-env.d.ts',
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
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  roots: ['<rootDir>'],
  moduleNameMapper: {
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__mocks__/fileMock.js',
    '\\.(scss)$': 'identity-obj-proxy',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@assets/(.*)$': '<rootDir>/src/assets/$1',
    '^@services/(.*)$': '<rootDir>/src/services/$1',
  },
};
