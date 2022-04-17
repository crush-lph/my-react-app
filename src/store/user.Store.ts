import { makeAutoObservable } from "mobx"
import { http } from '@/utils'

export default class UserStore {

  userInfo: {
    email?: string | undefined;
    id?: string | number | undefined
    identity?: string | undefined
    name?: string | number
    avatar?: string | undefined
  } = {}
  constructor() {
    makeAutoObservable(this)
  }
  getUserInfo = async () => {
    // 调用接口
    const res = await http.get('/api/users/current')
    this.userInfo = res.data
  }
}