const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");

const { DefinePlugin } = require("webpack");

// require("dotenv").config({ path: "./.env" });

module.exports = {
  entry: path.join(__dirname, "src", "index.js"),
  devServer: {
    historyApiFallback: true,
    compress: true,
    hot: true,
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
    publicPath: "/",
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        resolve: {
          extensions: [".js", ".jsx"],
        },
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
      },
      {
        test: /\.(sass|css|scss)$/,
        use: [
          'style-loader',
          'css-loader',
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: ["file-loader"],
      },
      {
        test: /\.svg$/,
        issuer: {
          and: [/\.(tsx|jsx|scss)?$/],
        },

        use: ["@svgr/webpack", "svg-url-loader"],
      },
    ],
  },
  plugins: [
    // removes build folders and unused assets
    new DefinePlugin({
      "process.env": JSON.stringify(process.env),
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public/index.html"),
    }),
  ],
};
