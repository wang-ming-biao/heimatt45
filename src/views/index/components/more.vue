<template>
  <van-dialog v-model="value" :showConfirmButton="false" >
  <van-cell >
    <template>
      <van-icon name="cross" @click="$emit('input', false)" />
    </template>
  </van-cell>
  <van-cell title="不感兴趣" icon="manager-o"></van-cell>
  <van-cell title="反馈垃圾内容" icon="manager-o" is-link></van-cell>
  <van-cell title="拉黑作者" icon="manager-o"></van-cell>
</van-dialog>
</template>

<script>
export default {
  // 控制显示隐藏
  props: ['value']
}
</script>

<style>

</style>
