<template>
    <div v-if="data != null">
        <div class="title">精彩评论</div>
        <el-button type="warning" size="medium" @click="showVisible" style="float: right">我要点评</el-button>
        <div class="center" v-for="(item,index) in data">
            <el-row :gutter="20">
                <el-col :span="2">
                    <el-avatar :size="55"
                               :src="'http://localhost' + item.headImage"></el-avatar>
                </el-col>
                <el-col :span="22">
                    <div class="user-title">
                        <span>{{item.userName}}</span>
                    </div>
                    <div class="info">
                        {{item.description}}
                    </div>
                    <div class="bottom">
                        <div class="time">
                            <el-row :gutter="10">
                                <el-col :span="6">
                                    <span style="line-height: 32px">{{item.createTime}}</span>
                                </el-col>
                                <el-col :span="18" style="text-align: right">
                                    <el-button type="text" style="color:#FF9D52;" size="medium" @click="showReplyInput2(index)">
                                        评论
                                    </el-button>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                    <div v-for="i in item.replyList" v-show="item.flag">
                        <div class="reply">
                            <span style="color: #FF9D52">{{i.userName}}</span>
                            <span>&nbsp;&nbsp;：</span>
                            <span style="color: #FF9D52">@{{i.replyName}}</span>
                            <span>&nbsp;&nbsp;{{i.description}}</span>
                            <el-button type="text" style="color:#FF9D52;" size="medium" @click="showReplyInput(index,i)">&nbsp;&nbsp;&nbsp;&nbsp;回复
                            </el-button>
                            <div>{{i.createTime}}</div>
                        </div>
                    </div>
                    <div class="reply" v-show="item.flag" v-if="item.replyList.length > 2">
                        <el-button type="text" style="color:#FF9D52;" size="medium" @click="showReply(index)"
                        >查看更多回复
                        </el-button>
                    </div>
                    <div class="reply" v-for="i in item.replyList" v-show="!item.flag">
                        <span style="color: #FF9D52">{{i.userName}}</span>
                        <span>&nbsp;&nbsp;：</span>
                        <span style="color: #FF9D52">@{{i.replyName}}</span>
                        <span>&nbsp;&nbsp;{{i.description}}</span>
                        <el-button type="text" style="color:#FF9D52;" size="medium" @click="showReplyInput(index,i)">&nbsp;&nbsp;&nbsp;&nbsp;回复
                        </el-button>
                        <div>{{i.createTime}}</div>
                    </div>
                    <div class="reply" v-show="!item.flag">
                        <el-button type="text" style="color:#FF9D52;" size="medium" @click="notShowReply(index)">收起
                        </el-button>
                    </div>
                    <div class="input" v-show="item.inputFlag">
                        <el-collapse-transition>
                            <div v-show="item.inputFlag">
                                <el-input
                                        autofocus="true"
                                        type="textarea"
                                        :autosize="{ minRows: 2, maxRows: 4}"
                                        placeholder="请输入内容(少于50字)"
                                        v-model="textarea"
                                        maxlength="50"
                                        show-word-limit>
                                </el-input>
                            </div>
                        </el-collapse-transition>
                        <div class="btn">
                            <el-button type="warning" size="small" @click="commentReply(index)">回复</el-button>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <el-divider></el-divider>
        </div>
        <div class="page2">
            <el-pagination
                    :current-page="currentPage"
                    @current-change="handleCurrentChange"
                    layout="total, prev, pager, next"
                    :page-size="5"
                    :total="this.total">
            </el-pagination>
        </div>
    </div>
</template>
<script>
    import {Message} from 'element-ui'
    import {getCommentReply, addCommentReply} from '../../api/spot'
    export default {
        data() {
            return {
                i:null ,
                showInput: false,
                textarea: "",
                // 当前页
                currentPage: 1,
                replyList: [],
                isShow: true,
                //回复参数
                replyId:null,
                userId:this.$store.getters.getUser.id
            }
        },
        props: ['data', 'total', 'list'],
        methods: {
            showVisible() {

            },
            commentReply(i) {

            },
            showReplyInput(index, i) {
                if(this.$store.getters.getUser.token != "" && this.$store.getters.getUser.token != null) {
                    this.textarea = "";
                    this.data.forEach(item => {
                        item.inputFlag = false
                    });
                    if (this.userId == i.userId) {
                        Message.warning({
                            message: "您不能回复自己",
                        });
                        this.data[index].inputFlag = false;
                    } else {
                        this.data[index].inputFlag = !this.data[index].inputFlag;
                        this.replyId = i.userId;
                    }
                } else {
                    Message.warning({
                        message: "请您先登录，再进行操作",
                    });
                }
            },
            showReplyInput2(i) {
                if(this.$store.getters.getUser.token != "" && this.$store.getters.getUser.token != null) {
                    this.textarea = "";
                    this.data.forEach(item => {
                        item.inputFlag = false
                    });
                    if (this.userId == this.data[i].userId) {
                        Message.warning({
                            message: "您不能回复自己",
                        });
                        this.data[i].inputFlag = false;
                    } else {
                        this.data[i].inputFlag = !this.data[i].inputFlag;
                        this.replyId = this.data[i].userId;
                    }
                } else {
                    Message.warning({
                        message: "请您先登录，再进行操作",
                    });
                }
            },
            getPageNumber(pageNumber) {
                this.$emit("getPageNumber", pageNumber)
            },
            handleCurrentChange(val) {
                let vm = this;
                this.currentPage = val;
                this.getPageNumber(val);
            },
            showReply(i) {
                this.i = i;
                this.$parent.getReply(this.data[i].id);
            },
            notShowReply(i) {
                this.data[i].flag = true;
                this.$parent.getComments();
            }
        },
        watch:{
            list(val, oldVal){
                this.data[this.i].replyList = val;
                this.data[this.i].flag = false;
            },
        }
    }
</script>

<style>
    .btn {
        float: right;
        padding-top: 10px;
    }

    .input {

    }

    .page2 {
        text-align: right;
    }

    .reply {
        color: #666;
        padding-left: 10px;
        padding-right: 10px;
        padding-top: 3px;
        font-size: 14px;
        border-bottom: 1px solid #eee;
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

    .info {
        padding-top: 15px;
        color: #666;
    }

    .user-title {
        display: inline;
        color: #FF9D52;
        font-size: 18px;
    }

    .center {
        padding: 10px;
    }

    .title {
        display: inline;
        font-size: 25px;
    }
</style>
