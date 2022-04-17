// 封装localstorage
// 增删查
class Token {
  key = 'pc-key'

  setToken = (token) => {
    console.log(token);
    return window.localStorage.setItem(this.key, token)
  }
  getToken = () => {
    return window.localStorage.getItem(this.key)
  }
  removeToken = () => {
    return window.localStorage.removeItem(this.key)
  }
}

const token = new Token()

export default token