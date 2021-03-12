const path = require('path');
const webpack = require('webpack');

function buildModule() {
  const rules = [
    {
      test: /\.tsx?/,
      exclude: /node_modules/,
      use: 'babel-loader'
    }
  ];


  return {
    rules
  }
}

const buildPlugins = (options) => {
  const plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
  ];
  

  return options.concat(plugins);
};

module.exports = (options) => ({
  mode: options.mode,
  entry: options.entry,
  output: options.output || {
    filename: '[name].js',
    path: path.join(process.cwd(), "./build")
  },
  module: buildModule(),
  plugins: buildPlugins(options.plugins || []),
  devtool: options.devtool,
  devServer:options.devServer || {}
});