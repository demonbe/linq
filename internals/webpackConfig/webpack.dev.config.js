const {
  DEV,
  getEntryModel
} = require('../scripts/utils/webpackUtil');
const webpack = require('webpack');
const CircularDependencyPlugin = require('circular-dependency-plugin');

module.exports = require('./webpack.base.config')({
  entry: getEntryModel(DEV),
  mode: DEV,
  devtool: "source-map",
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CircularDependencyPlugin({
      exclude: /a\.js|node_modules/,
      failOnError: false,
    }),
  ]
});