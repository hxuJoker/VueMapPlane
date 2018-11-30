import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home'
// import Map from '@/pages/map'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home,
      // children:[
      //   {
      //     path:'/home',
      //     component:Map
      //   }
      // ]
    },
    {path: '/', redirect: Home},
  ]
})
