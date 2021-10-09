<template>
    <div class="mask">
           <Loading class="icon" type="spinner" size="34px" />
        </div>
</template>

<script>
import { Loading } from 'vant';
import 'vant/lib/loading/style';
    export default {
        components:{
            Loading
        }
    }
</script>

<style lang="less" scoped>
.mask{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.2);
    z-index: 100;
    display: flex;
    justify-content: center;
   align-items: center;
   .icon{
    color: #fff;
   }

}
</style>