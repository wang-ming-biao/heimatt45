import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入login组件
const login = () => import('../views/login/login.vue')
// 导入home组件
const home = () => import('../views/index/home.vue')
// 导入导航栏路由
const layout = () => import('../views/layout/index.vue')
// 导入 我的 路由
const my = () => import('../views/my/my.vue')
// 导入 问答 路由
const Answer = () => import('../views/Answer/Answer.vue')
// 导入 视频 路由
const playMV = () => import('../views/playMV/playMV.vue')
// 导入搜索结果页
const SearchResult = () => import('../views/Answer/search/searchResult.vue')

Vue.use(VueRouter)

const routes = [
  // 进行重定向
  {
    path: '/',
    redirect: '/home'
  },
  // 添加登录的路由
  {
    path: '/login',
    name: 'login',
    component: login
  },
  // 添加导航栏
  {
    path: '/layout',
    name: 'layout',
    component: layout,
    children: [
      // 添加子路由; 首页
      {
        path: '/home', name: 'home', component: home
      },
      // 添加子路由: 我的
      {
        path: '/my', name: 'my', component: my
      },
      // 添加子路由: 问答
      {
        path: '/Answer', name: 'Answer', component: Answer
      },
      // 添加子路由: 视频
      {
        path: '/playMV', name: 'playMV', component: playMV
      }
    ]
  },
  // 添加搜索结果页面
  // 在路径后面加上要传入的值,设置动态路由 /:key
  {
    path: '/searchResult/:key', name: 'searchResult', component: SearchResult
  }
]

const router = new VueRouter({
  routes
})

export default router
