import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入json-bigint插件
// 导入base
import './style/base.css'
// 导入vant插件
import Vant, { Lazyload, Toast } from 'vant'
import 'vant/lib/index.css'
// 导入 iconfont
import './style/index.css'
// 导入全局过滤器
import './filter/timeFilter'

// // 导入 day.js
// import dayjs from 'dayjs'

// // 导入 dayjs 的插件
// import relativeTime from 'dayjs/plugin/relativeTime'

// // 导入 dayjs 中文语言包
// import 'dayjs/locale/zh-cn'

// // 拓展这个插件
// dayjs.extend(relativeTime)

// // 全局使用 中文语言包
// dayjs.locale('zh-cn')
// 使用 vant , lazyload懒加载
Vue.use(Vant)
// 导入轻提示组件
Vue.use(Toast)
// 导入懒加载组件
Vue.use(Lazyload, {
  lazyComponent: true
})

// // 使用dayjs,得到相对时间
// let time = dayjs().from(dayjs('1995'))
// window.console.log(time)

new Vue({
  router,
  store,
  Vant,
  render: h => h(App)
}).$mount('#app')
