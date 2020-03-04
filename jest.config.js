const { defaults } = require('jest-config');

module.exports = {
  collectCoverageFrom: ['src/*.{ts,tsx,js,jsx}', '!node_modules/**'],
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
};
