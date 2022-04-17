//封装axios
// 实例化 请求拦截器  响应拦截器

import axios from 'axios'
import { token, history } from '@/utils'
import { message } from 'antd'
const http = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000
})
// 请求拦截器
http.interceptors.request.use((config) => {
  if (token.getToken()) {
    config.headers.Authorization = token.getToken()
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

// 添加响应拦截器
http.interceptors.response.use((response) => {
  return response
}, error => {
  const { status } = error.response;
  // 如果状态码是401 说明token过期了
  if (status == 401) {
    message.error('登录过期，请重新登录！')
    token.removeToken()
    history.push('./login')
    // react router并不支持在组件之外使用

  }
  return Promise.reject(error)
})

export { http }