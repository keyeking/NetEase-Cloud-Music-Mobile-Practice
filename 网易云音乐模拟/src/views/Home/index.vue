<template>
    <div>
        <div class="header">
            <img src="../../assets/img/01.gif" alt="">
            <img src="../../assets/img/02.gif" alt="">
        </div>
        <Tabs @change="changeTab" v-model="active" title-active-color="#ee0a24" line-width="60px">
            <Tab title="推荐音乐"></Tab>
             <Tab title="热歌榜"></Tab> 
             <Tab title="搜索"></Tab>
        </Tabs>
        <div v-if="modelType">
            <component :is="modelType"></component>
        </div>
    </div>
</template>

<script>
import 'vant/lib/tab/style';
import 'vant/lib/tabs/style';
import { Tab, Tabs } from 'vant';
import Recommend from "./components/Recommend/index.vue"
import Hot from "./components/Hot/index.vue"
import Search from "./components/Search/index.vue"

    export default {
        components:{         
            Tab,
            Tabs,
            'Recommend':()=>import("./components/Recommend/index.vue"),
            'Hot':()=>import("./components/Hot/index.vue"),
            'Search':()=>import("./components/Search/index.vue"),

        },
        data(){
            return{
                active:0,
                modelType:'Recommend'
            }
        },
        methods:{
            changeTab(val){
                if(val==0){
                    this.modelType='Recommend'
                }else if(val==1){
                    this.modelType='Hot'
                }
                else if(val==2){
                    this.modelType='Search'
                }
            }
        }
    }
</script>

<style lang="less" scoped>
.header{
    padding: 20px 5px;
    background: #d43c33;
   display: flex;
   justify-content: space-between;
   align-items: center;

}
&/deep/ .van-tabs__wrap{
    border-bottom:1px solid #ccc;
}

</style>