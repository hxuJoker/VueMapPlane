<template>
    <div id="tableContent" style="position: fixed;bottom: 0;">
        <Table :columns="columns1" :data="dataTable" v-show="tableShow"></Table>
    </div>
</template>

<script>
export default {
    props:{
        dataTable:Array,
        tableShow:Boolean
    },
    data(){
        return {
            columns1:[
                {
                    title: '经度',
                    key: 'longi'
                },
                {
                    title: '纬度',
                    key: 'lati'
                },
                {
                    title: '高度',
                    key: 'height'
                },
                {
                    title: '速度',
                    key: 'speed'
                },
                {
                    title: '航向',
                    key: 'angle'
                },
                {
                    title: '温度',
                    key: 'temp'
                },
                {
                    title: '湿度',
                    key: 'humi'
                },
                {
                    title: '作业',
                    key: 'chjzljyl'
                },
                {
                    title: '作业',
                    key: 'humi',
                    renderHeader:(h,params)=>{
                        return h('div',[
                            h('Button',{
                                props:{
                                    type:'primary'
                                },
                                on:{
                                    click:()=>{
                                        this.tableShow = false;
                                    }
                                }
                            },'关闭')
                        ])
                    }
                },
            ]
        }
    },
}
</script>

<style>

</style>
