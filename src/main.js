// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import iView from 'iview'
import store from  './store'
// import axios from 'axios'
import 'iview/dist/styles/iview.css'    // 使用 CSS
// import $ from 'jquery'
import '../static/pointtransfertools'
import '../static/jquery.min'

// Vue.config.productionTip = false

// Vue.prototype.$axios = axios
Vue.use(iView)
import router from './router'


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
