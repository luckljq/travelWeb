<template>
    <div v-if="data != null">
        <div class="title">精彩评论</div>
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
                    <div class="info-image">
                        <el-row :gutter="10">
                            <el-col :span="6" v-for="(i,k) in item.imageUrlList" :key="k">
                                <el-image style="width: 223px; height: 150px"
                                          :src="i" :preview-src-list="item.imageUrlList"></el-image>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="bottom">
                        <div class="time">
                            <el-row :gutter="10">
                                <el-col :span="6">
                                    <span style="line-height: 32px">{{item.createTime}}</span>
                                </el-col>
                                <el-col :span="18" style="text-align: right">
                                    <el-button type="text" style="color:#FF9D52;" size="medium" @click="showReplyInput(index)">
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
                            <el-button type="text" style="color:#FF9D52;" size="medium" @click="showReplyInput(index)">&nbsp;&nbsp;&nbsp;&nbsp;回复
                            </el-button>
                            <div>{{i.createTime}}</div>
                        </div>
                    </div>
                    <div class="reply" v-show="item.flag" v-if="item.replyList.length > 2">
                        <el-button type="text" style="color:#FF9D52;" size="medium" @click="showReply(index)"
                                   :loading="s">查看更多回复
                        </el-button>
                    </div>
                    <div class="reply" v-for="i in replyList" v-show="!item.flag">
                        <span style="color: #FF9D52">{{i.userName}}</span>
                        <span>&nbsp;&nbsp;：</span>
                        <span style="color: #FF9D52">@{{i.replyName}}</span>
                        <span>&nbsp;&nbsp;{{i.description}}</span>
                        <el-button type="text" style="color:#FF9D52;" size="medium" @click="showReplyInput(index)">&nbsp;&nbsp;&nbsp;&nbsp;回复
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
                            <el-button type="warning" size="small">回复</el-button>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <el-divider></el-divider>
        </div>
        <div class="page">
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
    import {getCommentReply} from '../../api/spot'

    export default {
        data() {
            return {
                showInput: false,
                textarea: "",
                // 当前页
                currentPage: 1,
                s: false,
                replyList: [],
                isShow: true,
            }
        },
        props: ['data', 'total'],
        methods: {
            showReplyInput(i) {
                this.data[i].inputFlag = !this.data[i].inputFlag;
            },
            notShowReplyInput(i) {
                console.log(1)
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
                this.s = true;
                getCommentReply(this.data[i].id).then(res => {
                    this.replyList = res.data;
                    this.data[i].flag = false;
                    this.s = false;
                });

            },
            notShowReply(i) {
                this.data[i].flag = true;
            }
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

    .page {
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
        padding-top: 5px;
        color: #666;
    }

    .user-title {
        color: #FF9D52;
        font-size: 18px;
    }

    .center {
        padding: 10px;
        margin-top: 10px;
    }

    .title {
        font-size: 25px;
    }
</style>
