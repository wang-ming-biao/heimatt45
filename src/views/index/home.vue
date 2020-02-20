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
          <lazy-component>
        <van-list v-model="item.loading" :finished="item.finished" finished-text="没有更多了" @load="onLoad">
          <!-- 一张图片的解构 -->
          <van-cell class="mycell" title="" >
              <!-- 内容的标题 -->
            <template slot="label">
              <div style="display: flex; justify-content: space-between">
                <div class="lefttitle" style="font-weight: 400px; color: #666; font-size: 14px">
                  我只有一张图片
                </div>
                <div class="rightimg">
                <!-- 图片内容 -->
              <van-grid :border="false" :column-num="3">
                <van-grid-item >
                  <van-image style="width: 150px; height: 150px" src="https://img.yzcdn.cn/vant/logo.png" />
                </van-grid-item>
              </van-grid>
                </div>
              </div>
              <!-- 细节内容 -->
              <div class="otherBox">
                <div class="other">
                <span>作者名称</span>
                <span>10条评论</span>
                <span>发布时间</span>
              </div>
              <div class="more">
                <!-- <van-icon name="cross" @click="shouMore(subitem.art_id, subitem.aut_id)" /> -->
                <van-icon name="cross" @click="shouMore()" />
              </div>
              </div>
            </template>
          </van-cell>
          <!-- 三张图片的解构 -->
          <van-cell class="mycell" v-for="(subitem, subindex) in item.list" :key="subindex" >
            <template slot="title">
              <!-- 内容的标题 -->
              <div>{{ subitem.title }}</div>
              <!-- 图片内容 -->
              <van-grid :border="false" :column-num="3">
                <van-grid-item v-for="(imgitem, imgindex) in subitem.cover.images" :key="imgindex">
                  <van-image  :src="imgitem" />
                </van-grid-item>
              </van-grid>
              <div class="otherBox">
                <div class="other">
                <span>{{ subitem.aut_name }}</span>
                <span>{{ subitem.comm_count }} 评论</span>
                <span>{{ subitem.pubdate | timefilter}}</span>
              </div>
              <div class="more">
                <van-icon name="cross" @click="shouMore(subitem.art_id, subitem.aut_id)" />
              </div>
              </div>
            </template>
          </van-cell>
        </van-list>
        </lazy-component>
        </van-pull-refresh>
        <!-- 下拉列表 -->
      </van-tab>
    <div class="menus" @click="openChanels">
      <van-icon name="wap-nav" />
    </div>
    </van-tabs>
    <!-- 弹出框:传入频道列表,频道下标active -->
    <mypop v-model="show" :channelsList="channelsList" :active="active" @update:active="active=$event" />
    <!-- 由于父传子,子传夫都是在操控active,所以通过修改代码进行简化 -->
    <!-- <mypop v-model="show" :channelsList="channelsList" :active.sync="active" /> -->
    <!-- 在父组件绑定cactive事件,双向绑定弹出层与首页的频道变化 -->
    <!-- 更多操作:传值给子组件与接收子组件数据 -->
    <!-- <more :value="moreShow" @input="moreShow=$event" /> -->
    <!-- 由于传入与接收都是操控moreShow属性,所以可以写成下方的简写模式 -->
    <more v-model="moreShow" :autid="autid" :artid="artid" @delArticle="delArticle" @hateUser="hateUser" />
  </div>
</template>

<script>
// 导入频道操作方法
import { apiGetChannels } from '../../api/channels.js'
// 导入获取local的方法
import { getLocal } from '../../utils/local.js'
// 导入获取频道新闻推荐方法
import { apiGetArticleList } from '../../api/aritcle.js'
// 导入频道弹窗的方法
import mypop from './components/mypop'
import more from './components/more'
export default {
  data () {
    return {
      // loading: false, // 加载状态
      // finished: false, // 设置文章数据是否已经全部加载完毕
      // list: [], // 数据源
      // isLoading: false, // 下拉刷新的属性
      channelsList: [], // 标签栏列表
      active: 0, // 频道的默认下标
      show: false, // 频道弹出层的默认值
      moreShow: false, // 控制更多操作选项显示隐藏
      artid: 0, // 当前要操作的id
      autid: 0 // 要拉黑的作者id
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
    },
    // 打开更多选项弹出框
    shouMore (artid, autid) {
      this.moreShow = true
      // 打开 更多 页面时,将文章 ID 传给更多页面
      this.artid = artid
      this.autid = autid
    },
    // 设置不感兴趣的文章
    delArticle (artid) {
      // 得到数据源: 当前选中频道下的List
      let dataSource = this.channelsList[this.active].list
      // 得到不感兴趣的文章 id: this.uk-artid
      window.console.log(dataSource)
      // 根据 id 从dataSource 中删除数据
      dataSource.forEach((item, index) => {
        // 遍历不感兴趣数组,对照频道列表,对应的进行删除
        if (item.art_id === artid) {
          // 删除数据
          dataSource.splice(index, 1)
        }
      })
    },
    // 拉黑作者
    hateUser (autid) {
      // 从当前选中频道下的list中获取到数据源
      let hateSource = this.channelsList[this.active].list
      window.console.log(hateSource)
      // 得到要拉黑的作者id,根据id从hateSource中删除数据
      hateSource.forEach((item, index) => {
        // 遍历拉黑数组,对照频道列表,对应的进行删除
        if (item.aut_id === autid) {
          // 删除数据
          hateSource.splice(item.aut_id, 1)
        }
      })
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
  },
  components: {
    mypop,
    more
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
  .otherBox {
    display:flex;
    justify-content: space-between;
    .more {
      border: 1px solid #ccc;
      height: 15px;
      // width: 20px;
      // text-align: center;
      line-height: 15px;
      color: #ccc;
    }
  }
  .other {
    span {
      font-size: 12px;
      color: #ccc;
      margin-right: 10px;
    }
  }
}
</style>
