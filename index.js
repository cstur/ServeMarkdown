'use strict';

const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 6006;
const src = env === 'production' ? './build/app' : './src/app';

require('babel-polyfill');
if (env === 'development') {
  require('babel-register');
}

const app = require(src).default;
app.listen(port);