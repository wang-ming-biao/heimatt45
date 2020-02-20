<template>
  <div>
    <!-- 头部搜索框 -->
      <form action="/">
      <!-- @input事件,双向绑定数据 -->
        <van-search @input="thinkmore" v-model="value" show-action background="#5292fe" placeholder="请输入搜索关键词" @search="onSearch">
          <template slot="action">
            <!-- 将原本的cancel方法改为click触发取消事件 -->
            <span  @click="onCancel" class="mycancle">取消</span>
          </template>
        </van-search>
      </form>
      <!-- 联想区域,加入判断,使得联想区域与搜索历史区域只显示其中一个-->
      <van-cell-group v-if="thinks.length > 0">
        <van-cell title="联想区域" />
        <!-- 点击联想选项,调用搜索框的onsearch方法 -->
        <van-cell icon="search" @click="onSearch(item.item)" v-for="(item, index) in thinks" :key="index"  >
          <!-- 使用插槽解析替换后的联想结果,是关键字变色 -->
          <template slot="title">
            <div v-html="item.newitem"></div>
          </template>
        </van-cell>
      </van-cell-group>
      <!-- 搜索区域 当联想区域为空时显示-->
      <van-cell-group v-else>
        <van-cell title="搜索历史">
          <template slot="default">
            <!-- 点击垃圾箱标识,显示确认弹窗 -->
            <van-icon @click="show = true" name="delete" />
          </template>
        </van-cell>
        <van-cell icon="search" @click="onSearch(item)" v-for="(item, index) in searchList" :key="index" :title="item">
          <template slot="default">
            <!-- 点击XX删除搜索历史,加上stop阻止事件冒泡 -->
            <van-icon @click.stop="delSearch(item)" name="cross" />
          </template>
        </van-cell>
      </van-cell-group>
      <!-- 确认是否清空搜索历史弹框 ,用户点击确定后触发delAll事件-->
      <van-dialog v-model="show" title="确定要清空搜索历史吗?" @confirm="delAll" show-cancel-button />
  </div>
</template>

<script>
import { apiGetThink } from '../../api/search'
import { setLocal, getLocal } from '../../utils/local'
export default {
  data () {
    return {
      value: '', // 搜索框的值
      thinks: [], // 联想词
      timer: null, // 定义一个全局时间,默认为null
      // 保存所有的搜索历史数据
      searchList: getLocal('history') || [], // 将本地保存的数据给予搜索数组
      show: false // 清空历史数据确认框
    }
  },
  methods: {
    // 事件在点击键盘上的搜索/回车按钮后触发，
    // key 指的就是输入框中的内容
    // 点击联想选项也可触发该方法
    onSearch (key) {
      // 1.0 跳转到搜索结果页面
      // 2.0 并且携带上要搜索的关键字
      // 问题:需要将参数放到路由中传入到页面中
      //     传参方式: 传入 /searchResult?key=xxx, 接收: this.$route.query.key
      //     新的方式: 动态路由(也是用来传参)
      //     定义动态路由: 设置路由时,{ path: '/searchResult/:key', component: SearchResult}
      //     注意点: key之前的冒号, 不是说要在路径中添加一个冒号,而是说这个 key 是一个参数,将来需要使用一个参数来接收
      //     传参: this.$router.push('/searchResult/hello')
      //     接收: this.$route.params.key ===> hello
      this.$router.push(`/searchResult/${key}`) // 插入要传递的 key 值
      // 在跳转页面的同时,将关键字保存进数组中
      this.searchList.unshift(key)
      // 使用 set 去除重复的数据
      // 将原本的数组进行去重,再将其解构,然后赋值给新的数组
      this.searchList = [...new Set(this.searchList)]
      // 将获取到的数据保存到本地
      setLocal('history', this.searchList)
    },
    // 事件在点击搜索框右侧取消按钮时触发
    onCancel () {
      // 清空搜索框内的关键字
      this.value = ''
      // 清空联想结果数组
      this.thinks = []
    },
    // 输入框联想事件
    thinkmore () {
      // 添加一个防抖逻辑
      // 清除定时器
      clearTimeout(this.timer)
      // 设置定时器
      this.timer = setTimeout(async () => {
        // 0判断: 判断关键字是否为空,如果为空后续代码不执行
        if (this.value.trim().length <= 0) {
          this.thinks = [] // 将联想数组清空
          return // 后续代码不执行
        }
        // 1.0 得到当前输入框中的内容, value
        // 2.0 要讲 value 作为关键字,去服务器中得到联想的内容
        let res = await apiGetThink(this.value)
        // 3.0将得到的数据保存起来,并渲染到页面上
        this.thinks = res.data.data.options
        // 4.0 将联想结果中的关键字使用<span color="red">关键字</ span>替换
        // 使用 map 遍历联想结果数组
        this.thinks = this.thinks.map(item => {
          // 使用 replace 方法进行替换,并把结果返回给新的 thinks 数组
          return {
            // 页面上再通过 v-html 解析span标签
            // 由于设置了关键字高亮,如果搜索跳转搜索结果页会出错,所以返回的结果要设置成一个对象
            item: item, // 用来发送给服务器进行联想
            // 用于渲染页面
            newitem: item.replace(this.value, `<span style="color: red">${this.value}</span>`)
          }
        })
      }, 400)
    },
    // 删除历史记录
    delSearch (key) {
      // 将当前点击的搜索历史从搜索数据源中删除
      this.searchList.forEach((item, index) => {
        // 遍历历史数据数组,跟当前点击的搜索历史进行对比
        if (item === key) {
          // 如果数组中的数据与被点击的搜索历史对的上
          this.searchList.splice(index, 1)
          // 就使用splice方法进行删除
        }
      })
      // 随后再将删除完数据的数组重新存储到本地
      setLocal('history', this.searchList)
    },
    // 清空所有历史数据
    delAll () {
      // 先将搜索历史数组清空
      this.searchList = []
      // 再将清空后的数组存储到本地
      setLocal('history', this.searchList)
    }
  }
}
</script>

<style lang="less" scoped >
.mycancle {
  color: #fff;
}
.van-search__action:active {
    background-color: #5292fe;
}
</style>
