/** @type {import('ts-jest').JestConfigWithTsJest} **/


module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // <-- THIS tells Jest what @ means
  },
  moduleDirectories: ['node_modules', '<rootDir>'],
};
