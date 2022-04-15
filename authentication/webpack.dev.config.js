const path = require("path");
const { ModuleFederationPlugin } = require("webpack").container;
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const deps = require('./package.json').dependencies
const sharedReduced = ["react", "react-dom", "antd"].reduce((shared, pkg) => {
  Object.assign(shared, {
    [pkg]: {
      singleton: true,
      eager: true,
      requiredVersion: deps[pkg],
    },
  });
  return shared;
}, {});

module.exports = {
  entry: path.resolve(__dirname, "src", "index.tsx"),
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "babel-loader",
          },
          {
            loader: "react-svg-loader",
            options: {
              jsx: true,
            },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: "css-loader?url=false" },
          { loader: "sass-loader", options: { sourceMap: true } },
        ],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|)$/,
        type: "asset/inline",
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.[contenthash].js",
  },
  devServer: {
    port: 3001,
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    devMiddleware: {
      index: "index.html",
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "authentication",
      filename: "remoteEntry.js",
      exposes: {
        "./App": "./src/App",
      },
      shared: { react: { singleton: true }, 'react-dom': { singleton: true } },
    }),
    new CleanWebpackPlugin(),
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, "public", "index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
      chunkFilename: "[id].css",
    }),
  ],
  stats: "errors-only",
};
