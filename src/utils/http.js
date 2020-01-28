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
  // 判断用户是否登录,取出用户信息
  let user = store.state.user
  // 判断是否是否存在token
  if (user.token) {
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
