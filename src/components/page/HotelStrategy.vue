<template>
    <div>
        <div class="center-bottom">
            <div>
                <div class="center">
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
                                            <i class="el-icon-top"
                                               style="color:red; font-size: 16px; line-height: 25px"></i>
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
                                    {{hotelDetail.strategyName}}
                                    <div class="header2-right">
                                        <el-button icon="el-icon-thumb" size="mini" :type="this.type" circle
                                                   @click="zan()"></el-button>
                                    </div>
                                    <div class="header2-right">
                                        <span style="margin-right: 10px; line-height: 29px;">{{s}}</span>
                                    </div>
                                </div>
                                <div class="hotelList-info2" v-if="hotelDetail.images">
                                    <el-row :gutter="5">
                                        <el-col :span="16">
                                            <el-image :src="hotelDetail.images[0]"
                                                      :preview-src-list="hotelDetail.images"
                                                      style="width: 458px;height: 309px"/>
                                        </el-col>
                                        <el-col :span="8">
                                            <el-row>
                                                <el-image :src="hotelDetail.images[1]"
                                                          :preview-src-list="hotelDetail.images"
                                                          style="width: 226px;height: 153px"/>
                                            </el-row>
                                            <el-row>
                                                <el-image :src="hotelDetail.images[2]"
                                                          :preview-src-list="hotelDetail.images"
                                                          style="width: 226px;height: 153px"/>
                                            </el-row>
                                        </el-col>
                                    </el-row>
                                    <div class="hotelList-info-description">
                                        {{hotelDetail.description}}
                                    </div>
                                    <div class="hotelList-info-description">
                                        <el-tag style="font-size: 15px">酒店电话</el-tag>
                                        ：{{hotelDetail.phone}}
                                    </div>
                                    <div class="hotelList-info-description">
                                        <el-tag style="font-size: 15px">参考价格</el-tag>
                                        ：{{hotelDetail.price}}
                                    </div>
                                    <div class="hotelList-info-description">
                                        <el-tag style="font-size: 15px">能否停车</el-tag>
                                        ：{{hotelDetail.isPark}}
                                    </div>
                                    <div class="foodList-info-address">
                                        <el-tag type="warning" style="font-size: 15px">酒店地址</el-tag>
                                        ：{{hotelDetail.address}}
                                    </div>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </div>
        <div style="background-color: #fafafa">
            <a id="day" href="#day" style="color:red"></a>
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
    import {getSpotDetail, getHotelList} from '../../api/spot'
    import {getHotelDetails, hotelUserFabulous, getHotelCount, getHotelUserStatus,
        addHotelComment, addHotelReply, getHotelReply, getHotelComments} from '../../api/sevApi'
    import vCommentUser from '../common/commentUser.vue'

    export default {
        name: 'hotelStrategy',
        data() {
            return {
                list: [],
                data: [],
                total: 0,
                pageNumber: 1,
                s: 0,
                type: '',
                hotelPageNumber: 1,
                hotelTotal: 0,
                spotId: '',
                spot: {},
                hotelId: '',
                hotelList: [],
                hotelDetail: null,
            }
        },
        created() {
            this.spotId = this.$route.query.s;
            this.hotelId = this.$route.query.h;
            this.getSpot();
            this.getHotels();
            this.getHotel(this.hotelId);
            this.getCount();
            this.getLikeStatus();
            this.getComments();
        },
        components:{
            vCommentUser
        },
        methods: {
            addComment(description) {
                addHotelComment({
                    userId: this.$store.getters.getUser.id,
                    hotelId: this.hotelId,
                    description: description
                }).then(res => {
                    Message.success({
                        message: "评论成功",
                    });
                    this.getComments();
                })
            },
            addReply(commentId, userId, replyId, description, i) {
                addHotelReply({
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
                getHotelReply(id).then(res => {
                    this.list = res.data
                })
            },
            //翻页
            getPageNumber(pageNumber){
                this.pageNumber = pageNumber;
                this.getComments();
                document.querySelector("#day").scrollIntoView(true);
            },
            getComments() {
                getHotelComments({
                    id: this.hotelId,
                    pageNumber: this.pageNumber,
                    pageSize: 5
                }).then(res => {
                    this.data = res.data.list;
                    this.total = res.data.total
                })
            },
            getLikeStatus() {
                let id = this.$store.getters.getUser.id;
                if (id != "") {
                    getHotelUserStatus({
                        hotelId: this.hotelId,
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
            getCount() {
                getHotelCount(this.hotelId).then(res => {
                    this.s = res.data;
                })
            },
            getHotel(id) {
                getHotelDetails(id).then(res => {
                    let hotel = res.data;
                    if (hotel.isPark == 1) {
                        hotel.isPark = '可以'
                    } else {
                        hotel.isPark = '不可以'
                    }
                    this.hotelDetail = hotel;
                })
            },
            change(id) {
                this.$router.push({
                    path: '/hotelStrategy?s=' + this.spotId + '&h=' + id,
                });
                this.hotelId = id;
                this.getHotel(id);
                this.getCount();
                this.getLikeStatus();
                this.getComments();
            },
            getHotels() {
                getHotelList({
                    id: this.spotId,
                    pageNumber: this.HotelPageNumber,
                    pageSize: 10
                }).then(res => {
                    let list = null;
                    if (res.data.list != null) {
                        list = res.data.list;
                        list.forEach(i => {
                            if (i.strategyName.length > 8) {
                                i.strategyName = i.strategyName.substring(0, 7) + "...";
                            }
                        })
                    }
                    this.hotelList = list;
                    this.hotelTotal = res.data.total;
                })
            },
            handleCurrentChange(val) {
                let vm = this;
                this.hotelPageNumber = val;
                this.getHotels();
            },
            getSpot() {
                getSpotDetail(this.spotId).then(res => {
                    this.spot = res.data
                })
            },
            zan() {
                if (this.$store.getters.getUser.token != "" && this.$store.getters.getUser.token != null) {
                    let id = this.$store.getters.getUser.id;
                    if (this.type == '') {
                        hotelUserFabulous({
                            hotelId: this.hotelId,
                            userId: id,
                            value: 1
                        });
                        this.s = this.s + 1;
                        this.type = "danger"
                    } else {
                        hotelUserFabulous({
                            hotelId: this.hotelId,
                            userId: id,
                            value: 0
                        });
                        this.s = this.s - 1;
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
    .foodList-info-address {
        position: absolute;
        bottom: 10px;
        color: #e6a23c;
    }
    .comment {
        margin-top: 30px;
    }

    .page {
        text-align: center;
    }

    .aa {
        font-size: 17px;
        margin-left: 8px;
        padding-bottom: 4px;
    }

    .header2-right {
        float: right;
    }

    .strategy-tag {
        line-height: 26px;
        background-color: #ff9d00;
        color: white;
        font-size: 15px;
    }

    .hotelList-list {
        padding: 15px 0;
        border-bottom: 1px solid #eee;
    }

    .hotelList-info-description {
        padding-top: 15px;
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

    .hotelList {
        padding-top: 40px;
    }

    .center {
        margin: 0 auto;
        width: 1000px;
    }

    .center-bottom {
        border-bottom: 1px solid #eee;
    }
</style>
