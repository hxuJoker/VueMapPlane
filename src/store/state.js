/**
 * Created by joker on 2018/11/21.
 */
export default {
    // 左侧菜单数组
    menuArr:[
        {firstMenu:'基础设置',name:'1',secondMenu:[{value:'地图设置'},{value:'作业颜色'},]},
        {firstMenu:'PAD',name:'5',secondMenu:[{value:'PAD历史查询'},{value:"PAD实时监控"}]},
    ],
    menuJson:[
        {firstMenu:'轨迹回放',name:'2'},
        {firstMenu:'实时监控',name:'3'},
        {firstMenu:'历史消息',name:'4'},
    ],
    planeDBNum:[],
    formData: {
        dataRange: '',
        planeNum: '',//飞机编号
        bdNum: '',//北斗卡号
        moreInfo: false //详细信息
    },
    colorAll:[],
    //北斗卡频率
    cardRate:3500,
}
