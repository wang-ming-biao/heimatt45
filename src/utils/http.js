// 导入axios
import axios from 'axios'
// 导入store
import store from '../store/index.js'
// 创建一个axios实例
const instance = axios.create({
  // 设置一个基地址
  baseURL: 'http://ttapi.research.itcast.cn/app/v1_0/'
})
// 设置拦截器
// 请求拦截器
instance.interceptors.request.use(function (config) {
  // 请求拦截器中的 config 的作用是: 它就是所有的请求相关的信息
  // config 就是请求的相关信息 (路径, 方式, 参数 ...)
  // 判断用户是否登录,取出用户信息
  // 1.0 得到用户的 token (vuex中去取)
  let user = store.state.user
  // 2.0判断是否是否存在token
  // 如果存在
  if (user.token) {
    // 将 token 添加到请求头中: 如果设置 token 需要在 token 之前自己手动去拼接 Bearer
    // 在请求头中添加 token
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  return Promise.reject(error)
})
// 响应拦截器
instance.interceptors.response.use(function (response) {
  return response
}, function (error) {
  return Promise.reject(error)
})
// 暴露axios
export default instance
