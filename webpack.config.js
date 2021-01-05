const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

const HtmlWebpackConfig = new HtmlWebpackPlugin({
  template: path.resolve(__dirname, "src/index.html"),
  filename: "index.html",
});

module.exports = {
  entry: path.resolve(__dirname, "src/index.js"),

  devServer: {
    contentBase: path.join(__dirname, "build"),
    // historyApiFallback: true,
    hot: true,
    open: true,
    // publicPath: "/",
  },

  devtool: "source-map",
  mode: "production",

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|jpg)$/,
        type: "asset/resource",
      },
    ],
  },

  plugins: [HtmlWebpackConfig],

  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
  },

  resolve: {
    extensions: [".js", ".jsx"],
  },
};
