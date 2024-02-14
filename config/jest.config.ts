import type { Config } from "@jest/types";
import { type JestConfigWithTsJest , pathsToModuleNameMapper } from "ts-jest";
import { resolve } from "path";

import { compilerOptions } from "./tsconfig.tests.json";

const ignorePatterns = [
  "<rootDir>/.git",
  "<rootDir>/build",
  "<rootDir>/config",
  "<rootDir>/coverage",
  "<rootDir>/dist",
  "<rootDir>/node_modules",
];

const baseConfig: Config.InitialProjectOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  rootDir: resolve(__dirname, ".."),
  setupFiles: ["<rootDir>/config/jest.setup.ts"],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  collectCoverageFrom: ["<rootDir>/**/*.ts"],
  coveragePathIgnorePatterns: ignorePatterns,
  testPathIgnorePatterns: ignorePatterns,
  watchPathIgnorePatterns: ignorePatterns,
};

const projects: Config.InitialProjectOptions[] = [
  {
    ...baseConfig,
    displayName: { name: "Source", color: "cyan" },
    testMatch: ["<rootDir>/src/**/*.test.ts"],
    collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
  },
  {
    ...baseConfig,
    displayName: { name: "Scripts", color: "yellow" },
    testMatch: ["<rootDir>/scripts/**/*.test.ts"],
    collectCoverageFrom: ["<rootDir>/scripts/**/*.ts"],
  },
  {
    ...baseConfig,
    displayName: { name: "Tools", color: "magenta" },
    testMatch: ["<rootDir>/**/*.test.ts"],
    testPathIgnorePatterns: ["<rootDir>/src", "<rootDir>/scripts"],
    collectCoverageFrom: ["<rootDir>/**/*.ts"],
  },
];

const config: JestConfigWithTsJest = {
  ...baseConfig,
  projects,
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/config/tsconfig.tests.json",
    },
  },
  collectCoverage: true,
  verbose: true,
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname",
  ],
};

export default config;
