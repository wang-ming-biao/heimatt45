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
// 得到所有频道数据
function apiGetAllChannel () {
  return http({
    // 请求路径
    url: 'channels'
  })
}
// 批量重置用户频道
function apiSetChannel (channels) {
  return http({
    url: 'user/channels',
    method: 'put',
    data: {
      channels: channels
    }
  })
}
// 暴露方法
// 传统方式
// export default {
//     apiGetChannels
// }
export { // 按需导出
  apiGetChannels,
  apiGetAllChannel,
  apiSetChannel
}
