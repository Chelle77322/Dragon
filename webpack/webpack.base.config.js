import { merge }  from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
//import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import NodePolyfillPlugin from"node-polyfill-webpack-plugin";
import  VueLoaderPlugin from 'vue-loader/lib/plugin';

import path from 'path';
import { fileURLToPath } from 'url';
import  webpack from 'webpack';
import autoprefixer from "autoprefixer";
import { DefinePlugin } from 'webpack';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log('directory-name', __dirname);


let webpackBaseConfig = () => {
  return merge([
    {
      //target: "node",
      externals:{
        "fs": "commonjs fs",
        "net": "commonjs net",
        //"express": "express",
    },
      mode: 'production',
      performance: {
        hints: false,
        maxEntrypointSize: 8980000,
        maxAssetSize: 8980000
    },
      module: {
        mode: 'production',
    rules: [
          
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
            }
          },
          {
          test: /\.jsx$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
            }
          },
          {
            test: /\.module\.(sa|sc|c)ss$/,
            use: [
              {
              loader:'style-loader',
            
              },
              {
                loader: 'css-loader',
               
              },
              'sass-loader'
            ]
          },
          {
            test: /\.s?css$/,
            use: [
              "style-loader",
              MiniCssExtractPlugin.loader,
              "css-loader",
              {
                loader: "postcss-loader",
                options: {
                  plugins: () => [autoprefixer()],
                },
              },
              "sass-loader",
            ],
          },
        {
          test: /\.(eot|ttf|woff|woff2)(\?\S*)?$/,
          loader: "file-loader",
          options: {
            name: "[name][contenthash:8].[ext]",
          },
        },
        {
          test: /\.(png|jpe?g|gif|webm|mp4|svg)$/,
          loader: "file-loader",
          options: {
            outputPath: "assets",
            esModule: false,
          },
        },
  
          {
            test: /\.(jpg|png)$/,
            use: {
              loader: 'url-loader',
            },
          },
          {
            test: /\.vue$/,
            loader: "vue-loader",
          },
        ],
      },
   
     
      plugins: [
        new HtmlWebpackPlugin({
          template: './public/index.html',
          filename: 'index.html'
        }),
        new webpack.DefinePlugin({
          'process.platform': JSON.stringify(process.platform),
          'process.env.NODE_ENV': JSON.stringify('production'),
        }),
        new VueLoaderPlugin(),
       
        new NodePolyfillPlugin(),
        new MiniCssExtractPlugin({

          
        }),
        new DefinePlugin({
          __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false), // or true if you need this flag in prod
         
        }),
      ],
      devServer: {
        historyApiFallback: true,
        
          static: {
            directory: path.join(__dirname, 'dist'),
              
            }
        },
        resolve: {
          alias: {
            vue$: "vue/dist/vue.runtime.esm.js",
          },
          extensions: ["*", ".js", ".vue", ".json"],
        },
    
    
    
  }]);
    };
   export default webpackBaseConfig();