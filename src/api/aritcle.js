// 操作所有与文章相关的网络请求
import http from '../utils/http.js'
// 请求频道下的文章数据
function apiGetArticleList ({ channelid, timestamp }) {
  return http({
    url: 'http://ttapi.research.itcast.cn/app/v1_1/articles',
    method: 'get',
    params: {
      channel_id: channelid, // 频道id
      timestamp: timestamp, // 时间戳,请求新的推荐数据传当前的时间戳
      with_top: 0 // 是否包含置顶项,0不包含,1包含
    }
  })
}
// 暴露方法
export {
  apiGetArticleList
}
