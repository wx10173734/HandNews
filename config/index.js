'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')
const cwd = process.cwd()
function PathResolve (dir) {
  return path.join(__dirname, '..', dir)
  // return path.join(__dirname, dir)
}
module.exports = {
  // 默认 动态生成 目录下的 entries ( src/[name]/ 下含有 app.js 的情况下生成 对应的 [name].js)
  entries: {
    // libs - 库和工具
    // libs:['vue'],
    // vendor - 定制 UI 库和工具
    // vendor:['vue'],
    // vendor: ['webVideoCtrl']
    // 'babel-polyfill': 'babel-polyfill',
    // 'index': './src/page/index.js'
  },
  urls: {
    project: cwd,
    favicon: path.resolve(__dirname, '../public/favicon.ico')
  },
  alias: {
    // 'vue': path.resolve(__dirname, '../src/static/vue.min.js'),
    // 'jquery': PathResolve('../src/static/jquery-vendor.js'),
    // 'zepto': PathResolve('src/static/zepto.min.js'),
    // 'vue$': 'vue/dist/vue.esm.js',
    '@': PathResolve('src')
    // '@page': path.resolve(src, 'page')
    // 'webVideoCtrl': PathResolve('../src/static/webVideoCtrl.js')
  },
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    assetsSrcRoot: path.resolve(__dirname, '../src'),
    proxyTable: {},

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8001, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true,
    // 美化输出信息栏
    webpackDashboard: false
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    // assetsPublicPath: '/',
    assetsPublicPath: '/zwys-excel/',

    /**
     * Source Maps
     */
    cssSourceMap: false,

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
