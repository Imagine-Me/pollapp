const { ModuleFederationPlugin } = require("webpack").container;
const { DefinePlugin } = require("webpack");
const { config } = require("dotenv");

const path = require("path");

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "src", "index.ts"),
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    fallback: {
      fs: false,
      os: false,
      path: false,
    },
  },
  devServer: {
    port: 3000,
  },
  output: {
    publicPath: "auto",
    clean: true,
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
        authentication: "authentication@http://localhost:3002/remoteEntry.js",
      },
      shared: {
        react: { singleton: true, requiredVersion: "18.0.0" },
        "react-dom": { singleton: true, requiredVersion: "18.0.0" },
        antd: { singleton: true, requiredVersion: "4.19.5" },
        axios: { singleton: true, requiredVersion: "0.27.2" },
        "socket.io-client": { singleton: true, requiredVersion: "4.5.1" },
      },
    }),
    new DefinePlugin({
      "process.env": JSON.stringify(config({ path: "./.env" }).parsed),
    }),
  ],
};
