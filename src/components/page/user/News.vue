<template>
    <div>
        <div class="title">
            我的消息
        </div>
        <div class="info">
            <div class="block">
                <el-timeline>
                    <el-timeline-item v-for="(item,i) in data" :timestamp="item.createTime" placement="top" :key="i">
                        <el-card>
                            <div  v-if="item.orderType == 1" >
                                <el-tag type="success" style="float: right">景点评论</el-tag>
                                <h4 style="color: #FF9D52">{{item.senderName}}： </h4>
                            </div>
                            <div  v-if="item.orderType == 2" >
                                <el-tag type="success" style="float: right">美食评论</el-tag>
                                <h4 style="color: #FF9D52">{{item.senderName}}： </h4>
                            </div>
                            <div  v-if="item.orderType == 3" >
                                <el-tag type="success" style="float: right">酒店评论</el-tag>
                                <h4 style="color: #FF9D52">{{item.senderName}}： </h4>
                            </div>
                            <div  v-if="item.orderType == 4" >
                                <el-tag type="warning" style="float: right">游记消息</el-tag>
                                <h4 style="color: #FF9D52">{{item.senderName}}： </h4>
                            </div>
                            <div  v-if="item.orderType == 5" >
                                <el-tag type="info" style="float: right">问答消息</el-tag>
                                <h4 style="color: #FF9D52">{{item.senderName}}： </h4>
                            </div>
<!--                            <h4 v-if="item.type == 2" style="color: #FF9D52">{{item.name}}回复您： </h4>-->
<!--                            <h4 v-if="item.type == 3" style="color: #FF9D52">{{item.name}}回答了您： </h4>-->
                            <p style="padding-top: 5px">{{item.description}}</p>
                            <el-button  type="text" style="float: right; color: #FF9D52" @click="openMessage(i)">详情</el-button>
                        </el-card>
                    </el-timeline-item>
                </el-timeline>
                <div class="page">
                    <el-pagination
                            :current-page="pageNumber"
                            @current-change="handleCurrentChange"
                            layout="total, prev, pager, next"
                            :page-size="pageSize"
                            :total="this.total">
                    </el-pagination>
                </div>
            </div>
        </div>

<!--消息详情弹出框-->
        <el-dialog
                top="5vh"
                :lock-scroll="false"
                :visible.sync="commentVisible"
                width="60%">
            <div class="center">
                <el-row :gutter="20">
                    <el-col :span="2">
                        <el-avatar :size="55"
                                   :src="'http://localhost' + commentData.headImage"></el-avatar>
                    </el-col>
                    <el-col :span="22">
                        <div class="user-title">
                            <span>{{commentData.userName}}</span>
                            <el-rate
                                    disabled
                                    style="display: inline; margin-left: 10px;"
                                    v-model="commentData.rate"
                                    :colors="colors">
                            </el-rate>
                        </div>
                        <div class="info2">
                            {{commentData.description}}
                        </div>
                        <div class="info-image">
                            <el-row :gutter="10">
                                <el-col :span="6" v-for="(i,k) in commentData.images" :key="k" v-if="k < 4">
                                    <el-image style="width: 223px; height: 150px"
                                              :src="i" :preview-src-list="commentData.images"></el-image>
                                </el-col>
                            </el-row>
                        </div>
                        <div class="bottom">
                            <div class="time">
                                <span style="line-height: 32px">{{commentData.createTime}}</span>
                            </div>
                        </div>
                        <div v-for="i in replyList" >
                            <div class="reply">
                                <span style="color: #FF9D52">{{i.userName}}</span>
                                <span>&nbsp;&nbsp;：</span>
                                <span style="color: #FF9D52">@{{i.replyName}}</span>
                                <span>&nbsp;&nbsp;{{i.description}}</span>
                                <el-button type="text" style="color:#FF9D52;" size="medium" @click="showReplyInput(i)">&nbsp;&nbsp;&nbsp;&nbsp;回复
                                </el-button>
                                <div>{{i.createTime}}</div>
                            </div>
                        </div>
                        <div class="input" v-show="inputFlag">
                            <el-collapse-transition>
                                <el-input
                                        autofocus="true"
                                        type="textarea"
                                        :autosize="{ minRows: 2, maxRows: 4}"
                                        placeholder="请输入内容(少于50字)"
                                        v-model="textarea"
                                        maxlength="50"
                                        show-word-limit>
                                </el-input>
                            </el-collapse-transition>
                            <div class="btn">
                                <el-button type="warning" size="small" @click="commentReply()">回复</el-button>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import {Message} from 'element-ui'
    import {getMessages, getComment, getReply, addCommentReply} from '../../../api/spot'
    export default {
        data() {
            return {
                replyId:null,
                textarea: "",
                replyList:[],
                inputFlag:false,
                colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
                commentData:{},
                data:[],
                commentVisible:false,
                i:null,
                // 当前页
                pageNumber: 1,
                pageSize:5,
                total:0
            }
        },
        created(){
            this.getUserMessage();
        },
        methods:{
            handleCurrentChange(val) {
                this.pageNumber = val;
                this.getUserMessage();
            },
            commentReply() {
                addCommentReply({
                    commentId: this.commentData.id,
                    userId: this.$store.getters.getUser.id,
                    replyId: this.replyId,
                    description: this.textarea
                }).then(res => {
                    let item = this.data[this.i];
                    getReply({
                        id: item.orderId,
                        userId: this.$store.getters.getUser.id,
                        replyId: item.senderId
                    }).then(res => {
                        this.replyList = res.data;
                    });
                    this.inputFlag = false;
                    this.textarea = "";
                })
            },
            showReplyInput(i) {
                if (i.userId == this.$store.getters.getUser.id) {
                    Message.warning({
                        message: "您不能回复自己",
                    });
                } else {
                    this.inputFlag = !this.inputFlag;
                    this.replyId = i.userId;
                }
            },
            getUserMessage(){
                getMessages(this.$store.getters.getUser.id, {
                    pageNumber : this.pageNumber,
                    pageSize : this.pageSize,
                }).then(res => {
                    this.data = res.data.list;
                    this.total = res.data.total;
                })
            },
            openMessage(i){
                this.i = i;
                let item = this.data[i];
                if (item.orderType == 1) {
                    getComment(item.orderId).then(res => {
                       this.commentData = res.data
                    });
                    getReply({
                        id: item. orderId,
                        userId: this.$store.getters.getUser.id,
                        replyId: item.senderId
                    }).then(res => {
                        this.replyList = res.data;
                    });
                    this.commentVisible = true;
                }
            }
        }
    }
</script>
<style scoped>
    .page {
        text-align: right;
    }
    .input {
        padding-top: 10px
    }
    .btn {
        float: right;
        padding-top: 10px;
    }
    .reply {
        color: #666;
        padding-left: 10px;
        padding-right: 10px;
        padding-top: 3px;
        font-size: 14px;
        border-bottom: 1px solid #eee;
    }
    .center {
        padding: 10px;
        display:table
    }
    .user-title {
        display: inline;
        color: #FF9D52;
        font-size: 18px;
    }
    .bottom {
        font-size: 15px;
        color: #666;
        padding-top: 5px;
        border-bottom: 1px solid #eee;
    }

    .info-image {
        padding-top: 8px;
    }

    .info2 {
        padding-top: 15px;
        color: #666;
    }
    .message {

    }
    .title {
        font-size: 30px;
        border-bottom: 1px solid #ddd;
    }
    .info {
        padding-top: 30px;
    }
</style>
