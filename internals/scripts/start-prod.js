const webpack = require('webpack');
const webpackConfig = require('../webpackConfig');
const deleteFolder = require('./utils/deleteFolder');
deleteFolder(webpackConfig.output.path);
webpack(webpackConfig, function (err, stats) {
  if (err) {
    throw err;
  }

  const info = stats.toJson();
  if (stats.hasErrors()) {
    console.log('================ 来自 build.js 的提示：打包失败，错误如下 ================');
    console.log(info.errors);
    process.exit(1);
  }
});