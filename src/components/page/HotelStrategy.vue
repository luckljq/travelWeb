<template>
    <div>
        <div class="center-bottom">
            <div>
                <div class="center" >
                    <el-row :gutter="60">
                        <el-col :span="7">
                            <div class="hotelList">
                                <div class="hotelList-title">
                                    <i class="el-icon-medal" style="color:red;"></i>
                                    {{spot.scenicSpotName}}住宿排行
                                </div>
                                <div class="hotelList-info">
                                    <div class="hotelList-list" v-for="(item,i) in hotelList" :key="i">
                                        <el-tag class="strategy-tag">{{i + 1}}</el-tag>
                                        <el-link :underline="false" @click="change(item.id)" class="aa">
                                            {{item.strategyName}}
                                        </el-link>
                                        <div style="float: right">
                                            <i class="el-icon-top" style="color:red; font-size: 16px; line-height: 25px" ></i>
                                            {{item.recommendTotal}}
                                        </div>
                                    </div>
                                </div>
                                <div class="page">
                                    <el-pagination
                                            :current-page="hotelPageNumber"
                                            @current-change="handleCurrentChange"
                                            layout="total, prev, pager, next"
                                            :page-size="10"
                                            :total="this.hotelTotal">
                                    </el-pagination>
                                </div>
                            </div>
                        </el-col>
                        <el-col :span="17">
                            <div class="hotelList" v-if="hotelDetail != null">
                                <div class="hotelList-title">
                                    酒店名字
                                    <div class="header2-right">
                                        <el-button icon="el-icon-thumb" size="mini" :type="this.type" circle @click="zan()"></el-button>
                                    </div>
                                    <div class="header2-right">
                                        <span style="margin-right: 10px; line-height: 29px;">{{s}}</span>
                                    </div>
                                </div>
                                <div class="hotelList-info2">
                                    <el-image src="http://localhost/food/157888351452985f52adf86f64efdb75f8b4b55161204.jpeg" style="width: 690px; height: 465px"></el-image>
                                    <div class="hotelList-info-description">
                                        酒店描述
                                    </div>

                                </div>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

    import {Message} from 'element-ui'
    import {getSpotDetail} from '../../api/spot'
    export default {
        name: 'hotelStrategy',
        data() {
            return {
                list:[],
                data: [],
                total:0,
                pageNumber:1,
                s:0,
                type:'',
                hotelPageNumber:1,
                hotelTotal:20,
                spotId:'',
                spot:{},
                hotelId:'',
                hotelList: [],
                hotelDetail:{},
            }
        },
        created() {
            this.spotId = this.$route.query.s;
            this.hotelId = this.$route.query.h;
            this.getSpot();
        },
        methods:{
            handleCurrentChange(val) {
                let vm = this;
                this.hotelPageNumber = val;
                console.log(this.hotelPageNumber)
            },
            getSpot() {
                getSpotDetail(this.spotId).then(res => {
                    this.spot = res.data
                })
            },
            zan() {
                if(this.$store.getters.getUser.token != "" && this.$store.getters.getUser.token != null){
                    let id = this.$store.getters.getUser.id;
                    if (this.type == ''){

                        this.s = this.s + 1;
                        this.type = "danger"
                    } else {

                        this.s = this.s-1;
                        this.type = ""
                    }
                } else {
                    Message.warning({
                        message: "请您先登录，再进行操作",
                    });
                }
            },
        }
    }
</script>
<style>
    .comment {
        margin-top: 30px;
    }
    .page {
        text-align: center;
    }
    .aa{
        font-size: 17px;
        margin-left: 8px;
        padding-bottom: 4px;
    }
    .header2-right {
        float: right;
    }
    .strategy-tag {
        line-height: 26px;
        background-color:#ff9d00;
        color: white;
        font-size: 15px;
    }
    .hotelList-list {
        padding: 15px 0;
        border-bottom: 1px solid #eee;
    }
    .hotelList-info-description {
        padding-top: 10px;
    }
    .hotelList-info {
        min-height: 594px;
    }
    .hotelList-info2 {
        min-height: 626px;
    }
    .hotelList-title {
        color: #ff9d00;
        font-size: 20px;
        border-bottom: 1px solid #eee;
        padding-bottom: 10px;
    }
    .hotelList{
        padding-top: 40px;
    }
    .center {
        margin:0 auto;
        width: 1000px;
    }
    .center-bottom {
        border-bottom: 1px solid #eee;
    }
</style>
