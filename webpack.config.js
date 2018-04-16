const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: [
    './server/frontend/index'
  ],
  module: {
    rules: [
      { test: /\.js?$/, use: ['babel-loader'], exclude: /node_modules/ },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.(gif|png|jpe?g|svg)$/i, use: ['file-loader', 'image-webpack-loader',] },
    ]
  },
  resolve: {
    extensions: ['.js', '.css']
  },
  output: {
    path: __dirname + '/server/static/build',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devtool: 'cheap-eval-source-map',
  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
    hot: true,
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
};
