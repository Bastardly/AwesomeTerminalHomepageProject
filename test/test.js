// set env variable to the `tsconfig.json` path before loading mocha (default: './tsconfig.json')
process.env.TS_NODE_PROJECT = './tsconfig.json'

// Optional: set env variable to enable `tsconfig-paths` integration
process.env.TS_CONFIG_PATHS = true;

// register mocha wrapper
require('ts-mocha');
const Mocha = require('mocha');

const mocha = new Mocha();
mocha.run((failures) => {
  process.on('exit', () => {
    process.exit(failures); // exit with non-zero status if there were failures
  });
});

