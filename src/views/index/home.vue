<template>
  <div class="bodyBox">
    <van-nav-bar class="topBar" :fixed="true" title="首页" />
    <van-tabs v-model="active">
      <!-- title: 对应的标题 -->
      <van-tab v-for="(item, index) in channelsList" :key="index" :title="item.name">
        <!-- v-model: 用来设置当前下拉刷新组件是否刷新完成 -->
        <!-- onRefresh: 事件,当下拉时会触发这个事件 -->
        <!-- 绑定channelsList遍历出来的每个item里的属性 -->
        <van-pull-refresh v-model="item.isLoading" @refresh="onRefresh">
        <van-list v-model="item.loading" :finished="item.finished" finished-text="没有更多了" @load="onLoad">
          <van-cell class="mycell" v-for="item in item.list" :key="item" :title="item.title" />
        </van-list>
        </van-pull-refresh>
        <!-- 下拉列表 -->
      </van-tab>
    <div class="menus" @click="openChanels">
      <van-icon name="wap-nav" />
    </div>
    </van-tabs>
    <!-- 弹出层 -->
    <van-popup
  v-model="show"
  position="bottom"
  :style="{ height: '90%' }"
/>
  </div>
</template>

<script>
// 导入频道操作方法
import { apiGetChannels } from '../../api/channels.js'
// 导入获取local的方法
import { getLocal } from '../../utils/local.js'
// 导入获取频道新闻推荐方法
import { apiGetArticleList } from '../../api/aritcle.js'
export default {
  data () {
    return {
      // loading: false, // 加载状态
      // finished: false, // 设置文章数据是否已经全部加载完毕
      // list: [], // 数据源
      // isLoading: false, // 下拉刷新的属性
      channelsList: [], // 标签栏列表
      active: 0, // 频道的索引
      show: false // 弹出层的默认选项
    }
  },
  methods: {
    // 当 list 组件被加载时会触发
    async onLoad () {
      // setTimeout(() => {
      //   var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
      //   // 将数组赋值给 list ,要的不是覆盖,而是接收(两个数组的拼接)
      //   this.list = [...this.list, ...arr]
      //   // 添加一个判断,如果数组的长度超过100,就说明数据已经完全加载完毕了
      //   if (this.list.length > 100) {
      //     // list 中的数据源已经加载完毕
      //     this.finished = true
      //   }
      //   // 将loaDing设置为false
      //   this.loading = false
      //   console.log('onLoad')
      // }, 1000)
      // 得到当前频道
      let currentChannle = this.channelsList[this.active]
      // 得到频道的ID
      let id = currentChannle.id
      // 得到当前频道下的文章数据
      let res = await apiGetArticleList({
        channelid: id, // 传入频道id
        timestamp: Date.now() // 传入当前的时间戳
      })
      // 将文章列表数据保存到当前频道下面的list属性中
      currentChannle.list = [...currentChannle.list, ...res.data.data.results]
      if (res.data.data.results.length === 0) {
        // 将 list 的加载完毕状态设置为 true
        currentChannle.finished = true
      }
      // 手动设置 loading 为 false
      currentChannle.loading = false
    },
    // 下拉列表时触发
    onRefresh () {
      // setTimeout(() => {
      //   // 1.将原本的数据源清空
      //   this.list = []
      //   // 3.将 list 组件的完结状态设置为 false
      //   this.finished = false
      //   // 2.下拉加载状态设置为false
      //   this.isLoading = false
      // }, 1000)
      // 得到当前频道数据
      let currentChannle = this.channelsList[this.active]
      // 清除当前频道中的所有的数据
      currentChannle.loading = false
      currentChannle.finished = false
      currentChannle.isLoading = false
      currentChannle.list = []
      // 清空之后重新加载数据
      this.onLoad()
    },
    // 添加额外的属性
    addOtherProp () {
      // 遍历数组
      this.channelsList.forEach(item => {
        // // list 组件的加载状态
        // item.loading = false
        // // list 组件的完毕状态
        // item.finished = false
        // // 下拉组件的下拉状态
        // item.isLoading = false
        // // 每个频道显示的数据源
        // item.list = []
        // 应该通过 $set 添加属性,解决除推荐栏以外不加载问题
        this.$set(item, 'loading', false)
        this.$set(item, 'finished', false)
        this.$set(item, 'isLoading', false)
        this.$set(item, 'list', [])
      })
    },
    // 打开弹出层
    openChanels () {
      this.show = true
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
      this.$toast.fail('请重新登录')
    }
    // 打印一下频道数据
    window.console.log(this.channelsList)
    // 给频道数据添加额外的属性
    this.addOtherProp()
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
  .mycell {
    height: 150px;
  }
}
</style>
