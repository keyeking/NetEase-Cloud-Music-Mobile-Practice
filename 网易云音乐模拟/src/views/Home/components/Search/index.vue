<template>
<div class='container' v-height='126'>
    <Loading v-if='loading'></Loading>
    <Search @input='subKey' @blur='saveKey' @clear='clearKey' v-model="searchValue" shape="round" background="#fff" placeholder="搜索歌曲、歌手、专辑" />
    <!-- 热门搜索 -->
    <div class="hot-key" v-if='isShowKey'>
        <h3>热门搜索</h3>
        <span @click="subKey(item.first)" class='hot-item' v-for="(item,index) in hotKeyList" :key='index'>{{item.first}}</span>
    </div>
    <ul class='top-list' v-if='keySongsList.length && !isShowKey'>
        <li v-for='(item,index) in keySongsList' :key='index' @click='toPlayer(item)'>
            <p class="name">{{item.name}}</p>
            <div class="info">
                <i class='sq' v-if='item.fee == 0'></i>
                <span class='zj'>
                    {{item.name}}-{{item.artists[0].name}}
                </span>
            </div>
            <i class='play'></i>
        </li>
    </ul>
    <!-- 已经查询列表 -->
    <ul v-if='isShowKey' class='show-key'>
        <li v-for='(item,index) in doList' :key='index'>
            <Icon color='#ccc' class='icon1' name='clock-o'></Icon>
            <span>{{item}}</span>
            <Icon color='#ccc' @click='removeKey(item)' class='icon2' name='cross'></Icon>
        </li>
    </ul>
</div>
</template>

<script>
import {
    Search
} from 'vant';
import 'vant/lib/icon/style';
import 'vant/lib/search/style';
import {
    Icon
} from 'vant';
import Loading from '@/components/Loading'
export default {
    components: {
        Search,
        Loading,
        Icon
    },
    data() {
        return {
            searchValue: null, //热搜词查询关键字
            hotKeyList: [], //热搜词列表
            isShowKey: true, //是否显示热搜词
            keySongsList: [], // 关键字查询后返回的歌曲列表
            loading: false,
            doList: []
        }
    },
    created() {
        this.getHotKey()
    },
    methods: {
        toPlayer(data) {
            console.log(data)
            let obj = {
                path: '/player',
                query: {
                    picUrl: data.artists[0].img1v1Url,
                    name: data.name,
                    id: data.id,
                    nickName: data.artists[0].name
                }
            }
            this.$router.push(obj)
        },
        getHotKey() {
            this.loading = true;
            this.$http.post("/api/search/hot").then(res => {

                if (res.statusText == 'OK' && res.status == 200) {
                    this.hotKeyList = res.data.result.hots;
                } else {
                    console.error(res.statusText)
                }
                this.loading = false;
            }).catch((err) => {
                console.error('系统错误')
                this.loading = false;
            })
        },
        // 当搜索框查询的时候
        inputKey(val) {
            if (val) {
                this.isShowKey = false;
            }
        },
        //提交关键查询
        subKey(val) {
            if (!val) return;
            this.searchValue = val;

            if (!this.doList.includes(this.searchValue)) {
                this.doList.push(val)
            }
            this.isShowKey = false;
            this.getKeyInfo()
        },
        clearKey() {
            // 当清空关键字的时候显示热搜词
            this.isShowKey = true;
        },
        saveKey() {
            if (this.searchValue && !this.doList.includes(this.searchValue)) {
                this.doList.push(this.searchValue)
            }
        },
        // 删除查询记录
        removeKey(val) {
            this.doList = this.doList.filter((item) => item != val)
        },
        // 关键字查询接口
        getKeyInfo() {
            this.loading = true;
            this.$http.get('/api/search', {
                params: {
                    keywords: this.searchValue
                }
            }).then(res => {
                if (res.statusText == 'OK' && res.status == 200) {
                    this.keySongsList = res.data.result.songs;

                } else {
                    console.error(res.statusText)
                }
                this.loading = false;
            }).
            catch((err) => {
                console.error('系统错误')
                this.loading = false;
            })
        }
    }
}
</script>

<style lang="less" scoped>
&/deep/ .van-search {
    border-bottom: 0.5px solid rgba(0, 0, 0, .1);
}

.container {
    overflow: auto;
}

.hot-key {
    padding: 0 10px;

    h3 {
        line-height: 45px;
        font-size: 12px;
    }

    .hot-item {
        display: inline-block;
        border: 1px solid #d3d4da;
        border-radius: 32px;
        height: 32px;
        margin-right: 8px;
        margin-bottom: 8px;
        padding: 0 14px;
        font-size: 14px;
        line-height: 32px;
        color: #333;
    }
}

.top-list {
    padding-left: 10px;

    li {
        padding: 5px 0;
        border-bottom: 0.5px solid rgba(0, 0, 0, .1);
        padding-right: 32px;
        position: relative;

        .play {
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            width: 22px;
            height: 22px;
            background: url('../../../../assets/img/index_icon.jpg');
            background-repeat: no-repeat;
            background-position: -24px 0;
            background-size: 166px 97px;
        }

        .name {
            font-size: 17px;
        }

        .info {
            .zj {
                font-size: 12px;
                color: #888;
            }

            .sq {
                display: inline-block;
                width: 12px;
                height: 8px;
                margin-right: 4px;
                background: url('../../../../assets/img/index_icon.jpg');
                background-size: 166px 97px;
            }
        }
    }
}

.show-key {
    padding: 0 10px;
    margin-top: 15px;

    li {
        line-height: 40px;
        position: relative;
        border-bottom: 0.5px solid rgba(0, 0, 0, .1);

        .icon1 {
            margin-right: 10px;
            vertical-align: middle;
        }

        span {
            vertical-align: middle;
        }

        .icon2 {
            vertical-align: middle;
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
        }
    }
}
</style>
