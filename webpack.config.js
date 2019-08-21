
const path = require("path");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

module.exports =  {
  mode: 'production',
  entry: {
    bundle: './src/index.ts',
    test: './test/Syml.spec.ts'
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({ minimize: true })
  ],
  optimization: {
      minimizer: [
          new UglifyJsPlugin(),
      ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public')
  }
};