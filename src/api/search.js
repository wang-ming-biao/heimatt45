// 用来处理所有与搜索相关的网络请求
import http from '../utils/http'

// 封装一个获取联想结果的方法
function apiGetThink (key) {
  return http({
    url: `suggestion?q=${key}`
  })
}

// 暴露方法
export {
  apiGetThink
}
