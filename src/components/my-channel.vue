
<template>
  <el-select :value="value" @change="fn" placeholder="所有频道">
    <el-option v-for="item in channelOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
  name: 'my-channel',
  // 父传子
  props: ['value'],
  data () {
    return {
      // 默认频道数据
      channelOptions: []
    }
  },
  created () {
    // 获取频道数据
    this.getChannel()
  },
  methods: {
    // 异步发送ajax请求，获取频道数据
    async getChannel () {
      const {
        data: { data }
      } = await this.$http.get('channels', { params: this.reqParams })
      this.channelOptions = data.channels
    },
    // 子传父
    fn (value) {
      this.$emit('input', value)
    }
  }
}
</script>

<style>
</style>
