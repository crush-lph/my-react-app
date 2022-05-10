// npm add mobx mobx-react-lite
import { makeAutoObservable } from 'mobx'
import { http, token } from '@/utils'
import { message } from 'antd'


class LoginStore {
  token = token.getToken() || ''
  constructor() {
    // 响应式
    makeAutoObservable(this)
  }
  login = async ({ username, password }) => {
    // 调用登录接口
    const res = await http.post('api/users/login', { email: username, password })
    // 存入token
    if(res.data.code==1){
      message.error(res.data.msg)
      return 
    }
    message.success('登录成功')
    this.token = res.data.token
    // 存localStorage
    // console.log(res);
    token.setToken(this.token)
  }
  logOut = () => {
    this.token = ''
    token.removeToken()
  }
}


export default LoginStore