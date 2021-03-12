const path = require('path');
const webpackConfigMap = {
  "production": "prod",
  "development": "dev"
}

const currentEnv = process.env.NODE_ENV || 'production';
const webpackConfigName = `webpack.${webpackConfigMap[currentEnv]}.config.js`;
const webpackConfigPath = path.join(__dirname, webpackConfigName);

const webpackConfig = require(webpackConfigPath);

module.exports = webpackConfig;

