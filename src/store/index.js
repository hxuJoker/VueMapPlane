/**
 * Created by joker on 2018/11/21.
 */
import Vue from 'vue'
import Vuex from 'vuex'
// 引入四个基本模块
import state from './state'
import mutations from './mutations'
import actions from './actions'
import { Store } from 'vuex';
// 一定要声明使用插件
Vue.use(Vuex)


export default new Vuex.Store({
  state,
  mutations,
  actions,
})
