const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const { DefinePlugin } = require("webpack");
const { config } = require("dotenv");
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: path.resolve(__dirname, "src", "index.ts"),
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    fallback: {
      fs: false,
      os: false,
      path: false,
    },
  },
  mode: "production",
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
        test: /bootstrap\.jsx$/,
        use: [
          {
            loader: "bundle-loader",
          },
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-react"],
            },
          },
        ],
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
  plugins: [
    new ModuleFederationPlugin({
      name: "authentication",
      filename: "remoteEntry.js",
      exposes: {
        "./App": "./src/App",
        "./recoil/user": "./src/recoil/atom/user",
      },
      shared: {
        react: { singleton: true, requiredVersion: "18.1.0" },
        antd: { singleton: true, requiredVersion: "4.21.1" },
        "react-dom": { singleton: true, requiredVersion: "18.1.0" },
        recoil: { singleton: true, requiredVersion: "0.7.3" },
        "styled-components": { singleton: true, requiredVersion: "5.3.5" },
        "react-router-dom": { singleton: true, requiredVersion: "6.3.0" },
      },
    }),
    new CleanWebpackPlugin(),
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, "public", "index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
      chunkFilename: "[id].css",
    }),
    new DefinePlugin({
      "process.env": JSON.stringify(config({ path: "./.env" }).parsed),
    }),
    new Dotenv({
      systemvars: true,
    }),
  ],
  stats: "errors-only",
  optimization: {
    minimize: true,
    sideEffects: false,
  },
};
