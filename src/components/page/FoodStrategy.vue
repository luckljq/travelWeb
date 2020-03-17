<template>
    <div>
        <div class="center-bottom">
        <div>
            <div class="center" >
            <el-row :gutter="60">
                <el-col :span="7">
                    <div class="foodList">
                        <div class="foodList-title">
                            <i class="el-icon-medal" style="color:red;"></i>
                            {{spot.scenicSpotName}}美食排行
                        </div>
                        <div class="foodList-info">
                            <div class="foodList-list" v-for="(item,i) in foodList" :key="i">
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
                                    :current-page="foodPageNumber"
                                    @current-change="handleCurrentChange"
                                    layout="total, prev, pager, next"
                                    :page-size="10"
                                    :total="this.foodTotal">
                            </el-pagination>
                        </div>
                    </div>
                </el-col>
                <el-col :span="17">
                    <div class="foodList" v-if="foodDetail != null">
                        <div class="foodList-title">
                            {{foodDetail.strategyName}}
                            <div class="header2-right">
                                <el-button icon="el-icon-thumb" size="mini" :type="this.type" circle @click="zan()"></el-button>
                            </div>
                            <div class="header2-right">
                                <span style="margin-right: 10px; line-height: 29px;">{{s}}</span>
                            </div>
                        </div>
                        <div class="foodList-info2">
                            <el-image :src="foodDetail.imageUrl" style="width: 690px; height: 465px"></el-image>
                            <div class="foodList-info-description">
                               {{foodDetail.description}}
                            </div>
                            <div class="foodList-info-address">
                                <el-tag type="warning" style="font-size: 15px">推荐店家</el-tag>
                                ：{{foodDetail.address}}
                            </div>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        </div>
    </div>
        <div style="background-color: #fafafa">
            <div class="center">
                <div class="comment">
                    <vCommentUser :data="data" :total="this.total" :list="list" v-on:getPageNumber="getPageNumber"></vCommentUser>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {Message} from 'element-ui'
    import {getFoodList, getFoodDetail, getSpotDetail} from '../../api/spot'
    import {foodUserFabulous, getFoodCount, getFoodUserStatus, getFoodComments, getFoodReply, addFoodReply, addFoodComment} from '../../api/sevApi'
    import vCommentUser from '../common/commentUser.vue'
    export default {
        name: 'foodStrategy',
        data() {
            return {
                list:[],
                data: [],
                total:0,
                pageNumber:1,
                foodTotal:0,
                s:0,
                ss:'赞',
                type:'',
                foodPageNumber:1,
                spotId:'',
                spot:{},
                foodId:'',
                foodList: [],
                foodDetail: null,
            }
        },
        created() {
            this.spotId = this.$route.query.s;
            this.foodId = this.$route.query.f;
            this.getFood(this.foodId);
            this.getSpot();
            this.getFoods();
            this.getCount();
            this.getLikeStatus();
            this.getComments();
        },
        methods: {
            addComment(description) {
                addFoodComment({
                    userId: this.$store.getters.getUser.id,
                    foodId: this.foodId,
                    description: description
                }).then(res => {
                    Message.success({
                        message: "评论成功",
                    });
                    this.getComments();
                })
            },
            addReply(commentId, userId, replyId, description, i) {
                addFoodReply({
                    commentId: commentId,
                    userId:userId,
                    replyId:replyId,
                    description: description
                }).then(res => {
                    if (this.data[i].replyList.length > 2){
                        this.getReply(this.data[i].id);
                    } else {
                        this.getComments();
                    }
                    this.data[i].inputFlag = false;
                })
            },
            getReply(id) {
                getFoodReply(id).then(res => {
                    this.list = res.data
                })
            },
            getComments() {
                getFoodComments({
                    id: this.foodId,
                    pageNumber: this.pageNumber,
                    pageSize: 5
                }).then(res => {
                    this.data = res.data.list;
                    this.total = res.data.total
                })
            },
            //翻页
            getPageNumber(pageNumber){
                this.pageNumber = pageNumber;
                this.getComments();
            },
            getLikeStatus() {
                let id = this.$store.getters.getUser.id;
                if (id != "") {
                    getFoodUserStatus({
                        foodId: this.foodId,
                        userId: id
                    }).then(res => {
                        if (res.data == 1) {
                            this.type = "danger"
                        } else {
                            this.type = ""
                        }
                    })
                }
            },
            zan() {
                if(this.$store.getters.getUser.token != "" && this.$store.getters.getUser.token != null){
                    let id = this.$store.getters.getUser.id;
                    if (this.type == ''){
                        foodUserFabulous({
                            foodId: this.foodId,
                            userId: id,
                            value: 1
                        });
                        this.s = this.s + 1;
                        this.type = "danger"
                    } else {
                        foodUserFabulous({
                            foodId: this.foodId,
                            userId: id,
                            value: 0
                        });
                        this.s = this.s-1;
                        this.type = ""
                    }
                } else {
                    Message.warning({
                        message: "请您先登录，再进行操作",
                    });
                }
            },
            getCount() {
                getFoodCount(this.foodId).then(res => {
                    this.s = res.data;
                })
            },
            handleCurrentChange(val) {
                let vm = this;
                this.foodPageNumber = val;
                this.getFoods();
            },
            change(id) {
                this.$router.push({
                    path: '/foodStrategy?s=' + this.spotId + '&f=' + id,
                });
                this.foodId = id;
                this.getFood(id);
                this.getCount();
                this.getLikeStatus();
                this.getComments();
            },
            getSpot() {
                getSpotDetail(this.spotId).then(res => {
                    this.spot = res.data
                })
            },
            getFoods() {
                getFoodList({
                    id:this.spotId,
                    pageNumber: this.foodPageNumber,
                    pageSize:10
                }).then(res => {
                    this.foodList = res.data.list;
                    this.foodTotal = res.data.total
                })
            },
            getFood(id) {
                getFoodDetail(id).then(res => {
                    this.foodDetail = res.data;
                })
            }
        },
        components:{
            vCommentUser
        },
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
    .foodList-info-address {
        position: absolute;
        bottom: 10px;
        color: #e6a23c;
    }
    .strategy-tag {
        line-height: 26px;
        background-color:#ff9d00;
        color: white;
        font-size: 15px;
    }
    .foodList-list {
        padding: 15px 0;
        border-bottom: 1px solid #eee;
    }
    .foodList-info-description {
        padding-top: 10px;
    }
    .foodList-info {
        min-height: 594px;
    }
    .foodList-info2 {
        min-height: 626px;
    }
    .foodList-title {
        color: #ff9d00;
        font-size: 20px;
        border-bottom: 1px solid #eee;
        padding-bottom: 10px;
    }
    .foodList{
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
