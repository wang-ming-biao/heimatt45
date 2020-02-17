<template>
  <div>
      <form action="/">
  <van-search
    v-model="value"
    show-action
    placeholder="请输入搜索关键词"
    @search="onSearch"
    @cancel="onCancel"
  />
</form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: ''
    }
  },
  methods: {
    // 事件在点击键盘上的搜索/回车按钮后触发，
    onSearch (val) {
      this.$toast(val)
    },
    // 事件在点击搜索框右侧取消按钮时触发
    onCancel () {
      this.$toast('取消')
    }
  }
}
</script>

<style>

</style>
