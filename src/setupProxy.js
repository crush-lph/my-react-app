// const proxy = require('http-proxy-middleware')
const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  // /api 表示代理路径
  // target 表示目标服务器的地址
  app.use(
    // proxy('/api', {
    createProxyMiddleware("/api", {
      // http://localhost:4000/ 地址只是示例，实际地址以项目为准
      target: 'http://localhost:5001',
      // 跨域时一般都设置该值 为 true
      changeOrigin: true,
      // 重写接口路由
      // pathRewrite: {
      //   '^/api': '' // 这样处理后，最终得到的接口路径为： http://localhost:8080/xxx
      // }
    })
  )
}
