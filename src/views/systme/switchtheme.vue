<template>
    <div class="seitchtheme_m">
        <h5>更换皮肤以查看不同皮肤的前端网站</h5>
        <div>
            <span>更换皮肤：</span>
            <el-select v-model="skinvalue" @change="selectbian" placeholder="请选择皮肤">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <div class="Submit1">
                <el-button @click="skinSubmit" :loading="skinloading" type="primary">提交</el-button>
                <a v-if="skinAsk" class="to_front_web" target="_blank" :href="skinLink"><el-button type="success" round>查看&nbsp;{{skinlabel}}&nbsp;站点</el-button></a>
                
            </div>
        </div>
        
    </div>
        
    
</template>

<script>
//console.log(process.env.VUE_APP_BASE_API);
import {requesterr, switchthemeApi} from '@/api/user'
import EventBus from '@/utils/EventBus.js'
export default {
    
    data() {
        return {
            options: [{
                value: 'beauty',
                label: '图片站-美图',
                link:'/?'
                },{
                value: 'googleimage',
                label: '图片站-默认',
                link:'/?'
                },{
                value: 'manual',
                label: '文档站',
                link:'/?'
                }, {
                value: 'webdirectory',
                label: '导航站',
                link:'/?'
                }, {
                value: 'videoblog',
                label: '视频站',
                link:'/?'
                }],
            skinvalue: '',
            skinlabel:'',
            skinLink: '',
            skinAsk: false,
            skinloading:false,

            skinForm:{
                theme:''
            }
        }
    },

    // 实例还没挂载
  created() {
    //this.skinSubmit();
    //console.log(this.imgurl);
  },    
    methods: {
        skinSubmit() {
            let thiss = this;
            this.skinloading = true;
            this.skinForm.theme = this.skinvalue;
            switchthemeApi(this.skinForm).then(response => {
                let datamain = response.data;
                if (datamain.code == 1) {
                    
                    this.$store.dispatch('settings/thmename', this.skinlabel)
                    thiss.$message({showClose: true,message: datamain.msg,type: 'success'});
                    //this.subloading = false;
                    this.skinAsk = true;
                    EventBus.$emit('mkdirSuccess'); //触发菜单栏刷新
                } else {
                    thiss.$message({showClose: true,message: datamain.err,type: 'error'});
                }

                this.skinloading = false;
                
            }).catch(error => {
                this.skinloading = false;
                requesterr(this, error);
            });
        },

        selectbian(thisop) {
            //console.log(thisop);
            this.options.forEach(element => {
                if (element.value == thisop) {
                    this.skinlabel = element.label;
                    this.skinLink = element.link + Math.round(Math.random()*1000);
                }
            });
            this.skinAsk = false;
        }
    }
}
</script>

<style lang="scss">
.seitchtheme_m{
    padding:26px 5% 47px 5%;
    .el-select{width:88%;margin:25px 0;}
    .Submit1{margin:20px 0;text-align:center;}
    h5{font-size:18px;font-weight:bold;}
    .to_front_web{display:block;margin:16px 0;}
}
    
</style>