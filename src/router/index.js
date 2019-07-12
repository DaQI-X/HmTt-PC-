// 路由组件
// 导入Vue
import Vue from 'vue'
// 导入 路由
import VueRouter from 'vue-router'
// 导入登录组件
import Login from '../views/login/index.vue'
// 导入首页
import Home from '../views/Home/index.vue'
// 匹配路由
Vue.use(VueRouter)
// 配置Vue
Vue.config.productionTip = false

// 配置路由规则
const router = new VueRouter({
  // 配置路由组件
  routes: [
    { name: 'login', path: '/login', component: Login },
    { name: 'Home', path: '/', component: Home }
  ]
})

// ES6 导出语法
export default router
