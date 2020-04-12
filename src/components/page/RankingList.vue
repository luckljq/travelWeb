<template>
    <div>
        <div>
            <div class="center" >
                <el-card class="box-card">
                    <el-divider><i class="el-icon-s-data" style="font-size: 30px; color: #ff9d00;">
                        <span style="color:#666;">&nbsp;景点排行榜</span>
                    </i>
                    </el-divider>
                    <div style="padding-top: 20px">
                        <el-row :gutter="60">
                            <el-col :span="12">
                                <div class="rank">
                                    <div class="rank-title">
                                        最受欢迎榜
                                    </div>
                                    <div class="rank-info" v-for="(item,i) in likeList" @mouseenter="showImage(i)">
                                        <div v-show="!item.flag" >
                                            <el-tag class="strategy-tag">{{i + 1}}</el-tag>
                                            <el-link :underline="false" class="aa">
                                                {{item.scenicSpotName}}
                                            </el-link>
                                            <div style="float: right; margin-right: 20px; font-size: 17px">
                                                <i class="el-icon-top"
                                                   style="color:red; font-size: 18px; line-height: 28px"
                                                ></i>
                                                {{item.recommendTotal}}
                                            </div>
                                        </div>
                                        <div v-show="item.flag">
                                            <el-row :gutter="10">
                                                <el-col :span="12">
                                                    <div style="padding: 10px">
                                                    <el-image style="height: 150px;"
                                                              :src=" 'http://localhost' + item.image"></el-image>
                                                    </div>
                                                </el-col>
                                                <el-col :span="12">
                                                    <div style="padding: 10px">
                                                        <div>
                                                            <el-tag class="strategy-tag2">{{i + 1}}</el-tag>
                                                        </div>
                                                        <div>
                                                            <el-link target="_blank"
                                                                    :href="spotUrl + item.scenicSpotId"
                                                                    :underline="false" class="bb">
                                                                {{item.scenicSpotName}}
                                                            </el-link>
                                                        </div>
                                                        <div class="cc">
                                                            <i class="el-icon-top"
                                                               style="color:red; font-size: 18px; line-height: 28px"
                                                            ></i>
                                                            {{item.recommendTotal}}
                                                        </div>
                                                    </div>
                                                </el-col>
                                            </el-row>
                                        </div>
                                    </div>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="rank">
                                    <div class="rank-title">
                                        点击总量榜
                                    </div>
                                    <div class="rank-info" v-for="(item,i) in clickList" @mouseenter="showImage2(i)">
                                        <div v-show="!item.flag" >
                                            <el-tag class="strategy-tag">{{i + 1}}</el-tag>
                                            <el-link :underline="false" class="aa">
                                                {{item.scenicSpotName}}
                                            </el-link>
                                            <div style="float: right; margin-right: 20px; font-size: 17px">
                                                <i class="el-icon-top"
                                                   style="color:red; font-size: 18px; line-height: 28px"
                                                ></i>
                                                {{item.recommendTotal}}
                                            </div>
                                        </div>
                                        <div v-show="item.flag">
                                            <el-row :gutter="10">
                                                <el-col :span="12">
                                                    <div style="padding: 10px">
                                                        <el-image style="height: 150px;"
                                                                  :src=" 'http://localhost' + item.image"></el-image>
                                                    </div>
                                                </el-col>
                                                <el-col :span="12">
                                                    <div style="padding: 10px">
                                                        <div>
                                                            <el-tag class="strategy-tag2">{{i + 1}}</el-tag>
                                                        </div>
                                                        <div>
                                                            <el-link target="_blank"
                                                                     :href="spotUrl + item.scenicSpotId"
                                                                     :underline="false" class="bb">
                                                                {{item.scenicSpotName}}
                                                            </el-link>
                                                        </div>
                                                        <div class="cc">
                                                            <i class="el-icon-top"
                                                               style="color:red; font-size: 18px; line-height: 28px"
                                                            ></i>
                                                            {{item.recommendTotal}}
                                                        </div>
                                                    </div>
                                                </el-col>
                                            </el-row>
                                        </div>
                                    </div>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </el-card>
            </div>
        </div>
    </div>
</template>
<script>
    import {getLikeRankList, getClickRankList} from '../../api/spot'
    export default {
        name: 'rankingList',
        data() {
            return {
                spotUrl: "http://" + location.hostname + ":" + location.port + "/spot?s=",
                show:false,
                likeList:[],
                clickList:[],
            }
        },
        methods:{
            getClickList() {
                getClickRankList().then(res => {
                    this.clickList = res.data;
                    this.clickList[0].flag = true;
                })
            },
            getLikeRank() {
                getLikeRankList().then(res => {
                    this.likeList = res.data;
                    this.likeList[0].flag = true;
                })
            },
            showImage(i){
                this.likeList.forEach( i => {
                    i.flag = false;
                });
                this.likeList[i].flag = true;
            },
            showImage2(i){
                this.clickList.forEach( i => {
                    i.flag = false;
                });
                this.clickList[i].flag = true;
            }
        },
        created() {
            this.getLikeRank();
            this.getClickList();
        }
    }
</script>
<style scoped>
    .cc {
        padding-top: 15px;
    }
    .bb {
        padding-top: 15px;
        font-size: 18px;
        color: #ff9d00;
    }
    .aa{
        font-size: 17px;
        margin-left: 8px;
        padding-bottom: 4px;
    }
    .strategy-tag {
         margin-left: 20px;
         line-height: 26px;
         background-color:#ff9d00;
         color: white;
         font-size: 15px;
     }
    .strategy-tag2 {
        margin-top: 10px;
        line-height: 26px;
        background-color:#ff9d00;
        color: white;
        font-size: 17px;
    }
    .rank-title {
        background-color: #3C3C3C;
        color: white;
        font-size: 20px;
        text-align: center;
        padding: 10px;
    }
    .rank-info {
        padding-top: 10px;
        padding-bottom: 10px;
        /*min-height: 200px;*/
    }
    .rank {
        border: 1px solid #eee;
    }
    .center {
        padding-top: 40px;
        padding-bottom: 40px;
        margin:0 auto;
        width: 1000px;
    }
</style>
