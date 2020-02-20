<template>
  <div>
      <!-- 用来渲染子组件 -->
      <router-view></router-view>
      <!-- tabBar 解构 -->
      <van-tabbar v-model="active">
  <van-tabbar-item icon="home-o" to="/home">主页</van-tabbar-item>
  <van-tabbar-item icon="search" to="/Answer">搜索</van-tabbar-item>
  <van-tabbar-item icon="play-circle-o" to="/playMV">视频</van-tabbar-item>
  <van-tabbar-item icon="friends-o" to="/my">我的</van-tabbar-item>
</van-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style>

</style>
