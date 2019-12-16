'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const BaseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder') // 端口查看工具包
// const Visualizer = require('webpack-visualizer-plugin')
// 模块分析
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

var ansiColors = {
  red: '#00FF00' // note the lack of "#"
}
var overlayStyles = {
  color: '#FF0000' // note the inclusion of "#" (these options would be the equivalent of div.style[option] = value)
}
// add hot-reload related code to entry chunks
// https://github.com/webpack-contrib/webpack-hot-middleware
Object.keys(BaseWebpackConfig.entry).forEach(function (name) {
  // BaseWebpackConfig.entry[name] = ['webpack-hot-middleware/client?noInfo=true&reload=true', BaseWebpackConfig.entry[name]]
  BaseWebpackConfig.entry[name] = [`webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true&ansiColors=${encodeURIComponent(JSON.stringify(ansiColors))}&overlayStyles=${encodeURIComponent(JSON.stringify(overlayStyles))}`, BaseWebpackConfig.entry[name]]
})

const DevWebpackConfig = merge(BaseWebpackConfig, {
  // module: {
  //   rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  // },
  mode: 'development',
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  // devServer: {
  //   clientLogLevel: 'warning',
  //   historyApiFallback: {
  //     rewrites: [
  //       { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
  //     ],
  //   },
  //   hot: true,
  //   contentBase: false, // since we use CopyWebpackPlugin.
  //   compress: true,
  //   host: HOST || config.dev.host,
  //   port: PORT || config.dev.port,
  //   open: config.dev.autoOpenBrowser,
  //   overlay: config.dev.errorOverlay
  //     ? { warnings: false, errors: true }
  //     : false,
  //   publicPath: config.dev.assetsPublicPath,
  //   proxy: config.dev.proxyTable,
  //   quiet: true, // necessary for FriendlyErrorsPlugin
  //   watchOptions: {
  //     poll: config.dev.poll,
  //   }
  // },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../dist'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
    // 模块可视化统计
    // new Visualizer({
    //   filename: '../page/state.html'
    // }),
    // 模块可视化统计
    // new BundleAnalyzerPlugin({
    //   analyzerPort: 8889
    // })
  ]
})

module.exports = DevWebpackConfig

// module.exports = new Promise((resolve, reject) => {
//   portfinder.basePort = process.env.PORT || config.dev.port
//   portfinder.getPort((err, port) => {
//     if (err) {
//       reject(err)
//     } else {
//       // publish the new Port, necessary for e2e tests
//       process.env.PORT = port
//       // add port to devServer config
//       DevWebpackConfig.devServer.port = port

//       // Add FriendlyErrorsPlugin
//       DevWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
//         compilationSuccessInfo: {
//           messages: [`Your application is running here: http://${DevWebpackConfig.devServer.host}:${port}`],
//         },
//         onErrors: config.dev.notifyOnErrors
//         ? utils.createNotifierCallback()
//         : undefined
//       }))

//       resolve(DevWebpackConfig)
//     }
//   })
// })
