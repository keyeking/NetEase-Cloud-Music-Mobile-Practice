<template>
<div class='container' v-height='126'>
    <Loading v-if='loading'></Loading>
    <div class="pic">
        <div class="hot">

        </div>
        <span v-if='songInfo.updateTime'>
            更新时间：{{songInfo.updateTime | formatTime}}
        </span>
    </div>
    <ul class='top-list'>
        <li v-for='(item,index) in topList' :key='index' @click='toPlayer(item)'>
            <p class="name">{{item.name}}</p>
            <div class="info">
                <i class='sq' v-if='item.copyright == 0'></i>
                <span class='zj'>
                    {{item.ar[0].name}}-{{item.al.name}}
                </span>
            </div>
            <i class='play'></i>
        </li>
    </ul>

</div>
</template>

<script>
import moment from 'moment'
import Loading from '@/components/Loading'
export default {
    name: 'Hot',
    components: {
        Loading
    },
    created() {
        this.getTopList()
    },
    data() {
        return {
            topList: [], //榜单歌曲list
            songInfo: {},
            loading: false
        }
    },
    methods: {
        // 榜单歌曲
        getTopList() {
            this.loading = true;
            this.$http.post("/api/top/list?idx=1").then(res => {
                if (res.statusText == 'OK' && res.status == 200) {
                    this.topList = res.data.playlist.tracks.slice(0, 80);
                    this.songInfo = res.data.playlist;
                } else {
                    console.error('系统错误')
                }
                this.loading = false;
            }).catch((err) => {
                console.error('系统错误')
                this.loading = false;
            })
        },
        toPlayer(data) {
            console.log(data)
            let obj = {
                path: '/player',
                query: {
                    picUrl: data.al.picUrl,
                    name: data.name,
                    id: data.id
                }
            }
            this.$router.push(obj)
        },
    },
    filters: {
        formatTime(val) {
            if (val) {
                return moment(val).format('MM月DD日')
            }

        }
    }
}
</script>

<style lang="less" scoped>
.container {
    overflow: auto;
}

.pic {
    position: relative;
    height: 146px;
    padding-left: 20px;
    padding-top: 20px;
    overflow: hidden;
    background: url('../../../../assets/img/hot_music_bg.jpg') no-repeat;
    background-size: contain;

    .hot {
        width: 142px;
        height: 67px;
        background: url('../../../../assets/img/index_icon.jpg') no-repeat;
        background-size: 166px 97px;
        background-position: -24px -30px;
    }

    span {
        font-size: 12px;
        color: #fff;
        line-height: 24px;
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
</style>
