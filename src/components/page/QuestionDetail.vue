<template>
    <div>
        <div class="center">
            <div style="padding: 40px 0">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span style="font-size: 25px; color:#FF9D52 ">问答详情</span>
                        <a id="day" href="#day" style="color:red"></a>
                    </div>
                    <div >
                        <div class="info-title">
                            <el-row :gutter="10">
                                <el-col :span="8">
                                    <div class="title-address">
                                        <i style="color:#FF9D52; font-size: 25px " class="el-icon-location-information"></i>
                                        {{questionDetail.destination}}
                                    </div>
                                </el-col>
                                <el-col :span="16">
                                    <div class="title-name">
                                        {{questionDetail.title}}
                                        <el-button type="warning" size="medium" @click="showVisible" style="float: right">我要回答</el-button>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                        <div class="info-info">
                            {{questionDetail.description}}
                        </div>
                        <div class="info-foot">
                            <el-avatar :size="25"
                                       style="line-height: 20px"
                                       :src="'http://localhost' + questionDetail.headImage"></el-avatar>
                            &nbsp;&nbsp;{{questionDetail.userName}}&nbsp;&nbsp;{{questionDetail.createTime}}
                        </div>
                    </div>
                    <div style="background-color: #fafafa; padding-top: 20px">
                        <div v-show="answerVisible">
                            <div class="cv">
                                <el-form :model="ruleForm" ref="ruleForm" label-width="80px" class="ms-content">
                                    <el-form-item label="内容">
                                        <el-input v-model="ruleForm.description" type="textarea" placeholder="请输入您的评论" size="large">
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button type="warning" @click="submitForm()" size="medium" style="float: right">提交</el-button>
                                    </el-form-item>
                                </el-form>
                            </div>
                        </div>
                        <div style="margin: 0 auto; padding: 10px" v-for="(item,index) in data">
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
                </el-card>
            </div>
        </div>
    </div>
</template>
<script>
    import {Message} from 'element-ui'
    import {getQuestionDetail, getAnswerList, getAnswerReply,addAnswer,addAnswerReply} from '../../api/active'
    export default {
        name: 'questionDetail',
        data() {
            return{
                questionDetail:{},
                list:[],
                data:[],
                answerVisible:false,
                questionId: null,
                i:null ,
                showInput: false,
                textarea: "",
                // 当前页
                currentPage: 1,
                total:0,
                replyList: [],
                isShow: true,
                //回复参数
                replyId:null,
                userId:this.$store.getters.getUser.id,
                ruleForm: {
                    description:''
                }
            }
        },
        created() {
            this.questionId = this.$route.query.q;
            getQuestionDetail(this.questionId).then(res => {
                this.questionDetail = res.data;
            });
            this.getAnswer();
        },
        methods: {
            getAnswer() {
                getAnswerList({
                    id:this.questionId,
                    pageNumber: this.currentPage,
                    pageSize: 5
                }).then(res => {
                    this.data = res.data.list;
                    this.total = res.data.total
                })
            },
            showVisible() {
                if(this.$store.getters.getUser.token != "" && this.$store.getters.getUser.token != null) {
                    this.answerVisible = true;
                } else {
                    Message.warning({
                        message: "请您先登录，再进行操作",
                    });
                }
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getAnswer();
                document.querySelector("#day").scrollIntoView(true);
            },
            submitForm() {
                addAnswer({
                    questionId:this.questionId,
                    userId:this.$store.getters.getUser.id,
                    description:this.ruleForm.description
                }).then(res => {
                    Message.success({
                        message: "回答成功",
                    });
                    this.ruleForm.description = "";
                    this.answerVisible = false;
                    this.getAnswer();
                })
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
            getReply(i) {
                getAnswerReply(this.data[i].id).then(res => {
                    this.list = res.data;
                })
            },
            showReply(i) {
                this.i = i;
                this.getReply(i);
            },
            notShowReply(i) {
                this.data[i].flag = true;
                this.getAnswer();
            },
            commentReply(i) {
                addAnswerReply({
                    answerId:this.data[i].id,
                    userId:this.$store.getters.getUser.id,
                    replyId:this.replyId,
                    description: this.textarea
                }).then(res => {
                    if (this.data[i].replyList.length > 2){
                        this.getReply(i);
                    } else {
                        this.getAnswer();
                    }
                    this.data[i].inputFlag = false;
                });
                this.textarea = "";
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
<style scoped>
    .info-foot {
        color: #FF9D52;
        text-align: right;
        padding-top: 10px;
        padding-bottom: 10px;
        border-bottom: 1px solid #ddd;
    }
    .info-info {
        padding-top: 20px;
        padding-left: 20px;
        color: #666;
        font-size: 18px;
    }
    .title-name {
        font-size: 25px
    }
    .title-address {
        color: #FF9D52;
        font-size: 25px
    }
    .info-title {

    }
    .center {
        margin: 0 auto;
        width: 1000px;
    }

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
