import {merge}  from 'webpack-merge';
import TerserPlugin from 'terser-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import webpackBaseConfig from './webpack.base.config.js';
import webpack from "webpack";
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log('directory-name', __dirname)

let productionConfig = () => {
  return merge([
    {
      entry: path.join(__dirname, "src", "App.vue"),
      output: {
        path: path.join(__dirname, "dist"),
        filename: 'index.js',
        publicPath: "./",
        libraryTarget: "commonjs2"
      },
      debug: true,
      devtool: 'source-map',
      performance: {
        hints: process.env.NODE_ENV === 'production' ? "warning" : false
      },
      optimization: {
        minimize: true,
        runtimeChunk: 'single',
        minimizer: [new TerserPlugin()],
      },
      plugins: [

        new MiniCssExtractPlugin(),
        new OptimizeCssAssetsPlugin(),
        new webpack.DefinePlugin({
          isDevelopment: false,
          'process.env': {
            NODE_ENV: JSON.stringify('production'),
          },
        }),
        new CompressionPlugin(),
      ],
    },
  ]);
};
export default productionConfig = () => merge(webpackBaseConfig(), productionConfig());
