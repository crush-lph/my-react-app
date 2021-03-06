# 创建react应用  

`npx create-react-app my-react-app`

npx create-react-app my-react-app

cd my-react-app

npm start

# 上传git

1、在git上创建一个空仓库
2、在本地执行 `git remote git地址`
3、`git branch -M main` 将master分支更名为main
4、`git add .`
5、`git commit -m 'xxx'`
6、`git push -u origin main`

# react+ts 配置别名

`npm run eject` 抛出配置文件

在config文件夹找到webpack.config.js文件   搜索alias

```js
'@':path:resolve(__dirname,'../src')
```

找到根目录的tsconfig文件  在compilerOptions中配置

```json
"baseUrl":"./",
"paths":{
  "@/*":["src/*"]
}
```

引入项目时就可以更改src路径为@

重启项目

在根目录添加jsconfig.json 文件

```json
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@/*": [
        "src/*"
      ]
    }
  }
}
```

这样编译器就知道我们的别名路径并给予提示

# 前端跨域

1、在package.json 中配置一个proxy:'http://localhost:5001'
2、安装`http-proxy-middleware`
> `npm add http-proxy-middleware`

在 src目录下创建setupProxy.js 输入以下内容

```js
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
```

# token

登录成功后会获得一个token  这个值存在localStorage中  
配置axios 的请求拦截器  在每一次的请求头中添加请求头  authorization  = token
如果token过期之后，会返回401状态码 在响应拦截器中拦截到401状态码的请求，就返回到登录页
另外react 在非组件中不可以调用react router的方法进行路由跳转
就需要安装一个history包
使用history跳转
另外还需要在App中将包裹routes的BrowserRouter替换为HistoryRouter

```jsx
import {Routes, Route, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'
import { createBrowserHistory } from 'history'

const history = createBrowserHistory()

<HistoryRouter history={history}>
  <Routes>
    <Route/>
  </Routes>
</HistoryRouter>
```

```js
//axios中
import { createBrowserHistory } from 'history'
const history = createBrowserHistory()
history.push('/login')
```
