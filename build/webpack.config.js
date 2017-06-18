var webpack = require('webpack');

var conf = {
  devtool: '#source-map',
  entry: './src/index.js',
  output: {
    filename: 'van.js',
    path: './dist'
  },
  module: {
    loaders:[{
      test: /.\js$/,
      loader: 'babel!eslint'
    }]
  }
}

module.exports = conf;
