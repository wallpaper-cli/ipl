// webpack.config.js
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require('webpack')

module.exports = {
  mode: 'production', // Set to 'production' for minification
  entry: {
    bundle: './index.js', // Entry point of your application
  },
  output: {
    filename: 'bundle.min.cjs', // Name of the output bundle
    path: __dirname + '/dist', // Output directory
    libraryTarget: 'commonjs', // Add this line
  },
  target: 'node',
  optimization: {
    minimizer: [new TerserPlugin()], // Use TerserPlugin for minification
  },
  plugins: [
    new webpack.BannerPlugin({ banner: '#!/usr/bin/env node', raw: true }),
    new CopyPlugin({
      patterns: [
        { from: 'Assets', to: 'Assets' }, // Copy assets folder to the output directory
        { from: 'node_modules/@jimp/plugin-print/fonts', to: 'fonts' }, // Copy assets folder to the output directory
      ],
    }),
  ],
};
