import React from 'react'
import LoginStore from './login.Store'
import UserStore from './user.Store'
class RootStore {
  constructor() {
    this.LoginStore = new LoginStore()
    this.UserStore = new UserStore()
    //...
  }
}

const rootStore = new RootStore()
const context = React.createContext(rootStore)
const useStore = () => React.useContext(context)

export { useStore }