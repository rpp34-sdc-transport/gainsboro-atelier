const path = require('path');
module.exports = {
  entry: './client/src/index.js',
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  devtool : 'inline-source-map',
  output: {
    path: path.join(__dirname, 'client/dist'),
    filename: 'bundle.js'
  }
}