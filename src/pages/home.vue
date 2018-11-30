<template>
      <div class="layout" style="height: 100%;">
        <Layout style="height: 100%;">
            <!--左侧菜单-->
            <Sider hide-trigger style="height: 100%;">
              <Menu theme="dark" width="auto" accordion @on-select="baseFunction">
                <div class="logo">
                  <Row>
                    <Col span="12"><img :src="logoUrl" alt="#" class="logoImg"></Col>
                    <Col span="12" style="position: absolute;top: 40px;left: 90px">
                    <Row>
                      <span class="companyTitle">云航科技</span>
                    </Row>
                    </Col>
                  </Row>
                </div>
                <div style="height: 40px;">
                  <Button class="personalBtn" @click="resetMap">重置地图</Button>
                </div>
                <div v-for="xx in menuArr">
                  <Submenu :name="xx.name">
                    <template slot="title">
                        {{xx.firstMenu}}
                    </template>
                    <div v-for="bb in xx.secondMenu">
                      <MenuItem :name='bb.value'>{{bb.value}}</MenuItem>
                    </div>
                  </Submenu>
                </div>
                  <div v-for="xx  in  menuJson">
                      <MenuItem :name='xx.name' class="menuCss">{{xx.firstMenu}}</MenuItem>
                  </div>
              </Menu>
            </Sider>

          <Layout style="height: 100%;">
            <!--Header部分-->
            <!-- <Header>
                <Button class="satelliteBtn">海事卫星</Button>
                <Button class="satelliteBtn">北斗卫星</Button>              
              </Header> -->
              <Header>
                  <h1 style="text-align:left;color:#fff">飞机监控系统</h1>
              </Header>

              <!--地图内容部分-->
              <Content style="height: 90%;">
                  <div id="map" style="width:100%;height:100%;">
                      <!-- <div id="allmap" ref="allmap" style="height: 100%;"></div> -->
                    <Tabs type="card" :value="name" @on-tab-remove="removeTab(name)">
                        <TabPane label="地图" name="name1">
                            <div id="allmap" ref="allmap" style="height: 100%;"></div>
                            <div style="position:fixed;top:5px" class="divkj">
                                <Poptip placement="right" width="300">
                                <Button class="btn"><Icon type="ios-add-circle" /></Button>
                                    <div class="api" slot="content">
                                        <i class="ivu-icon ivu-icon-md-hand headerIcon"  @click="drag"/>
                                        <i class="ivu-icon ivu-icon-md-pin headerIcon" @click="point" />
                                        <i class="ivu-icon ivu-icon-ios-radio-button-off headerIcon" @click="circular" />
                                        <i class="ivu-icon ivu-icon-md-trending-up headerIcon" @click="broken" />
                                        <i class="ivu-icon ivu-icon-md-square-outline headerIcon" @click="rectangle"/>
                                        <i class="ivu-icon ivu-icon-md-pulse headerIcon" @click="measure"/>
                                        <i class="ivu-icon ivu-icon-md-trash headerIcon"@click="clear" />
                                    </div>
                                </Poptip>
                            </div>
                            <popTip :playRate='playRate' @jian='jian' @add='add' @play='play' @stop='stop'></popTip>
                        </TabPane>
                        <TabPane label="历史信息"  class="historyInfo" v-for="tab in tabs" :key="tab" closable name="name2">
                            <div style='width: 70% !important'>
                                <Form>
                                <Row :gutter="32">
                                    <Col span="8">
                                    <FormItem label="时间范围" label-position="top">
                                        <DatePicker v-model="form.dateRange" :transfer='true' type="datetimerange" placeholder="选择日期时间范围" style="width: 275px"></DatePicker>
                                    </FormItem>
                                    </Col>
                                    <Col span="6">
                                    <FormItem label="飞机编号" label-position="top">
                                        <Select v-model="form.sendid" style="width:200px" placeholder="飞机编号">
                                            <Option v-for="item in PlaneNum" :value="item.fjbh" :key="item.fjbh">{{ item.fjbh }}</Option>
                                        </Select>
                                    </FormItem>
                                    </Col>
                                    <Col span="6">
                                    <FormItem label="北斗卡号" label-position="top">
                                        <Select v-model="form.sendid" style="width:200px" placeholder="北斗卡号">
                                            <Option v-for="item in PlaneNum" :value="item.bdid" :key="item.bdid">{{ item.bdid }}</Option>
                                        </Select>
                                    </FormItem>
                                    </Col>
                                    <Col span="4" style="text-align: right">
                                    <Button type="primary" class="historyBtn" @click="historySearch(form,currentPage,pageSize)"><Icon type="md-search" />查询</Button>
                                    </Col>
                                </Row>
                            </Form>
                            <Table :columns="columns1" :data="data1"></Table>
                            <Page :total="total" :page-size="pageSize" :current="currentPage" :page-size-opts="pageSizeOpts" @on-change="changePage" @on-page-size-change="changePagePer" show-elevator show-sizer show-total/>
                            </div>
                        </TabPane>
                        <TabPane label="PAD历史查询"  class="historyInfo" v-for="tab in tabs1" :key="tab" closable name="name3">
                        <div style="width:70% !important">
                                <Form>
                                <Row :gutter="32">
                                    <Col span="8">
                                    <FormItem label="时间范围" label-position="top">
                                        <DatePicker v-model="form1.dateRange" :transfer='true' type="datetimerange" placeholder="选择日期时间范围" style="width: 275px"></DatePicker>
                                    </FormItem>
                                    </Col>
                                    <Col span="8">
                                    <FormItem label="PAD" label-position="top">
                                        <Select v-model="form1.pad" style="width:200px" @on-change='changeColumn'>
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
                                    </Col>
                                    <Col span="8" style="text-align: right">
                                    <Button type="primary" class="historyBtn" @click="historySearch1(form1,currentPage1,pageSize1)"><Icon type="md-search" />查询</Button>
                                    </Col>
                                </Row>
                            </Form>
                            <Table :columns="columns2" :data="data2"></Table>
                            <Page :total="total1" :page-size="pageSize1" :current="currentPage1" :page-size-opts="pageSizeOpts1" @on-change="changePage1" @on-page-size-change="changePagePer1" show-elevator show-sizer show-total/>
                            </div>
                           </TabPane>
                            
                    </Tabs>
                  </div>
                   
                  <Drawer
                      title="轨迹回放"
                      v-model="playback"
                      width="370"
                      :mask-closable="false"
                      :styles="styles"
                      :mask="false"
                  >
                      <Form :model="formData">
                          <Row :gutter="32" style="padding: 0 16px">
                              <FormItem label="时间范围" label-position="top">
                                  <DatePicker v-model="formData.dataRange" type="datetimerange" :transfer='true' placeholder="选择日期时间范围" style="width: 275px"></DatePicker>
                              </FormItem>
                          </Row>
                          <Row :gutter="32" style="padding: 0 16px">
                              <FormItem label="飞机编号" label-position="top">
                                  <Select v-model="formData.planeNum" style="width:275px">
                                      <Option v-for="item in PlaneNum" :value="item.fjbh" :key="item.fjbh">{{ item.fjbh }}</Option>
                                  </Select>
                              </FormItem>
                          </Row>
                          <Row :gutter="32" style="padding: 0 16px">
                              <FormItem label="北斗卡号" label-position="top">
                                  <Select v-model="formData.bdNum" style="width:275px">
                                      <Option v-for="item in PlaneNum" :value="item.bdid" :key="item.bdid">{{ item.bdid }}</Option>
                                  </Select>
                              </FormItem>
                          </Row>
                          <Row :gutter="32" style="padding: 0 16px">
                              <FormItem label="详细信息" label-position="top">
                                  <i-switch v-model="formData.moreInfo" true-value="1" false-value="0" @on-change="moreInfoChange"></i-switch>
                              </FormItem>
                          </Row>
                          <Row style="margin-bottom: 20px">
                              <Button type="primary" class="searchBtn" @click='searchPlaneBD(formData)'>查 询</Button>
                          </Row>
                      </Form>
                      <hr>
                      <div class="planeListShow">
                          <ul v-for="(bb,index) in planeDataTime">
                            <CheckboxGroup v-model="social" style="margin-bottom:10px" @on-change='changeCheckbox'>
                                <Checkbox :label="index">
                                    <li>{{bb.stationName}}-{{bb.fjbh}}<br style="font-size:13px;">{{bb.timeStartStr}} - {{bb.timeEndStr}}</br></li>
                                </Checkbox>
                            </CheckboxGroup>
                          </ul>
                      </div>
                      <div style="position: fixed; bottom:0px;">
                        <Row style="margin-bottom: 20px; margin-left: -16px;">
                            <Button type="primary" class="searchBtn" @click='startPlay()'>开始回放</Button>
                        </Row>
                      </div>                       
                  </Drawer>
                  <tableContent :tableShow='tableShow' :dataTable='dataTable'></tableContent>
              </Content>
            </Layout>
          </Layout>
          <realTime :realTimeModal='realTimeModal' @closeModal='closeModal'></realTime>
          <mapSetting :mapSettingModal='mapSettingModal' @commit='commit'></mapSetting>
          <colorPick :colorPickModal='colorPickModal' @commitColor='commitColor'></colorPick>
          <errorShow :errorModal='errorModal' :errorContent='errorContent' @close='close'></errorShow>
      </div>
