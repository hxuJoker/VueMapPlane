/**
 * Created by joker on 2018/11/21.
 */
import {RECEIVE_PLANE_NUM}   from './mutations-types.js'

import {reqPlaneBDNum} from '../api'
export default {
    async getPlaneBDNum({commit}){
        // "use strict";
        const result = await reqPlaneBDNum();
        const planeDBNum = result;
        commit(RECEIVE_PLANE_NUM,{planeDBNum})
    },
}
