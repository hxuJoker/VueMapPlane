t<template>
    <div style="position:fixed;top:38px">
        <Poptip placement="right" width="200">
        <Button class="btnCircle"><Icon type="ios-add-circle" /></Button>
            <div class="playCss" slot="content">
                <i class="ivu-icon ivu-icon-md-remove"  @click="jian"/>
                <Input v-model="playRate" disabled></Input>
                <i class="ivu-icon ivu-icon-md-add"  @click="add"/>
                <i id="play" class="ivu-icon ivu-icon-ios-play"  @click="play"/>
                <i class="ivu-icon ivu-icon-md-square"  @click="stop"/>
            </div>
        </Poptip>
    </div>
</template>

<script>
    export default {
      name: 'map',
      props:{
          playRate:Number
      },
      data(){
          return {
              
          }
      },
      methods:{
         //播放按钮
            jian(){
                this.$emit('jian')
            },
            add(){
                this.$emit('add')
            },
            stop(){
                this.$emit('stop')
            },
            play(){
                this.$emit('play')
            },
      }
    }
</script>

<style lang="less">
 .btnCircle{
     padding: 5px 5px 6px !important;
     .ivu-icon{
         font-size: 20px
     }
 }
 .playCss{
     .ivu-input-wrapper{
        width: 20%;
        .ivu-input{
            height: 20px;
        }
    }
    .ivu-icon{
        font-size: 20px;
        cursor: pointer;
    }
 }
 
</style>
