const path = require('path');
const PROD = 'production';
const DEV = 'development';
const babelPolyfill = '@babel/polyfill';
const pkg = require(path.join(process.cwd(), 'package.json'));

function getEntryModel(env) {
  if (!env) {
    env = PROD;
  }

  const entryModel = [babelPolyfill];

  const entryPath = path.join(process.cwd(), 'src/index.ts');

  entryModel.push(entryPath);

  if (env === DEV) {
    entryModel.unshift(`webpack-hot-middleware/client?path=http://127.0.0.1:${pkg.development.port}/__webpack_hmr`)
  }

  return {
    "index": entryModel
  };
}

module.exports = {
  PROD,
  DEV,
  getEntryModel,
}