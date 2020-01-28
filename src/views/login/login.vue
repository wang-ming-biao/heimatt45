<template>
  <div class="bodyBox">
    <van-nav-bar class="topBar" title="登录" />
    <van-cell-group>
      <van-field v-model="obj.mobile" :error-message="format.mobile"  placeholder="请输入手机号" >
          <template slot="left-icon">
              <span class="iconfont icon-phone my-icon"></span>
          </template>
      </van-field>
      <van-field v-model="obj.code" clearable :error-message="format.code"  placeholder="请输入验证码" >
                    <template slot="left-icon">
              <span class="iconfont icon-suo my-icon"></span>
          </template>
          <template slot="button">
              <van-button round size="small" color="#ededed" class="codeBtn">获取验证码</van-button>
          </template>
      </van-field>
    </van-cell-group>
    <van-button size="large" :loading="loginLoading" class="loginBtn" @click="login">登录</van-button>
    <div class="clause">
      <a href="#">隐私条款</a>
    </div>
  </div>
</template>

<script>
// 导入封装好的axios
import { apiLogin } from '../../api/user'
export default {
  data () {
    return {
      obj: {
        mobile: '', // 手机号码
        code: ''// 验证码
      },
      format: {
        mobile: '', // 手机号验证提示
        code: '' // 验证码提示
      },
      loginLoading: false
    }
  },
  methods: {
    // 登陆按钮点击事件
    login () {
      if (this.formatfn()) {
        return
      }
      // axios({
      //   url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
      //   method: 'post',
      //   data: this.obj
      // }).then(res => {
      //   window.console.log(res)
      //   // window.localStorage.setItem('token', JSON.stringify(res.data.data))
      //   // window.console.log(window.localStorage.getItem('token'))
      //   // 接收服务器返回的token
      //   let userInfo = res.data.data
      //   window.console.log(userInfo)
      // })
      // 点击登录按钮,加载动画显示
      this.loginLoading = 'true'
      setTimeout(async () => {
        try {
        // 使用导入的axios组件,将api传入
          let res = await apiLogin(this.obj)
          // 将登陆成功后的信息保存到 localstorage 中
          // userInfo包含token & reftoken
          window.localStorage.setItem('userInfo', res.data.data)
          // 将数据保存到 vuex 中,调用store中封装的setUser方法
          this.$store.commit('setUser', res.data.data)
          this.$router.push('/home')
        } catch {
          // 失败的提示
          this.$toast.fail('登录失败')
        }
        // 加载完毕之后再将加载状态改为 false
        this.loginLoading = false
      }, 2000)
    },
    formatfn () {
      // 创建一个合法验证的数组,使用includes方法检测数组中是否包含false
      var isPass = []
      // 使用trim方法去除空格.防止用户输入空格导致的误判
      if (this.obj.mobile.trim().length !== 11) {
        this.format.mobile = '请输入正确的手机号'
        // 若不合法,则在数组中添加一个false
        isPass.push(false)
      } else {
        // 若输入框不为空
        this.format.mobile = ''
        // 若合法,则在数组中添加一个true
        isPass.push(true)
      }
      // 若输入框为空,提示用户
      if (this.obj.code.trim().length !== 6) {
        this.format.code = '请输入正确的验证码'
        // 若不合法,则在数组中添加一个false
        isPass.push(false)
      } else {
        // 若输入框不为空
        this.format.code = ''// 不为空则不显示提示
        // 若合法,则在数组中添加一个true
        isPass.push(true)
      }
      // 检查数组是否包含false
      return isPass.includes(false)
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
