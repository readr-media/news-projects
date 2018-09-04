const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

const NODE_ENV = process.env.NODE_ENV || 'development'
const isProd = NODE_ENV === 'production'

module.exports = {
  mode: NODE_ENV,
  cache: !isProd,
  devtool: isProd
    ? false
    : '#cheap-module-source-map',
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: isProd ? '/dist/' : '/dist/',
    filename: '[name].[chunkhash].js'
  },
  resolve: {
    alias: {
      'proj-assets': path.resolve(__dirname, '../proj-assets'),
      'src': path.resolve(__dirname, '../src'),
      'components': path.resolve(__dirname, '../src/components'),
      'api': path.resolve(__dirname, '../api')
    }
  },
  module: {
    // noParse: /es6-promise\.js$/, // avoid webpack shimming process
    noParse: [
      /es6-promise\.js$/, // avoid webpack shimming process
      /Chenuen/,
      /Dollclaw/,
      /Farmhouse/,
      /ForeignLabour/,
      /Marathon/,
      /Newtype/,
      /PresidentPromise/,
      /Rent/,
    ],
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            preserveWhitespace: false
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
        // exclude: /node_modules\/(?!(dom7|swiper)\/).*/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.css$/,
        oneOf: [
          {
            use: [
              'vue-style-loader',
              {
                loader: 'css-loader',
                options: { minimize: isProd }
              },
              'postcss-loader'
            ]
          }
        ]
      },
      {
        test: /\.styl(us)?$/,
        oneOf: [
          {
            use: [
              'vue-style-loader',
              {
                loader: 'css-loader',
                options: { minimize: isProd }
              },
              'postcss-loader',
              'stylus-loader'
            ]
          }
        ]
      },
    ]
  },
  performance: {
    maxEntrypointSize: 300000,
    hints: isProd ? 'warning' : false
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'common.[chunkhash].css'
    }),
    ... isProd ? [] : [ new FriendlyErrorsPlugin() ]
  ]
}
