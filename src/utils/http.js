//封装axios
// 实例化 请求拦截器  响应拦截器

import axios from 'axios'

const http = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000
})
// 请求拦截器
http.interceptors.request.use((config) => {
  return config
}, (error) => {
  return Promise.reject(error)
})

// 添加响应拦截器
http.interceptors.response.use((response) => {
  return response
}, error => {
  return Promise.reject(error)
})

export { http }