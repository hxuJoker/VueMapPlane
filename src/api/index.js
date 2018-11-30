/**
 * Created by joker on 2018/11/21.
 */
import axios from './ajax'

const BASE_URL = 'http://192.168.0.174:8003/api/v1/yunavi'

export  const reqPlaneBDNum = ()=> axios( BASE_URL+'/station/selectAll')

// 历史查询
export const historySearch = BASE_URL + '/message/getMessageByTimeAndSendId'


// 更新所有颜色
export const updateColorAll = BASE_URL + "/color/updateAll"

// 获取最新一条轨迹
export const getLastPlaneData = BASE_URL + '/plane/planezybg/getPlaneNewDataByDay'

//查询当天飞机
export const getPlane = BASE_URL + "/plane/planezybg/getPlaneDataByDay"

//查询当天的飞机所有数据
export const getPlaneData = BASE_URL + '/plane/planezybg/getOnePlaneDataByDay'

//根据时间段和飞机编号或北斗卡号查询
export const getPlaneDataTime = BASE_URL + '/plane/planezybgtime/getPlaneTimeByDateAndFjBd'

//根据时间段获取某架飞机的飞行轨迹数据
export const getOnePlaneDataTime = BASE_URL + '/plane/planezybg/getOnePlaneDataByDate'

//PAD历史查询
export const PADHistorySearch = BASE_URL + '/plane/selectDmtListByDate'

//实时数据
export const realTimeData = BASE_URL + '/plane/selectNewOne'

//地图设置
export const mapSetting = BASE_URL + ''