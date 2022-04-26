import { makeAutoObservable } from "mobx"
import { http } from '@/utils'
import { AxiosRequestConfig } from "axios"

export default class UserStore {

  userInfo: {
    email?: string | undefined;
    id?: string | number | undefined
    identity?: string | undefined
    name?: string | number
    avatar?: string | undefined
  } = {}

  userList = {}
  constructor() {
    makeAutoObservable(this)
  }
  getUserInfo = async () => {
    // 调用接口
    const res = await http.get('/api/users/current')
    this.userInfo = res.data
  }
  getAllUser = async () => {
    // 调用接口
    // const res = await http.get('/api/users')
    return http.get('/api/users')

    // this.userList = res.data
    // return res.data
  }
  addUser = async (params: object) => {
    await http.post('/api/users/register', params)
  }

  deleteUser = async (id: string) => {
    await http.post(`/api/users/delete`, { id: id } as AxiosRequestConfig<any>)
  }
}