const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    main: path.resolve(__dirname,'src', 'index.js'),
  },
  module: {
    rules: [
      { test: /\.html$/i, loader: 'html-loader'},
      { test: /\.(png|svg|jpg|jpeg|gif)$/i, type: 'asset/resource'},
      { test: /\.mp3$/, type: 'asset/resource'},
      { test: /\.css$/, use: [
                                process.env.NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader, 
                                'css-loader'
                              ] },
      { test: /\.m?js$/, loader: 'babel-loader' },
      { test: /\.(woff|woff2|eot|ttf|otf)$/i, type: 'asset/resource'}
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    assetModuleFilename: 'assets/[hash][ext][query]',
    clean: true
  },
  plugins: [
    new MiniCssExtractPlugin ( {
      filename: '[name].[contenthash].css'
    }),
    new HtmlWebpackPlugin( { filename: 'index.html',
      template: path.resolve(__dirname, 'src', 'index.html'),
      chunks: ['main']
    }),
  ],
  //devtool: "source-map",
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development'
}