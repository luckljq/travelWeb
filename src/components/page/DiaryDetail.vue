<template>
    <div>
        <div style="background-color: #fafafa; border-bottom: 1px solid #ddd;">
            <div class="center">
                <div class="title">
                    <el-row :gutter="20">
                        <el-col :span="3">
                            <el-avatar :size="80"
                                       :src="'http://localhost' + diaryDetail.userImage">
                            </el-avatar>
                        </el-col>
                        <el-col :span="17">
                            <div class="title-info">
                                {{diaryDetail.title}}
                            </div>
                            <div class="title-name">
                                <el-row :gutter="20">
                                    <el-col :span="8">
                                        {{diaryDetail.userName}}
                                    </el-col>
                                    <el-col :span="16">
                                        <span style="color: #acacac">{{diaryDetail.createTime}}</span>
                                    </el-col>
                                </el-row>
                            </div>
                        </el-col>
                        <el-col :span="4">
                            <div style="float: right">
                                <span style="font-size: 30px; color:#ff7200 ">{{s}}</span>
                                &nbsp
                                <el-button icon="el-icon-thumb" style="font-size: 25px; margin-top: 10px;"
                                           :type="this.type" circle @click="zan()"></el-button>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </div>
        <div class="center2">
            <div class="images">
                <el-card class="box-card">
                    <el-image v-for="(item,i) in imageList" :src="item"
                              :key="i"
                              style="padding:0 5px;width: 300px; height: 250px"
                              :preview-src-list="imageList"
                    ></el-image>
                </el-card>
            </div>
            <div class="info">
                {{diaryDetail.description}}
            </div>
        </div>

        <div style="background-color: #fafafa; border-top: 1px solid rgb(221, 221, 221)" >
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
    import {getDiary, getStatus, getCount, fabulous,addDiaryComment,addDiaryReply, getDiaryComments, getDiaryReply} from '../../api/active'
    import {Message} from 'element-ui'
    import vCommentUser from '../common/commentUser'
    export default {
        name: 'diaryDetail',
        data() {
            return {
                list:[],
                data: [],
                total:0,
                pageNumber:1,
                diaryDetail:{},
                imageList:[],
                type: '',
                s:200,
                diaryId: null,
            }
        },
        components:{
            vCommentUser
        },
        created() {
            this.diaryId = this.$route.query.d;
            this.getData();
            this.getLikeStatus();
            this.getCount();
            this.getComments();
        },
        methods: {
            addComment(description) {
                addDiaryComment({
                    userId: this.$store.getters.getUser.id,
                    diaryId: this.diaryId,
                    description: description
                }).then(res => {
                    Message.success({
                        message: "评论成功",
                    });
                    this.getComments();
                })
            },
            addReply(commentId, userId, replyId, description, i) {
                addDiaryReply({
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
                getDiaryReply(id).then(res => {
                    this.list = res.data
                })
            },
            getComments() {
                getDiaryComments({
                    id: this.diaryId,
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
                document.querySelector("#day").scrollIntoView(true);
            },
            getLikeStatus() {
                let id = this.$store.getters.getUser.id;
                if (id != "") {
                    getStatus({
                        diaryId: this.diaryId,
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
                getCount(this.diaryId).then(res => {
                    this.s = res.data;
                })
            },
            zan(){
                if(this.$store.getters.getUser.token != "" && this.$store.getters.getUser.token != null){
                    let id = this.$store.getters.getUser.id;
                    if (this.type == ''){
                        fabulous({
                            diaryId: this.diaryId,
                            userId: id,
                            value: 1
                        });
                        this.s = this.s + 1;
                        this.type = "danger"
                    } else {
                        fabulous({
                            diaryId: this.diaryId,
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
            getData() {
                getDiary(this.diaryId).then(res => {
                    this.diaryDetail = res.data;
                    this.imageList = res.data.images;
                })
            }
        }
    }
</script>
<style scoped>
    .comment {
        margin-top: 30px;
    }
    .info {
        line-height: 1.5;
        padding-left: 10px;
        padding-right: 10px;
        padding-bottom: 100px;
        color: #666;
        font-size: 16px;
    }
    .box-card {
        text-align: center;
    }
    .images {
        padding: 30px 10px;
    }
    .title-name {
        padding-top: 25px;
        font-size: 14px;
        color: #ff7200;
        font-weight: normal;
    }

    .title-info {
        font-size: 26px;
        color: #666;
    }

    .title {
        padding: 30px 0;
    }

    .center {
        margin: 0 auto;
        width: 1000px;
    }

    .center2 {
        margin: 0 auto;
        width: 1000px;
        min-height: 500px;
    }
</style>
