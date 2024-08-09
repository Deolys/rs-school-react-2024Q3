export default {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    './app/**/*.ts?(x)',
    '!./app/vite-env.d.ts',
    '!./app/services/interfaces.ts',
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
  setupFiles: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '\\.(gif|ttf|eot|svg|png|jpg)$': '<rootDir>/app/test/__mocks__/fileMock.js',
    '\\.(scss|scss\\?url)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/app/$1',
  },
};
