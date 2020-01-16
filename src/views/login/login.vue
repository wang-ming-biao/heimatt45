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
    <van-button size="large" class="loginBtn" @click="login">登录</van-button>
    <div class="clause">
      <a href="#">隐私条款</a>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
import axios from 'axios'
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
    login () {
      if (this.obj.mobile.length !== 11) {
        Toast('请输入11位数的手机号')
        return false
      }
      if (this.obj.code.length !== 6) {
        Toast('请输入6位数的验证码')
        return false
      }
      axios({
        url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
        method: 'post',
        data: {
          mobile: this.obj.mobile,
          code: this.obj.code
        }
      }).then(res => {
        window.localStorage.setItem('token', JSON.stringify(res.data.data))
        window.console.log(window.localStorage.getItem('token'))
      })
    }
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
