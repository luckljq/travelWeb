<template>
    <div >
        <div class="center" >
            <div class="header2">
                <div class="header2-title">{{spot.scenicSpotName}}</div>
                <div class="header2-right">
                    <el-button icon="el-icon-thumb" size="medium " circle>赞</el-button>
                </div>
            </div>
            <div class="center-info">
                <div class="center-left">概况</div>
                <div class="center-right">
                    <el-button type="warning" size="medium " @click="test">我要点评</el-button>
                </div>
                <div class="center-mid">{{spot.description}}</div>

            </div>
        </div>
        <div class="center-image">
            <div class="center" v-if="spot.urls" >
                <a href="https://www.baidu.com/" target="_blank">
                    <el-row :gutter="5">
                        <el-col :span="16">
                            <el-image :src=" 'http://localhost' + spot.urls[0]"
                                      style="width: 665px; height: 430px" ></el-image>
                        </el-col>
                        <el-col :span="8">
                            <el-row >
                                <el-image :src=" 'http://localhost' + spot.urls[1]"
                                          style="width: 330px; height: 213px" ></el-image>
                            </el-row>
                            <el-row >
                                <el-image :src=" 'http://localhost' + spot.urls[2]"
                                          style="width: 330px; height: 213px" ></el-image>
                            </el-row>
                        </el-col>
                    </el-row>
                </a>
            </div>
        </div>
        <div class="center" >
            <div class="info">
                <el-row :gutter="50">
                    <el-col :span="8">
                        <span>电话：</span>
                        <span style="color: #FF9D52">{{spot.scenicSpotPhone}}</span>
                    </el-col>
                    <el-col :span="8">
                        <el-divider direction="vertical"></el-divider>
                        <span>参考用时：</span>
                        <span style="color: #FF9D52">{{spot.useTime}}</span>
                    </el-col>
                    <el-col :span="8">
                        <span>网址：</span>
                        <span style="color: #FF9D52">{{spot.scenicSpotUrl}}</span>
                    </el-col>
                </el-row>
            </div>
            <div class="info">
                <div>
                    <span>交通</span>
                    <div class="info-content">
                        {{spot.traffic}}
                    </div>
                </div>
            </div>
            <div class="info">
                <div>
                    <span>门票</span>
                    <div class="info-content">
                        {{spot.admissionTicket}}
                    </div>
                </div>
            </div>
            <div class="info">
                <div>
                    <span>开放时间</span>
                    <div class="info-content">
                        {{spot.openTime}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {getSpotDetail, spotUserFabulous} from '../../api/spot'
    export default {
        name: 'spot',
        data() {
            return {
                id:'',
                spot:{},
            }
        },
        created() {
            this.id = this.$route.query.s;
            getSpotDetail(this.id).then(res => {
                this.spot = res.data
            });

        },
        methods:{
            test(){
                spotUserFabulous({
                    spotId:1,
                    userId:3
                }).then(res => {
                    console.log(res);
                })
            }
        }
    }
</script>
<style scoped>
    .info-content {
        color: #66667F;
        padding-top: 10px;
    }
    .info {
        padding-top: 30px;
    }
    .header2 {
        padding: 30px 0;
        border-bottom: 1px solid #ddd;
    }
    .header2-right {
        float: right;
        margin-right: 25px;
    }
    .center {

        margin:0 auto;
        width: 1000px;
    }
    .header2-title {
        display: inline;
        font-size: 30px;
        color: #333;
    }
    .center-info {
        padding: 30px 0;
    }
    .center-mid {
        padding-top: 10px;
    }
    .center-left {
        display: inline;
        font-size: 25px;
        color: #FF9D52;
    }
    .center-right {
        float: right;
    }
    .center-image {
        padding-top: 30px;
        padding-bottom: 30px;
        background-color: #fafafa;
        height: 450px;
        border-bottom: 1px solid #eee;
        border-top: 1px solid #eee
    }
</style>
