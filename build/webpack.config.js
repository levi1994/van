var webpack = require('webpack');

var conf = {
  devtool: '#source-map',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: './dist'
  },
  module: {
    loaders:[{
      test: /.\js$/,
      loader: 'babel!eslint'
    }]
  }
  // plugins: [
  //   new webpack.optimize.UglifyJsPlugin()
  // ]
}

module.exports = conf;
