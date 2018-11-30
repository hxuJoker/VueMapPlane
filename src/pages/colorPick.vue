<template>
  <div id="colorPick">
    <Modal v-model="colorPickModal" draggable :closable="false" title="颜色设置" width="500">
      <table
        border="1"
        cellpadding="2"
        cellspacing="0"
        style="text-align: center;margin-left: 10px;"
      >
        <tr>
          <td></td>
          <td style="width: 80px;">碘化银-丙酮</td>
          <td>吸湿性粗粉</td>
          <td>液碳</td>
          <td>焰条</td>
          <td>焰弹</td>
          <td>液氮</td>
          <td>其他</td>
        </tr>
        <tr>
          <td>其他</td>
          <td>
            <input
              id="color_other_dian"
              name="color_other_dian"
              class="playaction"
              type="color"
              v-model="form[0].name"
            >
          </td>
          <td>
            <input
              id="color_other_xicu"
              name="color_other_xicu"
              class="playaction"
              type="color"
              v-model="form[1].name"
            >
          </td>
          <td>
            <input
              id="color_other_co"
              name="color_other_co"
              class="playaction"
              type="color"
              v-model="form[2].name"
            >
          </td>
          <td>
            <input
              id="color_other_yantiao"
              name="color_other_yantiao"
              class="playaction"
              type="color"
              v-model="form[3].name"
            >
          </td>
          <td>
            <input
              id="color_other_yandan"
              name="color_other_yandan"
              class="playaction"
              type="color"
              v-model="form[4].name"
            >
          </td>
          <td>
            <input
              id="color_other_yedan"
              name="color_other_yedan"
              class="playaction"
              type="color"
              v-model="form[5].name"
            >
          </td>
          <td>
            <input
              id="color_other_other"
              name="color_other_other"
              class="playaction"
              type="color"
              v-model="form[6].name"
            >
          </td>
        </tr>
        <tr>
          <td>液氮</td>
          <td>
            <input
              id="color_yedan_dian"
              name="color_yedan_dian"
              v-model="form[7].name"
              class="playaction"
              type="color"
            >
          </td>
          <td>
            <input
              id="color_yedan_xicu"
              name="color_yedan_xicu"
              v-model="form[8].name"
              class="playaction"
              type="color"
            >
          </td>
          <td>
            <input
              id="color_yedan_co"
              name="color_yedan_co"
              v-model="form[9].name"
              class="playaction"
              type="color"
            >
          </td>
          <td>
            <input
              id="color_yedan_yantiao"
              name="color_yedan_yantiao"
              v-model="form[10].name"
              class="playaction"
              type="color"
            >
          </td>
          <td>
            <input
              id="color_yedan_yandan"
              name="color_yedan_yandan"
              v-model="form[11].name"
              class="playaction"
              type="color"
            >
          </td>
          <td>
            <input
              id="color_yedan_yedan"
              name="color_yedan_yedan"
              v-model="form[12].name"
              class="playaction"
              type="color"
            >
          </td>
        </tr>
        <tr>
          <td>焰弹</td>
          <td>
            <input
              id="color_yandan_dian"
              name="color_yandan_dian"
              v-model="form[13].name"
              class="playaction"
              type="color"
            >
          </td>
          <td>
            <input
              id="color_yandan_xicu"
              name="color_yandan_xicu"
              v-model="form[14].name"
              class="playaction"
              type="color"
            >
          </td>
          <td>
            <input
              id="color_yandan_co"
              name="color_yandan_co"
              v-model="form[15].name"
              class="playaction"
              type="color"
            >
          </td>
          <td>
            <input
              id="color_yandan_yantiao"
              name="color_yandan_yantiao"
              v-model="form[16].name"
              class="playaction"
              type="color"
            >
          </td>
          <td>
            <input
              id="color_yandan_yandan"
              name="color_yandan_yandan"
              v-model="form[17].name"
              class="playaction"
              type="color"
            >
          </td>
        </tr>
        <tr>
          <td>焰条</td>
          <td>
            <input
              id="color_yantiao_dian"
              name="color_yantiao_dian"
              v-model="form[18].name"
              class="playaction"
              type="color"
            >
          </td>
          <td>
            <input
              id="color_yantiao_xicu"
              name="color_yantiao_xicu"
              v-model="form[19].name"
              class="playaction"
              type="color"
            >
          </td>
          <td>
            <input
              id="color_yantiao_co"
              name="color_yantiao_co"
              v-model="form[20].name"
              class="playaction"
              type="color"
            >
          </td>
          <td>
            <input
              id="color_yantiao_yantiao"
              name="color_yantiao_yantiao"
              v-model="form[21].name"
              class="playaction"
              type="color"
            >
          </td>
        </tr>
        <tr>
          <td>液碳</td>
          <td>
            <input
              id="color_co_dian"
              name="color_co_dian"
              v-model="form[22].name"
              class="playaction"
              type="color"
            >
          </td>
          <td>
            <input
              id="color_co_xicu"
              name="color_co_xicu"
              v-model="form[23].name"
              class="playaction"
              type="color"
            >
          </td>
          <td>
            <input
              id="color_co_co"
              name="color_co_co"
              v-model="form[24].name"
              class="playaction"
              type="color"
            >
          </td>
        </tr>
        <tr>
          <td>吸湿性粗粉</td>
          <td>
            <input
              id="color_xicu_dian"
              name="color_xicu_dian"
              v-model="form[25].name"
              class="playaction"
              type="color"
            >
          </td>
          <td>
            <input
              id="color_xicu_xicu"
              name="color_xicu_xicu"
              v-model="form[26].name"
              class="playaction"
              type="color"
            >
          </td>
        </tr>
        <tr>
          <td>碘化银-丙酮</td>
          <td>
            <input
              id="color_dian_dian"
              name="color_dian_dian"
              v-model="form[27].name"
              class="playaction"
              type="color"
            >
          </td>
        </tr>
        <tr>
          <td>飞行轨迹</td>
          <td>
            <input
              id="color_fly"
              name="color_fly"
              v-model="form[28].name"
              class="playaction"
              type="color"
            >
          </td>
        </tr>
      </table>
      <div slot="footer">
        <Button @click="commitColor(form)">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  props: {
    colorPickModal: Boolean
  },
  data() {
    return {
      form: [
          {id:'color_other_dian',name: ""},
          {id:'color_other_xicu',name: ""},
          {id:'color_other_co',name: ""},
          {id:'color_other_co',name: ""},
          {id:'color_other_yandan',name: ""},
          {id:'color_other_yedan',name: ""},
          {id:'color_other_other',name: ""},

          {id:'color_yedan_dian',name: ""},
          {id:'color_yedan_xicu',name: ""},
          {id:'color_yedan_co',name: ""},
          {id:'color_yedan_yantiao',name: ""},
          {id:'color_yedan_yandan',name: ""},
          {id:'color_yedan_yedan',name: ""},

          {id:'color_yandan_dian',name: ""},
          {id:'color_yandan_xicu',name: ""},
          {id:'color_yandan_co',name: ""},
          {id:'color_yandan_yantiao',name: ""},
          {id:'color_yandan_yandan',name: ""},

          {id:'color_yantiao_dian',name: ""},
          {id:'color_yantiao_xicu',name: ""},
          {id:'color_yantiao_co',name: ""},
          {id:'color_yantiao_yantiao',name: ""},

          {id:'color_co_dian',name: ""},
          {id:'color_co_xicu',name: ""},
          {id:'color_co_co',name: ""},

          {id:'color_xicu_dian',name: ""},
          {id:'color_xicu_xicu',name: ""},
          {id:'color_dian_dian',name: ""},
          {id:'color_fly',name: ""}, 
      ]
    };
  },
  mounted(){
        axios.post("http://192.168.0.174:8003/api/v1/yunavi/selectAllColor").then((res)=>{
            for(let i =0; i<res.data.data.length;i++){
                for(let j = 0;j<this.form.length;j++){
                   if(res.data.data[i].inputId === this.form[j].id){
                       this.form[j].name = res.data.data[i].color
                       this.form[j].colorId = res.data.data[i].colorId
                   }
                }
            }
        })
  },
  methods:{
    commitColor(form){
        this.$emit('commitColor',form)
    }
  }
};
</script>

<style lang="less">
</style>

