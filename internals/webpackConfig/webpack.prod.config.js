const {
  PROD,
  getEntryModel
} = require('../scripts/utils/webpackUtil');

module.exports = require('./webpack.base.config')({
  entry: getEntryModel(PROD),
  mode: PROD
});