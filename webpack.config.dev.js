require("dotenv").config({ path: ".env" });

import webpack from "webpack";
import ManifestPlugin from "webpack-manifest-plugin";
import path from "path";

export default {
  resolve: {
    modules: ["node_modules", "."],
    extensions: [".js", ".jsx"]
    // extensions: ["*", ".js", ".jsx", ".json"]
  },
  devtool: "cheap-module-source-map",
  entry: [
    // must be first entry to properly set public path
    "./client/webpack-public-path",
    "react-hot-loader/patch",
    "webpack-hot-middleware/client?reload=true",
    "./client/index.js" // Defining path seems necessary for this to work consistently on Windows machines.
  ],
  target: "web", // necessary per https://webpack.github.io/docs/testing.html#compile-and-test
  output: {
    path: path.resolve(__dirname, "dist"), // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: "/",
    filename: "bundle.js"
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development"), // Tells React to build in either dev or prod modes. https://facebook.github.io/react/downloads.html (See bottom)
      __DEV__: true
    }),
    new webpack.EnvironmentPlugin(["API_URL", "GITHUB_CLIENT"]),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new ManifestPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: false,
      debug: true,
      noInfo: true, // set to false to see a list of every file being bundled.
      options: {
        sassLoader: {
          includePaths: [path.resolve(__dirname, "client", "scss")]
        },
        context: "/"
      }
    })
  ],
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, use: ["babel-loader"] },
      { test: /\.eot(\?v=\d+.\d+.\d+)?$/, use: ["file-loader"] },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: "url-loader",
            options: { limit: 10000, mimetype: "application/font-woff" }
          }
        ]
      },
      {
        test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
        use: [
          {
            loader: "url-loader",
            options: { limit: 10000, mimetype: "application/octet-stream" }
          }
        ]
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "url-loader",
            options: { limit: 10000, mimetype: "image/svg+xml" }
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [{ loader: "file-loader", options: { name: "[name].[ext]" } }]
      },
      {
        test: /\.ico$/,
        use: [{ loader: "file-loader", options: { name: "[name].[ext]" } }]
      },
      {
        test: /(\.css|\.scss|\.sass)$/,
        use: [
          "style-loader",
          { loader: "css-loader", options: { sourceMap: true } },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true
            }
          },
          { loader: "sass-loader", options: { sourceMap: true } }
        ]
      }
    ]
  }
};
