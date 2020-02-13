<template>
    <div >
        <div class="center" >
            <div class="header2">
                <div class="header2-title">{{spot.scenicSpotName}}</div>
                <div class="header2-right">
                    <el-row style="text-align: center">
                    <el-button icon="el-icon-thumb" size="medium" :type="this.type" circle @click="zan">{{ss}}</el-button>
                    </el-row>
                    <el-row style="text-align: center">
                    <div class="span" >{{s}}</div>
                    </el-row>
                </div>

            </div>
            <div class="center-info">
                <div class="center-left">概况</div>
                <div class="center-right">
                    <el-button type="warning" size="medium" >我要点评</el-button>
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
        <el-divider></el-divider>
        <div class="center">
            <div class="comment">
                <vComment :data="data" :total="this.total" v-on:getPageNumber="getPageNumber"></vComment>
            </div>
        </div>
    </div>
</template>
<script>
    import vComment from '../common/comment.vue'
    import {Message} from 'element-ui'
    import {getSpotDetail, spotUserFabulous, getSpotCount, getSpotUserStatus, getSpotComment} from '../../api/spot'
    export default {
        name: 'spot',
        data() {
            return {
                id:'',
                spot:{},
                s:null,
                ss:'赞',
                type:'',
                //表格初始化
                pageNumber:1,
                total:0,
                data:[]
            }
        },
        components:{
            vComment
        },
        created() {
            this.id = this.$route.query.s;
            //获取景点详细信息
            getSpotDetail(this.id).then(res => {
                this.spot = res.data
            });
            //获取景点被点赞总数
            this.getCount();
            let id = this.$store.getters.getUser.id;
            if (id != "") {
                getSpotUserStatus({
                    spotId: this.id,
                    userId: id
                }).then(res => {
                    if (res.data == 1) {
                        this.ss = "取消";
                        this.type = "danger"
                    }
                })
            }
            //获取评论列表
            this.getComment()
        },
        methods:{
            getComment() {
                console.log(1);
                getSpotComment({
                    id:this.id,
                    pageNumber: this.pageNumber,
                    pageSize: 5
                }).then(res => {
                    this.data = res.data.list;
                    this.total = res.data.total;
                })
            },
            //翻页
            getPageNumber(pageNumber){
                this.pageNumber = pageNumber;
                this.getComment();
            },
            getCount() {
                getSpotCount(this.id).then(res => {
                    this.s = res.data;
                })
            },
            zan() {
                if(this.$store.getters.getUser.token != "" && this.$store.getters.getUser.token != null){
                    let id = this.$store.getters.getUser.id;
                    if (this.type == ''){
                        spotUserFabulous({
                            spotId: this.id,
                            userId: id,
                            value: 1
                        });
                        this.s = this.s + 1;
                        this.ss = "取消";
                        this.type = "danger"
                    } else {
                        spotUserFabulous({
                            spotId: this.id,
                            userId: id,
                            value: 0
                        });
                        this.s = this.s-1;
                        this.ss = "赞";
                        this.type = ""
                    }
                } else {
                    Message.warning({
                        message: "请您先登录，再进行操作",
                    });
                }
            }
        }
    }
</script>
<style scoped>
    .comment {
        margin-top: 30px;
    }
    .span {
        color: #FF9D52;
        position: relative;
        font-size: 20px;
        padding-top: 8px;
    }
    .info-content {
        color: #666;
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
