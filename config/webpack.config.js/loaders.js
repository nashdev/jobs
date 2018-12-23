const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const babelLoader = {
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  loader: "babel-loader",
};

const cssLoaderClient = {
  test: /\.css$/,
  exclude: /node_modules/,
  use: [
    "css-hot-loader",
    MiniCssExtractPlugin.loader,
    {
      loader: "css-loader",
      options: {
        camelCase: true,
        modules: true,
        importLoaders: 1,
        sourceMap: true,
        localIdentName: "[name]__[local]--[hash:base64:5]",
      },
    },
    {
      loader: "postcss-loader",
      options: {
        sourceMap: true,
      },
    },
  ],
};

const cssLoaderServer = {
  test: /\.css$/,
  exclude: /node_modules/,
  use: [
    {
      loader: "css-loader",
      options: {
        exportOnlyLocals: true,
        camelCase: true,
        importLoaders: 1,
        modules: true,
        localIdentName: "[name]__[local]--[hash:base64:5]",
      },
    },
    {
      loader: "postcss-loader",
      options: {
        sourceMap: true,
      },
    },
  ],
};

const urlLoaderClient = {
  test: /\.(png|jpe?g|gif|svg)$/,
  loader: require.resolve("url-loader"),
  options: {
    limit: 2048,
    name: "[name].[hash:8].[ext]",
  },
};

const urlLoaderServer = {
  ...urlLoaderClient,
  options: {
    ...urlLoaderClient.options,
    emitFile: false,
  },
};

const fileLoaderClient = {
  exclude: [/\.(js|css|mjs|html|json|ejs)$/],
  use: [
    {
      loader: "file-loader",
      options: {
        name: "[name].[hash:8].[ext]",
      },
    },
  ],
};

const fileLoaderServer = {
  exclude: [/\.(js|css|mjs|html|json|ejs)$/],
  use: [
    {
      loader: "file-loader",
      options: {
        name: "[name].[hash:8].[ext]",
        emitFile: false,
      },
    },
  ],
};

const svgLoaderClient = {
  test: /\.svg$/,
  loader: "svg-inline-loader",
};

const svgLoaderServer = {
  ...svgLoaderClient,
  options: {
    emitFile: false,
  },
};

// Write css files from node_modules to its own vendor.css file
const externalCssLoaderClient = {
  test: /\.css$/,
  include: /node_modules/,
  use: [MiniCssExtractPlugin.loader, "css-loader"],
};

// Server build needs a loader to handle external .css files
const externalCssLoaderServer = {
  test: /\.css$/,
  include: /node_modules/,
  loader: "css-loader",
  options: {
    exportOnlyLocals: true,
  },
};

const client = [
  {
    oneOf: [
      babelLoader,
      cssLoaderClient,
      urlLoaderClient,
      fileLoaderClient,
      svgLoaderClient,
      externalCssLoaderClient,
    ],
  },
];
const server = [
  {
    oneOf: [
      babelLoader,
      cssLoaderServer,
      urlLoaderServer,
      fileLoaderServer,
      svgLoaderServer,
      externalCssLoaderServer,
    ],
  },
];

module.exports = {
  client,
  server,
};
