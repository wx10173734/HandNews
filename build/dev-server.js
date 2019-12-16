/**
 * 本地 开发 环境
 */
require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var open = require('open')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
var webpackConfig = require('./webpack.dev.conf')
// var DashboardPlugin = require('webpack-dashboard/plugin')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser

var app = express()
var compiler = webpack(webpackConfig)

// if (config.dev.webpackDashboard) {
//   compiler.apply(new DashboardPlugin())
// }

// proxy api requests
// 导入proxy
// var ApiProxy = require('http-proxy-middleware')
// context可以是单个字符串，也可以是多个字符串数组，分别对应你需要代理的api,星号（*）表示匹配当前路径下面的所有api
// const ApiProxyContext = [`/lihuaiot01/*`]
// options可选的配置参数请自行看readme.md文档，通常只需要配置target，也就是你的api所属的域名。
// const ApiProxyOptions = {
//   target: 'http://58.216.233.174:17200',
//   changeOrigin: true
// }
// app.use(ApiProxyContext, ApiProxy(ApiProxyOptions))

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

const devMiddleware = webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
})

const hotMiddleware = webpackHotMiddleware(compiler)
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({
      action: 'reload'
    })
    cb()
  })
})

app.use(devMiddleware)
app.use(hotMiddleware)

module.exports = app.listen(port, (err) => {
  if (err) {
    console.log(err)
    return
  }
  // var uri = 'http://localhost:' + port + '/disk/'+config.server.fileName;
  var uri = `http://localhost:${port}`
  console.log('Listening at ' + uri + '\n')

  // when env is testing, don't need open it
  // if (process.env.NODE_ENV !== 'testing') {
  //   open(uri)
  // }
  if (autoOpenBrowser) {
    open(uri)
  }
})
