module.exports = function (api) {
  api.cache(true);

  const isDevelopment = process.env.NODE_ENV === 'development' ? true : false;

  const presets = [
    ["@babel/preset-env", {
      "useBuiltIns": "usage",
      "corejs": "3",
      "modules": false,
      "targets": "defaults",
      "debug": isDevelopment && false
    }],
    "@babel/preset-typescript"
  ];

  const plugins = [
    "@babel/plugin-transform-runtime",
    ["@babel/plugin-transform-arrow-functions", {
      "spec": true
    }],
    ["@babel/plugin-proposal-decorators", {
      legacy: true
    }],
    ["@babel/plugin-proposal-class-properties", {
      "loose": true
    }]
  ];

  return {
    presets,
    plugins
  };
}