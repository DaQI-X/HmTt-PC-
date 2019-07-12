import Vue from 'vue'
import App from './App.vue'
// 导入element ui 和 css样式
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 导入 router 路由模块
import router from './router/index.js'
// 导入 ax3ios 发送ajax请求
import axios from 'axios'
// 配置全局 axios
Vue.prototype.$http = axios
//
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
