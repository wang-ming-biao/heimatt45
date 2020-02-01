<template>
    <div>
        <!-- 封装 频道操作面板的结构,样式,方法 -->
    <van-popup
  :value="value"
  @input="$emit('input', $event)"
  position="bottom"
  :style="{ height: '90%' }">
<!-- 将弹出框拆分成两个部分,通过点击遮罩层触发@input的点击事件 -->
<van-cell>
    <!-- slot="title": 自定义左侧标题-->
    <!-- 使用插槽语法设置按钮 -->
    <template slot="title">
        <van-icon @click="close" class="popicon" name="cross" />
    </template>
</van-cell>
<!-- 设置我的频道区域 -->
<van-cell>
    <!-- 使用插槽语法设置按钮 -->
    <template slot="title">
        我的频道
    </template>
    <template slot="default">
        <!-- slot="default":自定义右侧标题,按钮通过自带的属性进行修改 -->
        <van-button plain hairline round v-if="showIcon===false" @click="showIcon=true" size="mini" type="danger">编辑</van-button>
        <van-button plain hairline round v-if="showIcon===true" @click="showIcon=false" size="mini" type="danger">完成</van-button>
    </template>
</van-cell>
<!-- 使用Grid 宫格设置标签的弹出框的子选项布局 -->
<van-grid>
  <van-grid-item class="myfn" v-for="(item, index) in 9 " :key="index" >
      <template slot="text">
          <span class="myName">文字</span><van-icon v-show="showIcon" class="mysn" name="clear" />
      </template>
  </van-grid-item>
</van-grid>
<!-- 设置频道推荐区域 -->
<van-cell>
    <!-- 使用插槽语法设置按钮 -->
    <template slot="title">
        频道推荐
    </template>
</van-cell>
<van-grid>
  <van-grid-item v-for="(item, index) in 9 " :key="index" text="文字" />
</van-grid>
    </van-popup>
    </div>
</template>

<script>
export default {
  props: ['value'],
  data () {
    return {
      showIcon: false // 频道选项修改
    }
  },
  methods: {
    close () {
      this.$emit('input', false)
    }
  }
}
</script>

<style lang="less">
.popicon {
    font-size: 30px;
}
.myfu {
    position: relative;
}
.mysn {
  position: absolute;
  top: 0;
  right: 0;
}
.myName {
  color: #646566;
}

</style>
