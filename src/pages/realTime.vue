<template>
    <div id="realTime">
        <Modal v-model="realTimeModal" draggable :closable='false' title="PAD实时查询" width='1000' mask>
            <Row>
                <Col span="10">
                    <Form>
                        <FormItem label="请选择PAD">
                            <Select v-model="selectPAD" style="width:200px" @on-change='changeColumn'>
                                <Option value='PIP'>PIP</Option>
                                <Option value='CIP'>CIP</Option>
                                <Option value='LWC'>LWC</Option>
                                <Option value='Dewpoint'>Dewpoint</Option>
                                <Option value='CAS'>CAS</Option>
                                <Option value='PCASP'>PCASP</Option>
                                <Option value='CCN'>CCN</Option>
                                <Option value='AIMMS20'>AIMMS20</Option>
                            </Select>                                    
                        </FormItem>   
                    </Form>
                </Col>
            </Row>
            <Table :columns="columns2" :data="data2"></Table>
            <div slot="footer">
                <Button @click='closeModal'>关闭</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import axios from 'axios'
import {realTimeData} from '../api/index.js'
export default {
    name:'realTime',
    props:{
        realTimeModal:Boolean,
    },
    data(){
        return {
            selectPAD:'',
            columns2:[],
            data2:[],
        }
    },
    methods:{
        changeColumn(val){
                switch (val) {
                case 'PIP':
                    this.columns2 = [
                        {
                            title: 'Number Conc',
                            key: 'pipNumberConc'
                        },
                        {
                            title: 'LWC',
                            key: 'pipLwc'
                        },
                        {
                            title: 'MVD',
                            key: 'pipMvd'
                        },
                        {
                            title: 'ED',
                            key: 'pipEd'
                        }
                    ];
                    break;
                case 'CIP':
                    this.columns2 = [
                        {
                            title: 'CIP T Ambient',
                            key: 'cipTAmbient'
                        },
                        {
                            title: 'CIP PAS',
                            key: 'cipPas'
                        },
                        {
                            title: 'Number Conc',
                            key: 'cipNumberConc'
                        },
                        {
                            title: 'LWC',
                            key: 'cipLwc'
                        },
                        {
                            title: 'MVD',
                            key: 'cipMvd'
                        },
                        {
                            title: 'ED',
                            key: 'cipEd'
                        },
                        {
                            title: 'Applied PAS',
                            key: 'cipAppliedPas'
                        },
                    ];
                    break;
                case 'LWC':
                    this.columns2 = [
                        {
                            title: 'LWC_calc',
                            key: 'hotwireLWcLwcCalc'
                        },
                        {
                            title: 'LWC_Obs',
                            key: 'hotwireLwcLwcObs'
                        },
                    ];
                    break;
                case 'Dewpoint':
                    this.columns2 = [
                        {
                            title: 'Dewpoint',
                            key: 'dewpointDewpoint'
                        },
                        {
                            title: 'RH',
                            key: 'dewpointRH'
                        },
                    ];
                    break;
                case 'CAS':
                    this.columns2 = [
                        {
                            title: 'Number Conc',
                            key: 'casdpolNumberConc'
                        },
                        {
                            title: 'Volume Conc',
                            key: 'casdpolVolumeConc'
                        },
                        {
                            title: 'MVD',
                            key: 'casdpolMvd'
                        },
                        {
                            title: 'ED',
                            key: 'casdpolEd'
                        },
                        {
                            title: 'Applied PAS',
                            key: 'casdpolAppliedPas'
                        },
                        {
                            title: 'Applied Pressure',
                            key: 'casdpolAppliedPressure'
                        },
                        {
                            title: 'Applied Ambient Temp',
                            key: '_CasdpolAppliedAmbientTemp'
                        },
                    ];
                    break;
                case 'PCASP':
                    this.columns2 = [
                        {
                            title: 'Number Conc',
                            key: 'pcasp100xcNumberConc'
                        },
                        {
                            title: 'Volume Conc',
                            key: 'pcasp100xcVolumeConc'
                        },
                        {
                            title: 'MVD',
                            key: 'pcasp100xcMvd'
                        },
                        {
                            title: 'ED',
                            key: 'pcasp100xcEd'
                        },
                    ];
                    break;
                case 'CCN':
                    this.columns2 = [
                        {
                            title: 'CCN Numb Conc B',
                            key: 'cnn200CcnNumbConcB'
                        },
                        {
                            title: 'CCN Numb Conc A',
                            key: 'cnn200CcnNumbConcA'
                        },
                        {
                            title: 'SS Setting B',
                            key: 'cnn200SsSettingB'
                        },
                        {
                            title: 'SS Setting A',
                            key: 'cnn200SsSettingA'
                        },
                    ];
                    break;
                case 'AIMMS20':
                    this.columns2 = [
                        {
                            title: 'End Seconds',
                            key: 'aimms20EndSeconds',
                            width:150,
                        },
                        {
                            title: 'Day of Year',
                            key: 'aimms20DayofYear',
                            width:150,
                        },
                        {
                            title: 'Year',
                            key: 'aimms20Year',
                            width:150,
                        },
                        {
                            title: 'Hours(packet1)',
                            key: 'aimms20Hours',
                            width:150,
                        },
                        {
                            title: 'Minutes(packet1)',
                            key: 'aimms20Minutes',
                            width:150,
                        },
                        {
                            title: 'Seconds(packet1)',
                            key: 'aimms20Seconds',
                            width:150,
                        },
                        {
                            title: 'Status',
                            key: 'aimms20Status',
                            width:150,
                        },
                        {
                            title: 'Temperature',
                            key: 'aimms20Temperature',
                            width:150,
                        },
                        {
                            title: 'RH',
                            key: 'aimms20RH',
                            width:150,
                        },
                        {
                            title: 'Pressure',
                            key: 'aimms20Pressure',
                            width:150,
                        },
                        {
                            title: 'Wind Flow N',
                            key: 'aimms20WindFlowN',
                            width:150,
                        },
                        {
                            title: 'Wind Flow E',
                            key: 'aimms20WindFlowE',
                            width:150,
                        },
                        {
                            title: 'Wind Speed',
                            key: 'aimms20WindSpeed',
                            width:150,
                        },
                        {
                            title: 'Wind Direction',
                            key: 'aimms20WindDirection',
                            width:150,
                        },
                        {
                            title: 'Wind Solution',
                            key: 'aimms20WindSolution',
                            width:150,
                        },
                            {
                            title: 'Hours(packet2)',
                            key: 'aimms20Hours2',
                            width:150,
                        },
                        {
                            title: 'Minutes(packet2)',
                            key: 'aimms20Minutes2',
                            width:150,
                        },
                        {
                            title: 'Seconds(packet2)',
                            key: 'aimms20Seconds2',
                            width:150,
                        },
                        {
                            title: 'Latitude',
                            key: 'aimms20Latitude',
                            width:150,
                        },
                        {
                            title: 'Longitude',
                            key: 'aimms20Longitude',
                            width:150,
                        },
                        {
                            title: 'Altitude',
                            key: 'aimms20Altitude',
                            width:150,
                        },
                        {
                            title: 'Velocity N',
                            key: 'aimms20VelocityN',
                            width:150,
                        },
                        {
                            title: 'Velocity E',
                            key: 'aimms20VelocityE',
                            width:150,
                        },
                        {
                            title: 'Velocity D',
                            key: 'aimms20VelocityD',
                            width:150,
                        },
                        {
                            title: 'Roll',
                            key: 'aimms20Roll',
                            width:150,
                        },
                        {
                            title: 'Pitch',
                            key: 'aimms20Pitch',
                            width:150,
                        },
                            {
                            title: 'Yaw',
                            key: 'aimms20Yaw',
                            width:150,
                        },
                            {
                            title: 'TAS',
                            key: 'aimms20TAS',
                            width:150,
                        },
                        {
                            title: 'Vertical Wind',
                            key: 'aimms20VerticalWind',
                            width:150,
                        },
                            {
                            title: 'Sideslip Angle',
                            key: 'aimms20SideslipAngle',
                            width:150,
                        },
                            {
                            title: 'AOA pres diff',
                            width:150,
                            key: 'aimms20AoaPresDiff'
                        },
                            {
                            title: 'Sideslip Diff',
                            key: 'aimms20SideslipDiff',
                            width:150,
                        },
                            {
                            title: 'UTC Seconds',
                            width:150,
                            key: 'aimms20UtcSeconds'
                        },
                    ];
                    break;
            }
            axios.post(realTimeData).then((res)=>{
                this.data2.push(res.data)
            }).catch((err)=>{
                console.log(err)
            })
            setInterval(()=>{
                axios.post(realTimeData).then((res)=>{
                    if(this.data2 === null){
                        this.data2.push(res.data)
                    }else{
                        this.data2.splice(0,1)
                        this.data2.push(res.data)
                    }
                }).catch((err)=>{
                    console.log(err)
                })
            },10000)
        },
        closeModal(){
            this.$emit('closeModal')
        }
    }
}
</script>

<style lang="less">
.ivu-modal{
    // width: 500px !important;
    .ivu-modal-body {
        width: 100% !important
    }
}
</style>

