// npm add mobx mobx-react-lite
import { makeAutoObservable } from 'mobx'
import { http } from '@/utils'


class LoginStore {
  token = ''
  constructor() {
    // 响应式
    makeAutoObservable(this)
  }
  login = async ({ username, password }) => {
    // 调用登录接口
    const res = await http.post('api/users/login', { email: username, password })
    console.log(res);
    // 存入token
    this.token = res.data
  }
}


export default LoginStore