const path = require('path')
const glob = require('glob')

const HtmlPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')
const PurifyCssPlugin = require('purifycss-webpack')

// 设置公共的路径
var publicPath = {
  path: 'http://localhost:9000/'
};

module.exports = {
  entry: {
    app: './src/js/index.js',
    jquery: 'jquery'
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './js/[name]-bundle.js',
    publicPath: publicPath.path
  },

  // 追查bug
  devtool: "source-map",

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                // css 追查需要在options里面加上sourceMap: true
                sourceMap: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                sourceMap: true,
                plugins: [
                  require('autoprefixer')
                ]
              }
            }
          ]
        })
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        use: [{
          loader: "url-loader",
          options: {
            // 多少K内就会被设置成base64格式
            limit: 2000,
            // 设置图片打包在哪里的路径
            outputPath: 'font/'
          }
        }]
      },
      {
        test: /\.(jpg|jpeg|png|gif)$/,
        use: [{
          loader: "url-loader",
          options: {
            // 多少K内就会被设置成base64格式
            limit: 2000,
            // 设置图片打包在哪里的路径
            outputPath: 'img/'
          }
        }]
      },
      {
        test: /\.(htm|html)$/,
        // 解决标签img直接引入图片的问题
        use: [
          {
            loader: 'html-loader',
            options: {
              attrs: ['img:src', 'img:data-src']
            }
          }
        ]
      },
      {
        test: /\.styl$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: "css-loader"
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: [
                  require('autoprefixer')()
                ]
              }
            },
            {
              loader: "stylus-loader"
            }
          ]
        })
      },
      {
        // 转换es6语法
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader"
          }
        ],
        exclude: /node_modules/
      }
    ]
  },

  plugins: [

    new webpack.ProvidePlugin({
      $: 'jquery'
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'jquery',
      filename: 'js/jquery.js',
      minChunks: 2
    }),

    // 设置html模版
    new HtmlPlugin({
      hash: true,
      template: './src/index.html'
    }),

    // 分离css样式
    new ExtractTextPlugin('css/[name].css'),

    // 去除无用的css
    new PurifyCssPlugin({
      // 全局查找src下面的.html
      paths: glob.sync(path.join(__dirname, 'src/*.html'))
    })
  ],

  devServer: {
    // 路径可以在这设置也可以在output设置publicPath:路径为/
    // contentBase: path.resolve(__dirname, 'dist'),
    port: 9000,
    open: true,
    compress: true
  }
}