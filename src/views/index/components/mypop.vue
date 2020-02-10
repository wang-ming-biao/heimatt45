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
      <!-- 点击标签,触发 close 方法将值传给父组件 -->
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
        <van-button plain hairline round v-else @click="showIcon=false" size="mini" type="danger">完成</van-button>
    </template>
</van-cell>
<!-- 使用Grid 宫格设置标签的弹出框的子选项布局 -->
<van-grid>
  <van-grid-item class="myfn" @click="changeActive(index) " v-for="(item, index) in channelsList" :key="index" >
      <template slot="text">
        <!-- 动态绑定active类名 -->
          <span :class="{active: active === index}" class="myName">{{ item.name }}</span><van-icon @click="remChannel(item)" v-show="showIcon && index !== 0" class="mysn" name="clear" />
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
  <van-grid-item @click="addChannel(item)" v-for="(item, index) in otherChannel" :key="index" text="文字">
    <template slot="text">
      {{ item.name }}
    </template>
    </van-grid-item> />
</van-grid>
    </van-popup>
    </div>
</template>

<script>
// 导入请求所有频道的方法
import { apiGetAllChannel, apiSetChannel } from '../../../api/channels'
import { setLocal } from '../../../utils/local'
export default {
  // 控制面板的显示与隐藏 我的频道列表 选中的频道
  props: ['value', 'channelsList', 'active'],
  data () {
    return {
      showIcon: false, // 频道选项修改
      allChannel: [] // 所有频道选项
    }
  },
  methods: {
    close () {
      // 子组件通过$emit('自定义方法名', 值)
      this.$emit('input', false)
    },
    // 得到所有的频道数据
    async getAllChannel () {
      // 请求所有频道数据,使用封装的请求所有频道的方法
      let res = await apiGetAllChannel()
      this.allChannel = res.data.data.channels
    },
    // 将全部频道中被点击的频道添加到我的频道
    async addChannel (item) {
      // 动态添加其他的额外属性,解决切换新页面报错问题
      this.$set(item, 'loading', false)
      this.$set(item, 'finished', false)
      this.$set(item, 'isLoading', false)
      this.$set(item, 'list', [])
      // 点击频道后将频道传入我的频道
      this.channelsList.push(item)
      // 将我的频道数据进行保存: 判断用户是否
      // 得到用户的登陆信息
      let user = this.$store.state.user
      // 如果登陆
      if (user.token) {
        // 根据我的频道数据生成 channels
        let channels = []
        this.channelsList.slice(1).forEach((item, index) => {
          channels.push({
            id: item.id,
            seq: index + 2
          })
        })
        // 将我的频道数据提交到服务器中
        let res = await apiSetChannel(channels)
        window.console.log(res)
      } else { // 未登录
      // 掉用封装的setLocal方法,将修改后的频道数据保存到localstorage中
        setLocal('channels', this.channelsList)
      }
    },
    // 将我的频道中被点击的频道添加到全部频道中
    async remChannel (obj) {
      // 点击我的频道上的xx图标进行修改
      this.channelsList.forEach((item, index) => {
        // 判断删除的频道id与全部频道ID是否一致
        if (item.id === obj.id) {
          // 将当前元素删除, splice 删除指定下标的元素
          this.channelsList.splice(index, 1)
        }
      })
      // 判断用户是否登录
      let user = this.$store.state.user
      // 如果用户已经登录,
      if (user.token) {
        // 生成频道数组
        let channels = []
        // 遍历我的频道,去除默认的第一个
        this.channelsList.slice(1).forEach((item, index) => {
          // 将遍历后的数据push进新的频道数组
          channels.push({
            id: item.id,
            seq: index + 2
          })
        })
        // 将数据提交到服务器
        await apiSetChannel(channels)
      } else { // 未登录的保存
        setLocal('channels', this.channelsList)
      }
    },
    // 切换高亮选线
    changeActive (index) {
      // 将数据交给home
      this.$emit('update:active', index)
    }
  },
  // 生命周期钩子
  created () {
    // 页面一加载调用请求所有频道的方法
    this.getAllChannel()
  },
  // 计算属性
  computed: {
    otherChannel () {
      // 从所有频道数据中取出我的频道数据中不存在的元素
      // 1.0 得到我的频道数组中所有 ids 的集合
      let ids = []
      this.channelsList.forEach(item => {
        ids.push(item.id)
      })
      // 2.0 遍历所有的频道数据,取出 ids 中不存在的元素
      let other = []
      // 将所有频道与我的频道id进行对比,
      this.allChannel.forEach(item => {
        if (!ids.includes(item.id)) {
        // 将与我的频道不同的频道push进新的数组
          other.push(item)
        }
      })
      // 将新的数组返回
      return other
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
.active {
  color: red;
}

</style>
