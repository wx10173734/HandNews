'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 自动 alias
const ProjectAlias = utils.mapAlias(config.dev.assetsSrcRoot) // app.js 目录名别
const CustomizedAlias = config.alias || []
const AllAlias = Object.assign({}, ProjectAlias, CustomizedAlias)

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
  test: /\.(js|vue|ts)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

console.log('目前模式：' + process.env.NODE_ENV)

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: resolve('src/main.js')
  },
  output: {
    path: config.build.assetsRoot,
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].chunk.js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    // 自动补全文件后缀名,意味着require模块的时候可以省略不写后缀名。
    extensions: ['.js', '.vue', '.json', '.css', '.scss', 'less', '.jsx', '.ts'],
    // alias: {
    //   'vue$': 'vue/dist/vue.esm.js',
    //   '@': resolve('src'),
    // }
    alias: AllAlias
  },
  module: {
    rules: [
      ...utils.styleLoaders({
        sourceMap: process.env.NODE_ENV === 'production'
          ? config.build.cssSourceMap
          : config.dev.cssSourceMap,
        usePostCSS: true,
        // hotReload: true, // 是否热加载css
        hotReload: process.env.NODE_ENV === 'development',
        extract: true // 是否分离CSS
        // 开发模式不分离，mini-css-extract-plugin不支持HMR，或者添加css-hot-loader来支持
        // extract: process.env.NODE_ENV === 'production'
      }),
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.js[x]?$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      // {
      //   test: /\.ts[x]?$/,
      //   loader: 'ts-loader',
      //   exclude: /node_modules/,
      //   options: {
      //     appendTsSuffixTo: [/\.vue$/]
      //   }
      // },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        include: [resolve('src/page/index/icons')], // include => 只处理指定的文件夹下的文件
        options: {
          symbolId: 'icon-[name]'
        }
      },
      // {
      //   test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      //   loader: 'url-loader',
      //   exclude: [resolve('src/page/index/icons')], // exclude => 不处理指定的文件夹下的文件
      //   options: {
      //     limit: 10000,
      //     name: utils.assetsPath('img/[name].[hash:7].[ext]')
      //   }
      // },
      {
        test: /\.(gif|png|jpe?g)$/i, // 这里排出svg格式，因为会与svg-sprite-loader冲突
        use: [
          {
            loader: 'url-loader',
            options: { // 这里的options选项参数可以定义多大的图片转换为base64
              name: '[name].[ext]',
              limit: 10000, // 表示小于50kb的图片转为base64,大于50kb的是路径
              outputPath: 'images' // 定义输出的图片文件夹
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              disable: true, // webpack@2.x and newer
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              gifsicle: {
                interlaced: false
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75
              }
            }
          }
        ]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: resolve('public/index.html'),
      inject: true,
      favicon: resolve('public/favicon.ico'),
      title: 'vue-element-admin'
    }),
    new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css'),
      chunkFilename: utils.assetsPath('css/[id].[contenthash].css')
    })
  ],
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
