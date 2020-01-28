// 用来处理所有与频道相关的网络请求
// 导入 http
import http from '../utils/http.js'

// 得到频道数据
function apiGetChannels () {
  return http({
    // 请求路径
    url: 'user/channels'
    // 请求方式默认是get,所以不用写
  })
}
// 暴露方法
// 传统方式
// export default {
//     apiGetChannels
// }
export { // 按需导出
  apiGetChannels
}
