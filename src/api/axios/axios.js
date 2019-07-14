// axios 模块 --
// 导入 axios
import axios from 'axios'
// 封装 axios
const instance = axios.create({
  // 配置axios url
  baseURL: 'http://ttapi.research.itcast.cn/mp/v1_0'
  // 请求头不能放在封装的axios里，
  // 如果没有token，会一直加载页面--
})
// axios-请求拦截器
// 在请求之前，先获取token如果有正常访问，如果没有进行ajax请求，实现登录获取token

// 添加 --请求拦截器--
// 在请求之前先获取token，有的话继续执行，没有则重新登录请求token
axios.interceptors.request.use(function (config) {
  // 在发送请求之前先获取token，
  const users = window.sessionStorage.getItem('hm73-toutiao')
  if (users) {
    // 如果是 true 拿到 token 修改config继续做校验
    config.headers = {
      Authorization: 'Bearer' + JSON.parse(users).token
    }
  }
  // 如果没有，则继续发送ajax请求数据
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器--
// 如果token失效或者关闭浏览器，则必须重新登录请求token
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, function (error) {
  // 如果 响应数据的 状态码为 401 ，那么就重新进行登录
  if (error.response.status === 401) {
    // 跳转登录页，进行重新登录
    location.hash = '#/login'
  }

  return Promise.reject(error)
})
// 导出 axios instance---ES6语法导出
export default instance
