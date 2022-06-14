const path = require("path");
const { ModuleFederationPlugin } = require("webpack").container;
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { DefinePlugin } = require("webpack");
const { config } = require("dotenv");
const Dotenv = require("dotenv-webpack");

const configEnv = config({ path: "./.env" }).parsed;

module.exports = {
  entry: path.resolve(__dirname, "src", "index.ts"),
  resolve: {
    extensions: [".tsx", ".ts", ".js", "jsx"],
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
      name: "poll",
      filename: "remoteEntry.js",
      exposes: {
        "./App": "./src/App",
      },
      remotes: {
        profile: `profile@${configEnv.PROFILE_APP_URL}/remoteEntry.js`,
        utils: `utils@${configEnv.UTILS_APP_URL}/remoteEntry.js`,
      },
      shared: {
        react: { singleton: true, requiredVersion: "18.1.0" },
        "react-dom": { singleton: true, requiredVersion: "18.1.0" },
        antd: { singleton: true, requiredVersion: "4.21.1" },
        recoil: { singleton: true, requiredVersion: "0.7.3" },
        axios: { singleton: true, requiredVersion: "0.27.2" },
        "@uiw/react-md-editor": { singleton: true, requiredVersion: "3.14.1" },
        "styled-components": { singleton: true, requiredVersion: "5.3.5" },
        "react-router-dom": { singleton: true, requiredVersion: "6.3.0" },
        "socket.io-client": { singleton: true, requiredVersion: "4.5.1" },
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
};
