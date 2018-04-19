'use strict';

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')

module.exports = {
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: [
          'pug-loader?self'
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new UglifyJSPlugin(),
    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          module: 'Instascan',
          entry: 'https://www.paypalobjects.com/api/checkout.js',
          global: 'Instascan'
        }
      ]
    }),
  ]
};
