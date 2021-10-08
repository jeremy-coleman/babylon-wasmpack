var { HotModuleReplacementPlugin } = require("webpack")
var path = require("path")
var HtmlWebpackPlugin = require("html-webpack-plugin")
var ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin")
var WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin")

module.exports = {
  mode: "development",
  output: {
    path: path.join(__dirname, "build"),
  },
  entry: "./src/client/main",
  devtool: "source-map",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json", ".wasm"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              plugins: ["react-refresh/babel", "@babel/plugin-syntax-top-level-await"],
              //plugins: [], //prod
            },
          },
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },
        ],
      }
    ],
  },
  plugins: [
    new ReactRefreshWebpackPlugin(),
    new HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({ template: "src/client/index.html" }),
    new WasmPackPlugin({
      //forceMode: "development",
      forceMode: "release",
      crateDirectory: path.join(__dirname, "src/engine"),
      outDir: "src/pkg",
      watchDirectories: ["src/engine"],
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: "async",
    },
  },
  experiments: {
    asyncWebAssembly: true,
    topLevelAwait: true,
  },
  devServer: {
    hot: true,
  },
}


// "postcss": "8.3.9",
// "css-loader": "6.3.0",
// "postcss-loader": "6.1.1",
// "tailwindcss": "2.2.16",
// "postcss": "8.3.9",
// "style-loader": "3.3.0",
// {
//   test: /\.css$/,
//   use: [
//     "style-loader",
//     {
//       loader: "css-loader",
//       options: {
//         importLoaders: 1,
//         modules: {
//           localIdentName: "[path][name]__[local]",
//           localIdentContext: path.join(__dirname, "src/client"),
//         },
//       },
//     },
//     {
//       loader: "postcss-loader",
//       options: {
//         tailwindcss: {
//           purge: [],
//           theme: {
//             textColor: {
//               primary: "#fff",
//             },
//             extend: {},
//           },
//           variants: {},
//           plugins: [],
//         },
//       },
//     },
//   ],
// }