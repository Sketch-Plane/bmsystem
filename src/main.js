import Vue from 'vue'
import App from './App.vue'
import router from './router'
//导入全局样式
import './assets/css/global.css'
//导入element-ui框架
import ElementUI, { Message } from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
//使用elemen-ui框架
Vue.use(ElementUI);
import axios from "axios"
//配置请求根路径
axios.defaults.baseURL = "http://127.0.0.1:8888/api/private/v1/"
//将axios挂载在Vue原型上的$http上，这样每个组件都可以通过$http发送网络请求
Vue.prototype.$http = axios
Vue.prototype.$message = Message
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
