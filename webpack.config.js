const path = require('path');
module.exports = {
  entry: './client/src/index.js',
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      },
    ]
  },
  devtool : 'inline-source-map',
  devServer: {
    historyApiFallback: true,
  },
  output: {
    path: path.join(__dirname, 'client/dist'),
    filename: 'bundle.js'
  }
}