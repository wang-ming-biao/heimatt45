<template>
  <div class="bodyBox">
    <van-nav-bar class="topBar" title="登录" />
    <van-cell-group>
      <van-field v-model="obj.mobile"  placeholder="请输入手机号" >
          <template slot="left-icon">
              <span class="iconfont icon-phone my-icon"></span>
          </template>
      </van-field>
      <van-field v-model="obj.code" clearable  placeholder="请输入验证码" >
                    <template slot="left-icon">
              <span class="iconfont icon-suo my-icon"></span>
          </template>
          <template slot="button">
              <van-button round size="small" color="#ededed" class="codeBtn">获取验证码</van-button>
          </template>
      </van-field>
    </van-cell-group>
    <van-button size="large" class="loginBtn">登录</van-button>
    <div class="clause">
      <a href="#">隐私条款</a>
    </div>
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
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.bodyBox{
  position: relative;
  height: 100%;
  width: 100%;
}
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
.loginBtn{
  background:rgba(109,180,251,1);
border-radius:10px;
color: #fff;
margin: 33px 20px;
width: 88%;
}
.clause{
position: absolute;
bottom: 40px;
width: 100%;
text-align: center;
}
</style>