</template>

<script>
    import {mapState} from 'vuex';
    import axios from 'axios'
    import {getPlane,getPlaneData,getPlaneDataTime,getOnePlaneDataTime,PADHistorySearch} from '../api/index.js'
    import {formatTimeToStr} from '../api/dateFormat.js'
    import popTip from './popTip.vue'
    import realTime from './realTime.vue'
    import mapSetting from './mapSetting.vue'
    import colorPick from './colorPick.vue'
    import errorShow from './error.vue'
    import tableContent from './tableContent.vue'
    export default {
        name: 'home',
        components:{
            popTip,
            realTime,
            mapSetting,
            colorPick,
            errorShow,
            tableContent
        },
        data(){
            return {
                tableShow:false,
                dataTable:[],//
                errorContent:'',//错误内容
                errorModal:false,//错误页面
                startRate:10000,
                playRate:1,
                social:[],//多选
                colorPickModal:false,//颜色设置
                mapSettingModal:false,//地图设置的模态框
                realTimeModal:false, //实时拖拽的模态框
                name:'name1', //默认选中的tab页
                tabs:0,  //新增tab页数
                tabs1:0,
                playback: false, //轨迹回放
                logoUrl:require('../../static/images/logo.png'),
                styles: {
                    height: 'calc(100%)',
                    overflow: 'auto',
                    paddingBottom: '53px',
                    position: 'static',
                    background:'#323238',
                },
                toPlayData:[],
                planeDataTime:[],
                firstPointTime:0,
                newPlane:[],
                colorAll:[],
                map:{},
                id:'',
                form:{
                  dateRange:'',
                  sendid:'',
                  fjbh:''
              },
                columns1:[
                    {
                        title: '时间',
                        key: 'receiveTimeStringValue'
                    },
                    {
                        title: '发送卡号',
                        key: 'sendid'
                    },
                    {
                        title: '接受卡号',
                        key: 'receiveid'
                    },
                    {
                        title: '飞机编号',
                        key: 'fjbh'
                    },
                    {
                        title: '内容',
                        key: 'messageContent'
                    },
                ],
                data1:[],
                total:0,  //总数
                pageSize:10, //每页条数
                currentPage:1,  //当前页
                pageSizeOpts:[10,20,50],
                form1:{
                    dateRange:'',
                    pad:'',
                },
                columns2:[],
                data2:[],
                total1:0,  //总数
                pageSize1:10, //每页条数
                currentPage1:1,  //当前页
                pageSizeOpts1:[10,20,50],
                padSelect:[
                    {lebel:'PIP',value:'PIP'},
                    {lebel:'CIP',value:'CIP'},
                    {lebel:'LWC',value:'LWC'},
                    {lebel:'Dewpoint',value:'Dewpoint'},
                    {lebel:'CAS',value:'CAS'},
                    {lebel:'PCASP',value:'PCASP'},
                    {lebel:'CCN',value:'CCN'},
                    {lebel:'AIMMS20',value:'AIMMS20'},
                ],
                lineStyle:{}, // 线条
                drawingManager:{},//实例化鼠标绘制工具
                commonFaction:[
                    {id:"hander",value:"拖动地图",imgUrl:"images/move_map.png"},
                    {id:"marker",value:"画点",imgUrl:"images/ponit_map.png"},
                    {id:"circle",value:"画圆",imgUrl:"images/circle_map.png"},
                    {id:"polyline",value:"画折线",imgUrl:"images/line2_map.png"},
                    {id:"rectangle",value:"画矩形",imgUrl:"images/rectangle_map.png"},
                    {id:"polygon",value:"画多边形",imgUrl:"images/polygon_map.png"},
                ],
                styleOptions : {
                    strokeColor:"red",    //边线颜色。
                    fillColor:"red",      //填充颜色。当参数为空时，圆形将没有填充效果。
                    strokeWeight: 3,       //边线的宽度，以像素为单位。
                    strokeOpacity: 0.8,	   //边线透明度，取值范围0 - 1。
                    fillOpacity: 0.6,      //填充的透明度，取值范围0 - 1。
                    strokeStyle: 'solid' //边线的样式，solid或dashed。
                }
            }
        },
        computed:{
            ...mapState(['menuArr','menuJson','planeDBNum','formData','cardRate']),
            PlaneNum(){
                const {planeDBNum} = this;
                return planeDBNum
            },
        },
        mounted(){
            this.$store.dispatch("getPlaneBDNum");
            var m = document.getElementById('allmap')
            this.map = new BMap.Map(m);//创建Map实例,设置地图允许的最小/大级别
            this.map.centerAndZoom(new BMap.Point(116.65, 40.30),5);// 初始化地图,设置中心点坐标和地图级别
            this.map.enableScrollWheelZoom(); //开启鼠标滚轮缩放
            this.map.enableDragging();//开启鼠标拖拽
            this.map.addControl(new BMap.MapTypeControl({//添加地图类型控件
                mapTypes:[
                    BMAP_NORMAL_MAP,
                    BMAP_HYBRID_MAP
            ]}));
            window.map = this.map;
            
        },
        methods:{
            baseFunction(val){
                switch (val){
                    case '地图设置':
                        this.playback = false;
                        this.mapSettingModal = true;
                        break;
                    case '作业颜色':
                        this.playback = false;
                        this.colorPickModal = true;
                        this.name = 'name1';
                        break;
                    case '2':
                        this.tableShow = true;
                        this.playback = true;
                        this.name = 'name1';
                        this.getColorAll();
                        break;
                    case '3':
                        this.name = 'name1';
                        this.getColorAll();
                        this.watchInitData();
                        let that = this;
                        axios.post(getPlane+'?times='+1536508800000).then((res)=>{
                            that.nowPlane = res.data;
                            if(res.data && res.data.length>0){
                                for(var i=0;i<res.data.length;i++){
                                    this.fjbhStr += res.data[i].fjbh+",";
                                }
                            }
                            for(let i = 0;i<that.nowPlane.length;i++){
                                axios.post(getPlaneData+'?times='+1536508800000+'&fjbh='+that.nowPlane[i].fjbh+'&bdid='+that.nowPlane[i].bdid).then((resData)=>{
                                    this.nextStep(resData.data);
                                })
                            }
                        }).catch((err)=>{
                            console.log(err)
                        })
                        break;
                    case '4':
                        this.playback = false;
                        if(this.tabs === 0){
                            this.tabs ++
                        }
                        this.name = 'name2';
                        break;
                    case 'PAD历史查询':
                        if(this.tabs1 === 0){
                            this.tabs1 ++
                        }
                        this.name = 'name3';
                        break;
                    case 'PAD实时监控':
                        this.realTimeModal = true;
                        break;
                }
            },
            //获取所有的颜色
            getColorAll(){               
                axios.post("http://192.168.0.174:8003/api/v1/yunavi/selectAllColor").then((res)=>{
                    this.colorAll = res.data.data;
                })
            },
            getColorByData(dataStr){
                var isshort = true;
                if(dataStr.length == 10){
                    dataStr = '0'+dataStr;
                }
                var agreement = dataStr.substr(4, 2);
                if(dataStr.length > 11 && dataStr.indexOf(',')>0){
                    isshort = false;
                    dataStrs = dataStr.split(',');
                    for(var i=0;i<dataStrs.length;i++){
                        if(dataStrs[i].length==10){
                            dataStrs[i] = '0'+dataStrs[i];
                        }
                    }
                    var agreement1 = dataStrs[0].substr(4, 2) + dataStrs[1].substr(4, 2);
                    var agreement2 = dataStrs[1].substr(4, 2) + dataStrs[0].substr(4, 2);
                }

                if(this.colorAll && this.colorAll.length>0){
                    for(var i=0;i<this.colorAll.length;i++){
                        var colora = this.colorAll[i].agreement;
                        if(isshort && agreement == colora  && this.colorAll[i].color){
                            return this.colorAll[i].color;
                        }else if(!isshort && (agreement1 == colora || agreement2 == colora) && this.colorAll[i].color){
                            return this.colorAll[i].color;
                        }
                    }
                }
                return 'blue';
            },
            //实时监控初始化
            watchInitData(){
                this.map.clearOverlays();
                this.fjbhStr = '';
                this.playback = false;
                this.watchData = [];
                this.nowPlaneData = [];
                this.nowPlane = [];
                if(this.watchTimer){
                    clearInterval(this.watchTimer);
                }
                if(this.backPlayTimer){
                    clearInterval(this.backPlayTimer);
                }
            },
            changePoint(dataArr){
                let points = [];
                for(let i = 0;i<dataArr.length;i++){
                    let point = new BMap.Point(dataArr[i].longi,dataArr[i].lati)
                    points.push(point)
                }
                return GpsToBaiduPoints(points)
            },
            nextStep(data){
                let dataTemp = {
                    id:data[0].fjbh,
                    data:data
                }
                this.nowPlaneData.push(dataTemp);
                if(this.nowPlaneData.length === this.nowPlane.length && this.nowPlaneData.length === 2){
                   for(let j = 0; j<this.nowPlaneData.length;j++){
                        let point = {
                            id:this.nowPlaneData[j].id,
                            points:this.changePoint(this.nowPlaneData[j].data),
                            myIcon: new BMap.Icon("http://192.168.0.174:8003/main/yunavi/images/plane.png", new BMap.Size(34, 30)),
                            infoWindow: new BMap.InfoWindow(),
                            marker: new BMap.Marker(),
                        };
                        for(var i=0;i<point.points.length;i++){
                            var tempP = [];
                            var prePoint = point.points[i];
                            var aftPoint = point.points[i+1];
                            tempP.push(prePoint);
                            tempP.push(aftPoint);
                            var color = "blue";
                            if(point.chjzljyl){
                                color = this.getColorByData(point.chjzljyl);
                            }
                            this.map.addOverlay(new BMap.Polyline(tempP,{
                                strokeColor: color,
                                strokeWeight: '2',
                                strokeOpacity: 'blue'
                            }));
                        }
                        this.watchData.push(point);
                    }
                    this.startWatch();
                }
            },
            startWatch(){
                this.watchTimer = setInterval(()=>{
                    let oneData = this.findPlaneNew();
                    //判断是否是新起飞的飞机，如果是则需要新建一个数据结构
                    if(this.fjbhStr.indexOf(item.fjbh)<0){
                       let point = {
                            id: oneData.fjbh,
                            points: [],
                            myIcon: new BMap.Icon("http://192.168.0.174:8003/main/yunavi/images/plane.png", new BMap.Size(34, 30)),
                            infoWindow: new BMap.InfoWindow(),
                            marker: new BMap.Marker()
                        };
                        this.watchData.push(point);
                    }
                     //转换坐标
                    var temp = [];
                    temp.push(oneData);
                    let newPoints = this.changePoint(temp);
                    for (let i = 0; i < this.watchData.length; i++) {
                        if (this.watchData[i].id == oneData.fjbh) {
                            this.watchData[i].points.push[newPoints[0]];
                            this.makeMarker(this.watchData[i], oneData);
                        }
                    }
                },1000)
            },
            findPlaneNew(){
                let t = new Date().getTime();
            },
            makeMarker(pointArr,item){
                let arrPois = pointArr.points;
                let myIcon = pointArr.myIcon;
                let infoWindow = pointArr.infoWindow;
                let marker2 = pointArr.marker;
                //infoWindow.setContent(content);
                marker2.setTitle(item.fjbh);
                if(item.angle){
                    marker2.setRotation(item.angle-45);
                }
                if(this.fjbhStr.indexOf(item.fjbh)<0){
                    this.map.setZoom(11);
                    this.map.setCenter(arrPois[arrPois.length-1]);
                    this.fjbhStr += item.fjbh+',';
                    marker2.setIcon(myIcon);
                    marker2.setPosition(arrPois[arrPois.length-1]);
                    //infoWindow.setTitle("飞机作业信息");
                    infoWindow.setWidth(375);
                    infoWindow.setHeight(72);
                    infoWindow.disableAutoPan();
                    infoWindow.disableCloseOnClick();
                    this.map.addOverlay(marker2);
                    marker2.addEventListener("click", function(){
                        marker2.openInfoWindow(infoWindow);
                    });
                }else{
                    marker2.setPosition(arrPois[arrPois.length-1]);
                    //画线
                    var arrPoisTemp = [];
                    arrPoisTemp.push(arrPois[arrPois.length-1]);
                    arrPoisTemp.push(arrPois[arrPois.length-2]);
                    if(item.chjzljyl){
                        var color = this.getColorByData(item.chjzljyl);
                    }else{
                        var color = 'blue';
                    }
                    this.map.addOverlay(new BMap.Polyline(arrPoisTemp, {strokeColor:color,strokeWeight:this.lineStyle.size,strokeOpacity:this.lineStyle.transparency}));
                }
            },
            removeTab(name){
                if(name === 'name2'){
                    this.tabs = 0;
                } else if(name === 'name3'){
                    this.tabs1 = 0;
                }
                this.name = 'name1'
            },
            moreInfoChange(val){
                this.moreInfo = val;
            },
            // 轨迹回放的查询按钮
            searchPlaneBD(formData){
                this.timeStart = formData.dataRange[0].getTime();
                this.timeEnd = formData.dataRange[1].getTime();
                let _this = this;
                axios.post(getPlaneDataTime+'?timeStart='+this.timeStart+'&timeEnd='+this.timeEnd+'&fjbh='+formData.planeNum+'&bdid='+formData.bdNum).then(function(res){
                        if(!res.data || res.data.length<=0){
                            //todo：提示该段时间时间内无飞机
                            return;
                        }
                        //回放右菜单飞机列表数据
                        _this.planeDataTime = res.data;
                        //要回放的飞机数组。temp：暂时认为回放全部 todo：回放选取的飞机
                        _this.toPlayData = _this.planeDataTime;
                        //格式化起始时间和终止时间
                        for(var i=0;i<_this.planeDataTime.length;i++){
                            _this.planeDataTime[i].timeStartStr = formatTimeToStr(_this.planeDataTime[i].timeStart);
                            _this.planeDataTime[i].timeEndStr = formatTimeToStr(_this.planeDataTime[i].timeEnd);
                        }
                }).catch((err)=>{
                    console.log(err)
                })
            },
            //选择要回放的飞机
            selcectToPlay(item){
                item.selected = !item.selected;
            },
            playBackInitData(){
                //清楚地图上所有的标记
                this.map.clearOverlays();
                //得到最早时间
                this.firstPointTime = new Date(this.planeDataTime[0].timeStart).getTime();
                this.playbackData = [];
                this.lastPointArr = [];
                this.fjbhStr = '';
                if(this.backPlayTimer){
                    clearInterval(this.backPlayTimer);
                }
                if(this.watchTimer){
                    clearInterval(this.watchTimer);
                }
            },
            //开始回放
            startPlay(){
                if(!this.planeDataTime || this.planeDataTime.length<=0){
                    //todo:提示先查询飞机
                    return;
                }
                this.playBackInitData();
                //选择要回放的飞机 如果没有选择则将默认回放所有的飞机
                let tempArr = [];
                for(var i=0;i<this.planeDataTime.length;i++){
                    if(this.planeDataTime[i].selected){
                        tempArr.push(this.planeDataTime[i]);
                    }
                }
                if(tempArr.length==0){
                    tempArr = this.planeDataTime;
                }
                //根据选取的时间段查询每架飞机的轨迹数据
                 this.searchPlanePlayData(tempArr);
            },
            //查询飞行轨迹数据
            searchPlanePlayData(playArr){
                let _this = this;
                for(var i=0;i<playArr.length;i++){
                    if(playArr[i].fjbh){
                        var fjbh = playArr[i].fjbh;
                    }                    
                    axios.post(getOnePlaneDataTime+'?timeStart='+this.timeStart+'&timeEnd='+this.timeEnd+'&fjbh='+fjbh).then(function(res){
                        //对轨迹数据进行数据结构处理
                        _this.backPlayNextStep(res.data);
                    }).catch((err)=>{
                    console.log(err)
                })
                }
            },
            //历史回放遍历存储飞机轨迹数据
            backPlayNextStep(data){
                var dataTemp = {
                    id:data[0].fjbh,
                    data:data
                }
                this.playbackData.push(dataTemp);
                if(this.playbackData.length == this.toPlayData.length){
                    //动态创建每架飞机的上一个点
                    this.createPointLast();
                }
            },
            //创建回放的每架飞机的上一个点
            createPointLast() {
                for (var i = 0; i < this.playbackData.length; i++) {
                    var lastPoint = {
                        id: this.playbackData[i].id,
                        points: [],
                        myIcon: new BMap.Icon("http://192.168.0.174:8003/main/yunavi/images/plane.png", new BMap.Size(34, 30)),
                        infoWindow: new BMap.InfoWindow(),
                        marker: new BMap.Marker()
                    };
                    this.lastPointArr.push(lastPoint);
                }
                //回放动作开始
                this.playAction();
            },
            //回放动作开始
            playAction(){
                //轮询获取可以画的点 backPlayInterval
                this.backPlayTimer = setInterval(()=>{
                    var isOver = true;
                    //判断是否回放完毕
                    for (var i = 0; i < this.playbackData.length; i++) {
                        if (this.playbackData[i].data.length > 0) {
                            isOver = false;
                        }
                    }
                    if (isOver) {
                        // todo 清楚循环
                        clearInterval(this.backPlayTimer);
                    }
                    //获取可以画的点
                    this.playNextPoints();
                },this.startRate)
            },
            //播放下一时间的点
            playNextPoints(){
                var toPlay = [];//可以画线的点
                for (var i = 0; i < this.playbackData.length; i++) {
                    if (this.playbackData[i].data && this.playbackData[i].data.length > 0) {
                        var time1 = new Date(this.playbackData[i].data[0].createTime).getTime();
                    } else {
                        continue;
                    }
                    if (time1 <= this.firstPointTime) {
                        toPlay.push(this.playbackData[i].data[0]);
                        this.playbackData[i].data.splice(0, 1);
                    }
                }
                this.firstPointTime = this.firstPointTime + this.cardRate;
                if (toPlay.length > 0) { 
                    for (var i = 0; i < toPlay.length; i++) {
                        //坐标转换
                        this.pointChange(toPlay[i]);
                    }
                } 
            },
            //坐标转换
            pointChange(item){
                var points = [];
                //根据经纬度创建原始坐标点
                var point = new BMap.Point(item.longi, item.lati);
                points.push(point);
                //将原始坐标转换为百度坐标
                var newPoints = GpsToBaiduPoints(points);
                var newPoint = {
                    id: item.fjbh,
                    point: newPoints[0]
                };
                this.translateCallback(newPoint, item);
            },
            //回放画线
            translateCallback(newPoint, item) {
                if(this.dataTable === null){
                    this.dataTable.push(item);
                }else{
                    this.dataTable.splice(0,1)
                    this.dataTable.push(item);
                }
                for (var i = 0; i < this.lastPointArr.length; i++) {
                    if (newPoint.id == this.lastPointArr[i].id) {
                        //保存上一个点
                        this.lastPointArr[i].points.push(newPoint.point);
                        this.makeMarker(this.lastPointArr[i], item);
                    }
                }
            },
            //播放暂停
            stopPlay(flage){
                if(flage){
                    this.playAction()
                }else{
                    clearInterval(this.backPlayTimer);
                }      
            },
            //重新播放
            reStartPlay(){
                this.startPlay();
            },
            changePage(page){
                this.historySearch(this.form,page,this.pageSize)
            },
            changePagePer(perPage){
                if(this.currentPage === 1){
                    this.historySearch(this.form,this.currentPage,perPage)
                }
            },
            historySearch(form,currentPage,pageSize){
                let startTime = form.dateRange[0].getTime();
                let endTime = form.dateRange[1].getTime();
                axios.post(historySearch+'?startTime='+startTime+'&endTime='+endTime+'&sendid='+form.sendid+'&fjbh='+form.fjbh+'&start='+currentPage+'&limit='+pageSize).then((res)=>{
                    this.currentPage = res.data.pageNum;
                    this.pageSize = res.data.pageSize;
                    this.total = res.data.total
                    this.data1 = res.data.list
                }).catch((err)=>{
                    console.log(err)
                })
            },
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
                                key: 'aimms20EndSeconds'
                            },
                            {
                                title: 'Day of Year',
                                key: 'aimms20DayofYear'
                            },
                            {
                                title: 'Year',
                                key: 'aimms20Year'
                            },
                            {
                                title: 'Hours(packet1)',
                                key: 'aimms20Hours'
                            },
                            {
                                title: 'Minutes(packet1)',
                                key: 'aimms20Minutes'
                            },
                            {
                                title: 'Seconds(packet1)',
                                key: 'aimms20Seconds'
                            },
                            {
                                title: 'Status',
                                key: 'aimms20Status'
                            },
                            {
                                title: 'Temperature',
                                key: 'aimms20Temperature'
                            },
                            {
                                title: 'RH',
                                key: 'aimms20RH'
                            },
                            {
                                title: 'Pressure',
                                key: 'aimms20Pressure'
                            },
                            {
                                title: 'Wind Flow N',
                                key: 'aimms20WindFlowN'
                            },
                            {
                                title: 'Wind Flow E',
                                key: 'aimms20WindFlowE'
                            },
                            {
                                title: 'Wind Speed',
                                key: 'aimms20WindSpeed'
                            },
                            {
                                title: 'Wind Direction',
                                key: 'aimms20WindDirection'
                            },
                            {
                                title: 'Wind Solution',
                                key: 'aimms20WindSolution'
                            },
                             {
                                title: 'Hours(packet2)',
                                key: 'aimms20Hours2'
                            },
                            {
                                title: 'Minutes(packet2)',
                                key: 'aimms20Minutes2'
                            },
                            {
                                title: 'Seconds(packet2)',
                                key: 'aimms20Seconds2'
                            },
                            {
                                title: 'Latitude',
                                key: 'aimms20Latitude'
                            },
                            {
                                title: 'Longitude',
                                key: 'aimms20Longitude'
                            },
                            {
                                title: 'Altitude',
                                key: 'aimms20Altitude'
                            },
                            {
                                title: 'Velocity N',
                                key: 'aimms20VelocityN'
                            },
                            {
                                title: 'Velocity E',
                                key: 'aimms20VelocityE'
                            },
                            {
                                title: 'Velocity D',
                                key: 'aimms20VelocityD'
                            },
                            {
                                title: 'Roll',
                                key: 'aimms20Roll'
                            },
                            {
                                title: 'Pitch',
                                key: 'aimms20Pitch'
                            },
                             {
                                title: 'Yaw',
                                key: 'aimms20Yaw'
                            },
                             {
                                title: 'TAS',
                                key: 'aimms20TAS'
                            },
                            {
                                title: 'Vertical Wind',
                                key: 'aimms20VerticalWind'
                            },
                             {
                                title: 'Sideslip Angle',
                                key: 'aimms20SideslipAngle'
                            },
                             {
                                title: 'AOA pres diff',
                                key: 'aimms20AoaPresDiff'
                            },
                             {
                                title: 'Sideslip Diff',
                                key: 'aimms20SideslipDiff'
                            },
                             {
                                title: 'UTC Seconds',
                                key: 'aimms20UtcSeconds'
                            },
                        ];
                        break;
                }
            },
            historySearch1(form1,currentPage1,pageSize1){
                let startTime = form1.dateRange[0].getTime();
                let endTime = form1.dateRange[1].getTime();
                axios.post(PADHistorySearch+'?timeStart='+startTime+'&timeEnd='+endTime+'&start='+currentPage1+'&limit='+pageSize1).then((res)=>{
                    this.currentPage1 = res.data.pageNum;
                    this.pageSize1 = res.data.pageSize;
                    this.total1 = res.data.total
                    this.data2 = res.data.list
                }).catch((err)=>{
                    console.log(err)
                })
            },
            changePage1(page){
                this.historySearch1(this.form1,page,this.pageSize1)
            },
            changePagePer1(perPage){
                if(this.currentPage1 === 1){
                    this.historySearch1(this.form1,this.currentPage1,perPage)
                }
            },
            //实时监控模态框
            closeModal(){
                this.realTimeModal = false;
            },
            //地图设置
            commit(form){
                this.mapSettingModal = false;
                this.lineStyle = form;
                if(form.zoom){
                    this.map.enableScrollWheelZoom(); //开启鼠标滚轮缩放
                }else{
                    this.map.disableScrollWheelZoom();
                }
                if(form.dragSwitch){
                    this.map.enableDragging();  //缩放
                }else{
                    this.map.disableDragging();
                }
            },
            //颜色设置
            commitColor(form){
                this.colorPickModal = false;
                let colors = 'a'
                for(let i =0;i<form.length;i++){
                    colors += form[i].colorId+','+form[i].name+',y,'
                }
                colors = colors.substring(1,colors.length-3)
                axios.post("http://192.168.0.174:8003/api/v1/yunavi/color/updateAll"+'?colors='+colors)
            },
            //地图控件
            openDrawingManager(tyId){
                this.drawingManager = new BMapLib.DrawingManager(map,{
                    isOpen: true, //是否开启绘制模式
                    enableDrawingTool: true, //是否显示工具栏
                    drawingToolOptions: {
                        anchor: BMAP_ANCHOR_TOP_RIGHT, //位置
                        offset: new BMap.Size(5, 5), //偏离值
                    },
                    drawingMode: tyId,
                    circleOptions: this.styleOptions, //圆的样式
                    polylineOptions: this.styleOptions, //线的样式
                    polygonOptions: this.styleOptions, //多边形的样式
                    rectangleOptions: this.styleOptions //矩形的样式
                });
                this.drawingManager.addEventListener();
            },
            //拖动
            drag(){
                this.openDrawingManager(this.commonFaction[0].id)
                this.map.setDefaultCursor("url('bird.cur')");
            },
            //点
            point(){
                this.openDrawingManager(this.commonFaction[1].id)
            },
            //圆
            circular(){
                this.openDrawingManager(this.commonFaction[2].id)
            },
            //折线,
            broken(){
                this.openDrawingManager(this.commonFaction[3].id)
            },
            //矩形
            rectangle(){
                this.openDrawingManager(this.commonFaction[4].id)
            },
            //测距
            measure(){
                this.openDrawingManager(this.commonFaction[5].id)
            },
            //清除
            clear(){
                console.log(222)
            },
            //飞机列表多选
            changeCheckbox(val){
                console.log(val)
            },
            //播放按钮
            jian(){
                if(this.playRate !== 1){
                    this.playRate /= 2
                    this.startRate = this.startRate * this.playRate
                    this.stopPlay(false);
                }
                this.stopPlay(true);
            },
            add(){
                if(this.playRate !== 16){
                    this.playRate *= 2
                    this.startRate = this.startRate / this.playRate
                    this.stopPlay(false);
                }
                this.stopPlay(true);
            },
            stop(){
                this.reStartPlay()
            },
            play(){
                let a = document.getElementById('play');
                if(a.classList[1] === 'ivu-icon-ios-play'){
                    a.classList.replace('ivu-icon-ios-play','ivu-icon-ios-pause');
                    this.stopPlay(true);
                }else{
                    a.classList.replace('ivu-icon-ios-pause','ivu-icon-ios-play');
                    this.stopPlay(false);
                }
            },
            //重置地图
            resetMap(){
                window.location.reload()
            },
            //错误页面
            close(){
                this.errorModal = false;
            },
        }
    }
</script>

<style lang="less">
  @import "home.less";
    .anchorBL{
    display:none;
  }
  .ivu-tabs-card {
      height: 100%;
  }
  .ivu-tabs-content{
      height:100%;
  }
    .ivu-row{
        margin: 0;
    }
    .ivu-form-item-content{
        text-align: left;
    }
    .historyInfo{
        // width: 70% !important;
        padding-left: 50px;
        margin-top: 5px;
    }
    .historyBtn{
        padding: 5px  40px;
    }
</style>
