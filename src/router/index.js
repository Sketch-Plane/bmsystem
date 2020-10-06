import Vue from 'vue'
import VueRouter from 'vue-router'
// import { component } from 'vue/types/umd'
import Login from '../components/login'
import Home from '../components/Home'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login', 
    component: Login
  },
  {
    path: '/home',
    component: Home
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
//挂载路由导航守卫
router.beforeEach((to, from, next) => { 
  //to代表将要访问的路径
  //from 代表从哪个路径跳转而来
  //next 是一个函数表示放行，next()放行，next('/login'),强制跳转到
  
  //如果用户访问的是登陆页，直接放行
  if (to.path === '/login') return next()
  //验证是否有token，从sessionStorage中获取到保存的token值
  const tokenStr = window.sessionStorage.getItem('token')
  //如果没有token就强制跳转到登陆页
  if (!tokenStr) return next('/login')
  next()
})
export default router
