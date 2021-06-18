/**
 * Copyright 2021 Vitagroup AG
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const { pathsToModuleNameMapper } = require('ts-jest/utils')
const { compilerOptions } = require('./tsconfig')

module.exports = {
  preset: 'jest-preset-angular',
  roots: ['<rootDir>/src/'],
  testMatch: ['**/+(*.)+(spec).+(ts)'],
  setupFilesAfterEnv: ['<rootDir>/src/test.ts'],
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/app/**/*.ts',
    '!<rootDir>/src/app/**/index.ts',
    '!<rootDir>/src/app/**/*.module.ts',
    '!<rootDir>/src/app/**/font-awesome-icons.ts',
    '!<rootDir>/src/playground/**',
    '!<rootDir>/src/main.playground.ts',
    '!<rootDir>/src/test.ts',
    '!<rootDir>/src/**/*.harness.ts',
  ],
  coverageReporters: ['html', 'text-summary', 'json', 'lcov', 'text', 'clover', 'cobertura'],
  reporters: ['default', 'jest-junit'],

  coverageDirectory: '<rootDir>/coverage',
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths || {}, {
      prefix: '<rootDir>/',
    }),
    '^(.*)/environments/(.*)$': '<rootDir>/src/environments/environment.test.ts',
    '^lodash-es$': '<rootDir>/node_modules/lodash/index.js',
  },
}
