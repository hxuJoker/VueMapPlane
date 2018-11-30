<template>
    <div id="error">
        <Modal v-model="errorModal" width="360">
        <p slot="header" style="color:#f60;text-align:center">
            <Icon type="ios-information-circle"></Icon>
            <span>错误提示</span>
        </p>
        <div style="text-align:center">
            <p>{{errorContent}}</p>
        </div>
        <div slot="footer">
            <Button type="error" size="large" long  @click="close">关闭</Button>
        </div>
    </Modal>
    </div>
</template>

<script>
export default {
    props:{
        errorModal:Boolean,
        errorContent:String,
    },
    methods:{
        close(){
            this.$emit('close')
        }
    }
    
}
</script>

<style lang="less">

</style>

