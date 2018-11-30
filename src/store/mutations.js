/**
 * Created by joker on 2018/11/21.
 */

import {RECEIVE_PLANE_NUM,RECEIVE_COLOR_ALL,RECEIVE_PLANE_LIST}   from './mutations-types.js'
export default {

    [RECEIVE_PLANE_NUM] (state,{planeDBNum}){
        state.planeDBNum = planeDBNum
    },
    [RECEIVE_COLOR_ALL] (state,{colorAll}){
        state.colorAll = colorAll
    },

}
