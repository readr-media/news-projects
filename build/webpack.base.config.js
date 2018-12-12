const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const TerserPlugin = require('terser-webpack-plugin')

const NODE_ENV = process.env.NODE_ENV || 'development'
const isProd = NODE_ENV === 'production'

const projects = require('../src/constants/projectList.json')
// 'cross-env PROJ_DEVING=Example node server' to exclude src/components/Example/* from noParse
// e.g. 'cross-env PROJ_DEVING=Vote node server' when you are developing within the path src/components/Vote/*
const createNoParse = () => {
  const noParseDefault = /es6-promise\.js$/ // avoid webpack shimming process
  if (isProd || !process.env.PROJ_DEVING) {
    return [ noParseDefault ]
  } else {
    const projNames = Object.values(projects).filter(proj => proj !== process.env.PROJ_DEVING).map(proj => new RegExp(`${proj}/`))
    projNames.push(noParseDefault)
    return projNames
  }
}

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
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          // resolve "SyntaxError: Cannot declare a let variable twice: 'e'." in ios 10 safari
          mangle: {
            safari10: true,
          }
        },
        // Parallelization can speedup your build significantly and is therefore highly recommended.
        parallel: true
      })
    ]
  },
  module: {
    noParse: createNoParse(),
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
