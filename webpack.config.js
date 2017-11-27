var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ],
  entry: './src/app.js',
  output: {
    path: __dirname + '/dist/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader'},
          {
            loader: 'css-loader',
            options: {
              modules: true
            },
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader'},
          { loader: 'css-loader'},
          { loader: 'sass-loader'}
        ]
      }
    ]
  }
};
