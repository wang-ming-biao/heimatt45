<template>
<div>
    <van-dialog v-model="value" :showConfirmButton="false" >
  <van-cell >
    <template>
      <van-icon name="cross" @click="$emit('input', false)" />
    </template>
  </van-cell>
  <van-cell @click="dislike" title="不感兴趣" icon="manager-o"></van-cell>
  <van-cell @click="showMore" title="反馈垃圾内容" icon="manager-o" is-link></van-cell>
  <van-cell @click="hate" title="拉黑作者" icon="manager-o"></van-cell>
</van-dialog>
<van-dialog v-model="show" :showConfirmButton="false" >
  <template slot="title">
    <van-cell>
      <van-icon @click="ret" name="arrow-left" />
    </van-cell>
  </template>
  <van-cell @click="reports(item.id)" v-for="(item, index) in typeList" :key="index" :title="item.type" icon="manager-o"></van-cell>
</van-dialog>
</div>
</template>

<script>
// 导入操作文章的方法,注意封装的方法要加括号
import { apiDisLike, apiReports, apiHate } from '@/api/aritcle'
export default {
  // 控制显示隐藏 要操作的文章数据
  props: ['value', 'artid', 'autid'],
  data () {
    return {
      typeList: [
        { id: 0, type: '其他问题' },
        { id: 1, type: '标题夸张' },
        { id: 2, type: '低俗色情' },
        { id: 3, type: '错别字多' },
        { id: 4, type: '旧闻重复' },
        { id: 5, type: '广告软文' },
        { id: 6, type: '内容不实' },
        { id: 7, type: '涉嫌违法犯罪' },
        { id: 8, type: '侵权' }
      ],
      show: false, // 控制投诉分类弹窗显示隐藏
      isReport: false
    }
  },
  methods: {
    async dislike () {
      // 关闭面板
      this.$emit('input', false)
      // 从数据源中删除当前 id 对应的文章
      // 问题: 数据在父组件中无法直接删除,
      this.$emit('delArticle', this.artid)
      // 将文章 id 发送到服务器中, 将文章标识为不喜欢
      await apiDisLike(this.artid)
      // 由于js处理数值的长度有限,超过16位数后会丢失精度(16位以后都会被0代替)
      // 解决: 使用第三方包 json-bigint 来将超过范围的数字进行处理
    },
    // 打开举报详情页面
    showMore () {
      this.show = true
    },
    // 返回更多操作界面
    ret () {
      // 关闭举报详情页面
      this.show = false
      // 打开更多操作面板
      this.$emit('input', true)
    },
    // 将举报的信息提交到服务器
    // 因为是网络请求,所以要使用async与await
    async reports (reportsType) {
      // 对于会出现错误的概率,使用 try与catch包起来
      try {
        await apiReports({
          artid: this.artid,
          reportsType: reportsType
        })
        // 提示用户关闭举报成功
        // 在组件中直接使用轻提示:this.$toast.success('举报成功')
        this.$toast.success('举报成功')
        // 关闭弹出框
        this.show = false
        this.$emit('input', false)
      } catch (err) {
        window.console.log(err)
        // 提示用户关闭举报成功
        this.$toast.fail('举报失败')
        // 关闭弹出框
        this.show = false
        this.$emit('input', false)
      }
    },
    // 拉黑作者
    async hate () {
      // 触发父组件事件
      this.$emit('hateUser', this.autid)
      let res = await apiHate(this.autid)
      window.console.log(res)
    }
  }
}
</script>

<style>

</style>
