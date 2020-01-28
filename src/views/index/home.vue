<template>
  <div class="bodyBox">
    <van-nav-bar class="topBar" :fixed="true" title="首页" />
    <van-tabs>
      <!-- title: 对应的标题 -->
      <van-tab v-for="(item, index) in channelsList" :key="index" :title="item.name">
        <!-- v-model: 用来设置当前下拉刷新组件是否刷新完成 -->
        <!-- onRefresh: 事件,当下拉时会触发这个事件 -->
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <van-cell v-for="item in list" :key="item" :title="item" />
        </van-list>
        </van-pull-refresh>
        <!-- 下拉列表 -->
      </van-tab>
    <div class="menus">
      <van-icon name="wap-nav" />
    </div>
    </van-tabs>
  </div>
</template>

<script>
// 导入频道操作方法
import { apiGetChannels } from '../../api/channels.js'
// 导入获取local的方法
import { getLocal } from '../../utils/local.js'
export default {
  data () {
    return {
      loading: false, // 加载状态
      finished: false, // 设置文章数据是否已经全部加载完毕
      list: [], // 数据源
      isLoading: false, // 下拉刷新的属性
      channelsList: [] // 标签栏列表
    }
  },
  methods: {
    // 当 list 组件被加载时会触发
    onLoad () {
      setTimeout(() => {
        var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
        // 将数组赋值给 list ,要的不是覆盖,而是接收(两个数组的拼接)
        this.list = [...this.list, ...arr]
        // 添加一个判断,如果数组的长度超过100,就说明数据已经完全加载完毕了
        if (this.list.length > 100) {
          // list 中的数据源已经加载完毕
          this.finished = true
        }
        // 将loaDing设置为false
        this.loading = false
        console.log('onLoad')
      }, 1000)
    },
    // 下拉列表时触发
    onRefresh () {
      setTimeout(() => {
        // 1.将原本的数据源清空
        this.list = []
        // 3.将 list 组件的完结状态设置为 false
        this.finished = false
        // 2.下拉加载状态设置为false
        this.isLoading = false
      }, 1000)
    }
  },
  // 打开页面时得到频道数据
  async created () {
    // 判断用户是否登录: 得到用户信息
    let user = this.$store.state.user
    try {
      // 判断用户是否登录
      if (user.token) {
        // 得到频道数据
        let res = await apiGetChannels()
        // 保存数据
        this.channelsList = res.data.data.channels
      } else {
        // 说明没有登录,判断是否存在 localstorage
        // 从 localstorage 中得到频道数据
        let channels = getLocal('channels')
        // 判断频道数据是否存在
        if (channels) { // 存在频道数据
          // 赋值给 channels
          this.channelsList = channels
        } else { // 不存在频道数据
          // 直接从频道数据中获取
          // 得到频道数据
          let res = await apiGetChannels()
          // 保存数据
          this.channelsList = res.data.data.channels
        }
      }
    } catch {
      this.$toast.fail('出错啦')
    }
    // 
  }
}
</script>

<style lang="less" scoped>
.bodyBox {
  position: relative;
  // 导航栏背景色及文字颜色
  margin-bottom: 50px;
  margin-top: 90px;
  .topBar {
    background-color: #3296fa;
    .van-nav-bar__title {
      color: #fff;
    }
  }
  // 深度选择器,在选择器无法作用到标签上时使用
  /deep/ .van-tabs__wrap {
    position: fixed;
    top: 46px;
    left: 0px;
    // 设置层级,使得teb栏不被list栏遮挡
    z-index: 10;
    width: 90%;
  }
  .menus {
    position: fixed;
    top: 46px;
    right: 0;
    width: 10%;
    line-height: 44px;
    text-align: center;
  }
}
</style>
