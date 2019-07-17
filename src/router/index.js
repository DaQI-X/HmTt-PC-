// 路由组件
// 导入Vue
import Vue from 'vue'
// 导入 路由
import VueRouter from 'vue-router'
// 导入登录组件
import Login from '@/views/login/index.vue'
// 导入首页
import Home from '@/views/Home/index.vue'
// 导入404页面
import Four from '@/views/404/index.vue'
// 导入 welcome 模块
import Welcome from '@/views/welcome/index.vue'
// 导入 article 模块
import Article from '@/views/article/index.vue'
// 导入 img素材 模块
import Img from '@/views/img/index.vue'
// 匹配路由
Vue.use(VueRouter)
// 配置Vue
Vue.config.productionTip = false

// 配置路由规则
const router = new VueRouter({
  // 配置路由组件
  routes: [{
    name: 'login',
    path: '/login',
    component: Login
  },
  {
    path: '/',
    component: Home,
    children: [
      { name: 'Home', path: '/welcome', component: Welcome },
      { name: 'article', path: '/article', component: Article },
      { name: 'img', path: '/img', component: Img }
    ]
  },
  {
    path: '*',
    name: '404',
    component: Four
  }
  ]
})
// 功能：跳转组件，验证token
// 路由组件的导航守位
router.beforeEach((to, from, next) => {
  console.log('ok')
  // 获取到 sessionStorage 的 token
  const users = window.sessionStorage.getItem('hm73-toutiao')
  // 如果当前的位置不是 login 且 没有拿到 token 认证，返回到登录页面
  // 重新登录 ，如果有 继续执行
  if (to.path !== '/login' && !users) {
    // 返回登录页面登录
    next('/login')
  } else {
    // 否则 继续执行
    next()
  }
})

// ES6 导出语法
export default router
