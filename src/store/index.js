import Vue from 'vue'
import Vuex from 'vuex'
import { setLocal, getLocal } from '../utils/local.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 定义一个用户信息:应该在打开页面时先判断 localostrage 中是否存在数据
    // 如果存在,直接将数据赋值给 user
    // 如果不存在,定义一个空对象
    // user: JSON.parse(window.localStorage.getItem('userInfo')) || {}
    // 使用封装的local方法
    user: getLocal('userInfo') || {}
  },
  mutations: {
    // 添加一个方法: 用来给 user 赋值
    // state指的是上面的 state 对象,
    // payload就是从外界传递过来的参数
    setUser (state, payload) {
      // 1 将数据保存到 vuex 中
      state.user = payload
      // 2 将数据保存到localstorage中
      // window.localStorage.setItem('userInfo', JSON.stringify(payload))
      setLocal('userInfo', payload)
    }
  }
})
