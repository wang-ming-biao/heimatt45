<template>
  <div class="bodyBox">
    <van-nav-bar class="topBar" title="登陆" />
    <van-cell-group>
      <van-field v-model="obj.mobile" left-icon="smile-o" right-icon="warning-o" placeholder="请输入手机号" >
          <template slot="left-icon">
              <span class="iconfont icon-phone my-icon"></span>
          </template>
      </van-field>
      <van-field v-model="obj.code" clearable left-icon="music-o" placeholder="请输入验证码" >
                    <template slot="left-icon">
              <span class="iconfont icon-suo my-icon"></span>
          </template>
          <template slot="button">
              <van-button round size="small" color="#ededed" class="codeBtn">发送验证码</van-button>
          </template>
      </van-field>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  data () {
    return {
      obj: {
        mobile: '', // 手机号码
        code: ''// 验证码
      }
    }
  }
}
</script>

<style lang="less" scoped>
// 导航栏背景色及文字颜色
.bodyBox .topBar {
  background-color: #3296fa;
  .van-nav-bar__title {
    color: #fff
  }
}
.my-icon{
    font-size: 25px;
}
.codeBtn{
  span{
    color: black;
  }
}
</style>
