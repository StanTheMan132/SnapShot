const path = require('path');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: __dirname,
  entry: { main: './app/src/index.js' },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: { presets: ['env'] },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: { extensions: ['*', '.js', '.jsx'] },
  output: {
    path: path.resolve(__dirname, 'app/dist/'),
    publicPath: 'app/dist/',
    filename: 'bundle.js',
  },
  devtool: 'inline-source-map',
  devServer: {
    open: true,
    contentBase: path.join(__dirname, 'app/dist'),
    port: 8000
  },
  plugins: [
    new HtmlWebpackPlugin({
      alwaysWriteToDisk: true,
      filename: 'index.html',
      template: './app/index.html',
      inject: true,
    }),
    new HtmlWebpackHarddiskPlugin(),
  ],
};
