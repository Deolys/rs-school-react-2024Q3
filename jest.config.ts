export default {
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
