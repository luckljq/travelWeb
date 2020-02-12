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
                                    <el-button type="text" style="color:#FF9D52;" size="medium">评论</el-button>
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
                            <el-button type="text" style="color:#FF9D52;" size="medium">&nbsp;&nbsp;&nbsp;&nbsp;回复
                            </el-button>
                            <div>{{i.createTime}}</div>
                        </div>
                    </div>
                    <div class="reply" v-show="item.flag">
                        <el-button type="text" style="color:#FF9D52;" size="medium" @click="showReply(index)"
                                   :loading="s">查看更多回复
                        </el-button>
                    </div>
                    <div class="reply" v-for="i in replyList" v-show="!item.flag">
                        <span style="color: #FF9D52">{{i.userName}}</span>
                        <span>&nbsp;&nbsp;：</span>
                        <span style="color: #FF9D52">@{{i.replyName}}</span>
                        <span>&nbsp;&nbsp;{{i.description}}</span>
                        <el-button type="text" style="color:#FF9D52;" size="medium">&nbsp;&nbsp;&nbsp;&nbsp;回复
                        </el-button>
                        <div>{{i.createTime}}</div>
                    </div>
                    <div class="reply" v-show="!item.flag">
                        <el-button type="text" style="color:#FF9D52;" size="medium" @click="notShowReply(index)">收起
                        </el-button>
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
                // 当前页
                currentPage: 1,
                s:false,
                replyList: [
                    {
                        rName:"XXH",
                        name: "LJQ",
                        s: "评论测试",
                        time: "2020-01-01 00:04:51",
                    },
                    {
                        rName:"XXH",
                        name: "LJQ",
                        s: "评论测试",
                        time: "2020-01-01 00:04:51",
                    },
                    {
                        rName:"XXH",
                        name: "LJQ",
                        s: "评论测试",
                        time: "2020-01-01 00:04:51",
                    },
                    {
                        rName:"XXH",
                        name: "LJQ",
                        s: "评论测试",
                        time: "2020-01-01 00:04:51",
                    },
                    {
                        rName:"XXH",
                        name: "LJQ",
                        s: "评论测试",
                        time: "2020-01-01 00:04:51",
                    },
                ],
                isShow: true,
            }
        },
        props: ['data', 'total'],
        methods: {
            getPageNumber(pageNumber) {
                this.$emit("getPageNumber",pageNumber)
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
    .page {
        text-align: right;
    }
    .reply {
        color: #666;
        padding-left: 10px;
        padding-right: 10px;
        padding-top: 5px;
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
