<template>
  <div class="bodyBox">
    <van-nav-bar @click-left="ret" left-arrow class="topBar" :fixed="true" title="搜索结果" />
    <van-cell-group>
      <van-cell title="我是文章标题" >
        <template slot="label">
          <van-grid :border="false" :column-num="3">
            <van-grid-item>
              <van-image src="https://img.yzcdn.cn/vant/apple-1.jpg" />
            </van-grid-item>
            <van-grid-item>
              <van-image src="https://img.yzcdn.cn/vant/apple-2.jpg" />
            </van-grid-item>
            <van-grid-item>
              <van-image src="https://img.yzcdn.cn/vant/apple-3.jpg" />
            </van-grid-item>
          </van-grid>
          <div class="msgbox">
            <span>作者</span>
            <span>评论数</span>
            <span>发布日期</span>
        </div>
        <van-grid :column-num="3">
          <van-grid-item icon-size="20px" icon="comment-o" text="评论" />
          <van-grid-item icon="like-o" text="点赞" />
          <van-grid-item icon="peer-pay" text="分享" />
        </van-grid>
        </template>
      </van-cell>
</van-cell-group>
  </div>
</template>

<script>
export default {
  data () {
    return {
      input: ''
    }
  },
  methods: {
    // 顶部左箭头点击事件
    ret () {
      // 回退到上一个路由中
      this.$router.back()
    }
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
  .van-nav-bar .van-icon {
    color: #fff;
  }
  /deep/ .van-grid-item__content {
    flex-direction: row;
    // 修改图标的大小
    i {
      font-size: 16px;
      margin-right: 6px
    }
    // 去除文字顶端的外边距,使得文字与图标对齐
    span {
      margin-top: 0px;
    }
  }
  // 文章更多详情间距
  .msgbox {
    span {
      margin-right: 10px;
    }
  }
}
</style>
