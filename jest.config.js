const { pathsToModuleNameMapper } = require("ts-jest/utils");
const { compilerOptions } = require("./tsconfig");

module.exports = {
  preset: "jest-preset-angular",
  roots: ["<rootDir>/src/"],
  testMatch: ["**/+(*.)+(spec).+(ts)"],
  setupFilesAfterEnv: ["<rootDir>/src/test.ts"],
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/app/**/*.ts',
    '!<rootDir>/src/app/**/index.ts',
    '!<rootDir>/src/app/**/*.module.ts',
    '!<rootDir>/src/app/**/font-awesome-icons.ts',
    '!<rootDir>/src/playground/**',
    '!<rootDir>/src/main.playground.ts'
  ],
  coverageReporters: [
    "html",
    "text-summary",
    "json",
    "lcov",
    "text",
    "clover",
    "cobertura"
  ],
  reporters: ["default", "jest-junit"],

  coverageDirectory: "<rootDir>/coverage",
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths || {}, {
    prefix: "<rootDir>/",
  }),
  moduleNameMapper: {
    '^(.*)/environments/(.*)$': '<rootDir>/src/environments/environment.test.ts',
    '^lodash-es$': '<rootDir>/node_modules/lodash/index.js'
  },
};
