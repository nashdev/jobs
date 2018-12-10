const webpack = require("webpack");
const WriteFileWebpackPlugin = require("write-file-webpack-plugin");
const baseConfig = require("./client.base");

const config = {
  ...baseConfig,
  plugins: [
    ...baseConfig.plugins,
    new WriteFileWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  mode: "development",
  devtool: "cheap-module-inline-source-map",
  performance: {
    hints: false,
  },
};

module.exports = config;
