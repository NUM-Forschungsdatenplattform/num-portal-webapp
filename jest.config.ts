import type { Config } from 'jest'
import { pathsToModuleNameMapper } from 'ts-jest'
import { compilerOptions } from './tsconfig.json'

const config: Config = {
  transformIgnorePatterns: ['node_modules/(?!@ngrx|(?!deck.gl)|ng-dynamic)'],
  preset: 'jest-preset-angular',
  roots: ['<rootDir>/src/'],
  modulePaths: ['<rootDir>'],
  moduleDirectories: ['node_modules'],
  testMatch: ['**/+(*.)+(spec).+(ts)'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTest.ts'],
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/app/**/*.ts',
    '!<rootDir>/src/app/**/index.ts',
    '!<rootDir>/src/app/**/*.module.ts',
    '!<rootDir>/src/app/**/font-awesome-icons.ts',
    '!<rootDir>/src/playground/**',
    '!<rootDir>/src/main.playground.ts',
    '!<rootDir>/src/setupTest.ts',
    '!<rootDir>/src/**/*.harness.ts',
    '!<rootDir>/src/custom-test-resolver.js',
  ],
  coverageReporters: ['html', 'text-summary', 'json', 'lcov', 'text', 'clover', 'cobertura'],
  reporters: ['default', ['jest-junit', { outputDirectory: '<rootDir>/reports/junit' }]],
  testResultsProcessor: 'jest-sonar-reporter',
  coverageDirectory: '<rootDir>/reports/coverage',
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions['paths'] || {}, {
      prefix: '<rootDir>/',
    }),
    '^(.*)/environments/(.*)$': '<rootDir>/src/environments/environment.test.ts',
    '^lodash-es$': '<rootDir>/node_modules/lodash/index.js',
  },
  // This custom resolver is only for handling problems with Jest v28 and can be removed with Jest v29
  resolver: '<rootDir>/src/custom-test-resolver.js',
}

export default config
