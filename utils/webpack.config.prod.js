const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const { DefinePlugin } = require("webpack");
const { config } = require("dotenv");

const parsedEnv = config({ path: "./.env" }).parsed;

module.exports = {
  mode: "production",
  entry: path.resolve(__dirname, "src", "index.ts"),
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    fallback: {
      fs: false,
      os: false,
      path: false,
    },
  },
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
    ],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.[contenthash].js",
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "utils",
      filename: "remoteEntry.js",
      exposes: {
        "./axios/instance": "./src/axiosInstance",
        "./notify": "./src/notify",
        "./hooks/socket": "./src/useSocket",
        "./localStorage": "./src/tokenId",
      },
      remotes: {
        authentication: `authentication@${parsedEnv.AUTHENTICATION_APP_URL}/remoteEntry.js`,
      },
      shared: {
        react: { singleton: true, requiredVersion: "18.0.0" },
        "react-dom": { singleton: true, requiredVersion: "18.0.0" },
        antd: { singleton: true, requiredVersion: "4.19.5" },
        axios: { singleton: true, requiredVersion: "0.27.2" },
        "socket.io-client": { singleton: true, requiredVersion: "4.5.1" },
      },
    }),
    new CleanWebpackPlugin(),
    new DefinePlugin({
      "process.env": JSON.stringify(config({ path: "./.env" }).parsed),
    }),
  ],
};