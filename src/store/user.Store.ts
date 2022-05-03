import { makeAutoObservable } from "mobx"
import { http } from '@/utils'
import { AxiosRequestConfig } from "axios"

declare namespace Service {
  interface register {
    code: string | number
    date: object,
    msg: string
  }
}

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
  getAllUser = async () => {
    return http.get('/api/users')
  }

  addUser = (params: object): Promise<Service.register> => {
    return Promise.resolve(http.post('/api/users/register', params))
  }



  deleteUser = async (id: string) => {
    await http.post(`/api/users/delete`, { id: id } as AxiosRequestConfig<any>)
  }
}