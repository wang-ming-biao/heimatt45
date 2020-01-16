import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入vant插件
import Vant from 'vant'
import 'vant/lib/index.css'
// 导入 iconfont
import './style/index.css'

Vue.config.productionTip = false
Vue.use(Vant)

new Vue({
  router,
  store,
  Vant,
  render: h => h(App)
}).$mount('#app')
