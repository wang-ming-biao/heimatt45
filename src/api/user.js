// 负责所有与用户相关的网络请求
import http from '../utils/http.js'

// 定义一个登陆的请求方法,传入一个对象,里面有两个参数
export function apiLogin ({ mobile, code }) {
  // 并将它return出去
  return http({
    url: 'authorizations',
    method: 'post',
    data: {
      mobile: mobile,
      code: code
    }
  })
}
