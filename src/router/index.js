// 路由组件
// 导入Vue
import Vue from 'vue'
// 导入 路由
import VueRouter from 'vue-router'
// 导入登录组件
import Login from '../views/login/index.vue'
// 匹配路由
Vue.use(VueRouter)
// 配置Vue
Vue.config.productionTip = false

// 配置路由规则
const router = new VueRouter({
  // 配置路由组件
  routes: [
    { name: 'Home', path: '/', redirect: '/login' },
    { name: 'login', path: '/login', component: Login }
  ]
})

// ES6 导出语法
export default router
