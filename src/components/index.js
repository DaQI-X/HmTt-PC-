import MyBread from '@/components/my-bread.vue'
export default {
  install (Vue) {
    // 注册所有组件在 Vue下
    Vue.component(MyBread.name, MyBread)
    // 注册
  }
}
