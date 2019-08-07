const babelConfig = require('./babel.config.js');
require("@babel/register")(babelConfig);
require("core-js/stable");
require("regenerator-runtime/runtime");

module.exports = {
    verbose: true,
    clearMocks: true,
    name: "Awesome Terminal Homepage",
    roots: [
      "<rootDir>/src"
    ],
    moduleFileExtensions: ['js', 'ts', 'tsx'],

    // collectCoverage: true,
    collectCoverageFrom: [
      "**/*.{js,ts,tsx}",
      "!**/node_modules/**",
      "!**/.BabelCache/**",
      "!**/dist/**"
    ],

    // Setup Enzyme
    snapshotSerializers: ["enzyme-to-json/serializer"],
    setupFilesAfterEnv: ["./setupEnzyme.ts"],
  }