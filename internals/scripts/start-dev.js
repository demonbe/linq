const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('../webpackConfig');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const deleteFolder = require('./utils/deleteFolder');
const pkg = require(path.join(process.cwd(), 'package.json'));
const chalk = require('chalk');
const express = require('express');
const app = express();

console.error(webpackConfig)

deleteFolder(webpackConfig.output.path);

const compiler = webpack(webpackConfig);

const devInstance = webpackDevMiddleware(compiler, {
  stats: {
    colors: true,
    children: false,
  },
  writeToDisk: true
});

app.use(devInstance);
app.use(webpackHotMiddleware(compiler, {
  reload: true,
  path: '/__webpack_hmr'
}));

app.listen(pkg.development.port, () => {
  console.log('----------------------------------------------')
  console.log(chalk.green(`server is listening at ${pkg.development.port}`))
  console.log('----------------------------------------------')
});