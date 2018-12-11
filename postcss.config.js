/* eslint-disable global-require, import/no-extraneous-dependencies */

const paths = require('./config/paths');

module.exports = {
  plugins: [
    require('postcss-import')({
      path: [paths.srcShared],
    }),
    require('postcss-apply')(),
    require('postcss-custom-media')(),
    require('postcss-calc')(),
    require('postcss-flexbugs-fixes')(),
    require('autoprefixer')(),
    require('postcss-assets')({
      basePath: './assets',
    }),
    require('postcss-normalize')(),
  ],
  sourceMap: true,
};
