import MyBread from '@/components/my-bread.vue'
import MyChannel from '@/components/my-channel.vue'
export default {
  install (Vue) {
    // 注册所有组件在 Vue下
    Vue.component(MyBread.name, MyBread)
    Vue.component(MyChannel.name, MyChannel)
    // 注册
  }
}
