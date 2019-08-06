module.exports = {
    "roots": [
      "<rootDir>/src"
    ],
    "transform": {
      "^.+\\.tsx?$": "ts-jest"
    },
    "cacheDirectory": "/.JestCache/",
    "moduleNameMapper": {
      "src": "<rootDir>/src",
    },

    // Setup Enzyme
    "snapshotSerializers": ["enzyme-to-json/serializer"],
    "setupFilesAfterEnv": ["./setupEnzyme.ts"],
  }