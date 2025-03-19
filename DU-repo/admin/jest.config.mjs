import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './'
});

/** @type {import('jest').Config} */
const config = {
  testEnvironment: 'jest-environment-jsdom',
  // "testEnvironment": "jsdom",
  verbose: false,
  testTimeout: 30000,
  testMatch: ['**/__tests__/**/*.test.[jt]s?(x)', '**/*.test.[jt]s?(x)'],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 80,
      statements: 0
    }
  },
  coverageReporters: ['html', 'lcov', 'cobertura', 'text-summary', 'text'],
  globalSetup: './jest-global-setup.js',
  setupFilesAfterEnv: ['./jest.setup.js'],
  moduleDirectories: ['node_modules'],
  moduleNameMapper: {
    '^next/dynamic$': '<rootDir>/__tests__/__mocks__/next/dynamicMock.tsx',
    '\\.(css)$': '<rootDir>/__tests__/__mocks__/style-mock.js',
    '@cerberus/styled-system/css':
      '<rootDir>/__tests__/__mocks__/cerberus/styled-system/css-mock.js',
    '@cerberus/styled-system/recipes':
      '<rootDir>/__tests__/__mocks__/cerberus/styled-system/recipes-mock.js',
    '@cerberus/styled-system/patterns':
      '<rootDir>/__tests__/__mocks__/cerberus/styled-system/patterns-mock.js',
    '@cerberus/styled-system/jsx':
      '<rootDir>/__tests__/__mocks__/cerberus/styled-system/jsx-mock.js',
    '@cerberus/icons': '<rootDir>/__tests__/__mocks__/cerberus/iconsMock.tsx',
    '@cerberus/styled-system/jsx':
      '<rootDir>/__tests__/__mocks__/cerberus/styled-system/jsx-mock.js',

    '^@/(.*)$': '<rootDir>/src/$1'
  },
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname'
  ],
  reporters: [
    'default',
    ['<rootDir>/__tests__/reporters/slow-test-reporter', { numTests: 10 }],
    ['<rootDir>/__tests__/reporters/SlowestTestFilesReporter', { numFiles: 5 }]
  ]
};

export default createJestConfig(config);
