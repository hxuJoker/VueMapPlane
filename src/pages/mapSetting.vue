<template>
    <div id="mapSetting">
        <Modal v-model="mapSettingModal" draggable :closable='false' title="地图设置" width='500'>
            <Form>
                <FormItem label="拖拽">
                    <i-switch v-model="form.dragSwitch" @on-change="change('1')" style="margin-left: 20px"></i-switch>             
                </FormItem>
                <FormItem label="缩放">
                    <i-switch v-model="form.zoom" @on-change="change('2')" style="margin-left: 20px" ></i-switch>                               
                </FormItem>
                <FormItem label="线条粗细">
                    <InputNumber :min="1" v-model="form.size"></InputNumber>
                </FormItem>
                <FormItem label="透明度">
                    <InputNumber :max="1" :min="0" :step='0.1' v-model="form.transparency" style="margin-left:12px"></InputNumber>           
                </FormItem>
            </Form>
            <div slot="footer">
                <Button @click='commit(form)'>确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
export default {
    name:'mapSetting',
    props:{
        mapSettingModal:Boolean
    },
    data(){
        return {
            form:{
                dragSwitch:true,
                zoom:true,
                size:10,
                transparency:1
            }
            
        }
    },
    methods:{
        //启用开关事件
        change(status){
            switch (status){
                case '1':
                    this.form.dragSwitch = this.form.dragSwitch;
                    break;
                case "2":
                    this.form.zoom = this.form.zoom;
                    break;
            }
        },
        commit(form){
            this.$emit('commit',form)
        }
    }
}
</script>

<style lang='less'>
.ivu-icon{
    padding: 0 !important
}
</style>
