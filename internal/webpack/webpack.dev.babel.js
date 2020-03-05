const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default;
const styledComponentsTransformer = createStyledComponentsTransformer();
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');

module.exports = require('./webpack.base.babel')({
  mode: 'development',
  watch: true,
  // Add hot reloading in development
  entry: [
    require.resolve('react-app-polyfill/ie11'),
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
    path.join(__dirname, '../../src/app.ts'),
  ],
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    new ErrorOverlayPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(__dirname, '../../src/index.html'),
    }),
    new CircularDependencyPlugin({
      exclude: /a\.js|node_modules/,
      failOnError: false, // show a warning when there is a circular dependency
    }),
  ],

  tsLoaders: [
    // Babel also have typescript transpiler. Uncomment this if you prefer and comment-out ts-loader
    // { loader: 'babel-loader' },
    {
      loader: 'ts-loader',
      options: {
        transpileOnly: true,
        logLevel: 'info',
        getCustomTransformers: () => ({
          before: [styledComponentsTransformer],
        }),
      },
    },
  ],
  devtool: 'cheap-module-source-map',
  performance: {
    hints: false,
  },
});
