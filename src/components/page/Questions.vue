<template>
    <div>
        <div class="center">
            <div style="padding: 40px 0">
                <a id="day" href="#day" style="color:red"></a>
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span style="font-size: 25px; color:#FF9D52 ">问答中心</span>
                    </div>
                    <div style="min-height: 500px">
                        <div class="title">
                            <el-input v-model="description" style="width: 200px; padding-right: 20px"
                                      placeholder="问问提前，先搜一搜"></el-input>
                            <el-button type="primary"
                                       @click="getList()">搜索
                            </el-button>
                            <el-button type="warning"
                                       size="medium"
                                       style="float: right"
                                       @click="addQuestion()">我要提问
                            </el-button>
                        </div>

                        <a v-for="item in questionList" v-bind="{ href: questionUrl + item.id}" target="_blank"
                           style="color: #FF9D52">
                            <div class="info-list">
                                <el-row :gutter="10">
                                    <el-col :span="5">
                                        <div class="head">
                                            <el-avatar :size="65"
                                                       :src="'http://localhost' + item.headImage"></el-avatar>
                                        </div>
                                        <div class="head-name">
                                            {{item.userName}}
                                        </div>
                                    </el-col>
                                    <el-col :span="19">
                                        <div class="question">
                                            <el-button plain type="primary" style="font-size: 18px" circle>问:
                                            </el-button>
                                            &nbsp;&nbsp;{{item.description}}
                                        </div>
                                        <div class="answer" v-if="item.answer != null">
                                            <el-button plain type="danger" style="font-size: 18px" circle>答:</el-button>
                                            &nbsp;&nbsp;{{item.answer}}
                                        </div>
                                        <div class="answer" v-else>
                                            <el-button plain type="danger" style="font-size: 18px" circle>答:</el-button>
                                            &nbsp;&nbsp; 暂无回答
                                        </div>
                                        <div class="time">
                                            {{item.createTime}}
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                        </a>
                        <div class="page">
                            <el-pagination
                                    :current-page="pageNumber"
                                    @current-change="handleCurrentChange"
                                    layout="total, prev, pager, next"
                                    :page-size="pageSize"
                                    :total="total">
                            </el-pagination>
                        </div>
                    </div>
                </el-card>
            </div>
        </div>

        <!--提问弹出框-->
        <el-dialog
                center
                title="我要提问"
                :lock-scroll="false"
                :visible.sync="questionVisible"
                width="35%"
        >
            <el-input v-model="title" style="width: 200px; padding-right: 20px"
                      placeholder="请在这里输入标题"></el-input>
            <el-autocomplete
                    v-model="destination"
                    :fetch-suggestions="querySearchAsync"
                    placeholder="请在这里输入目的地"
                    @select="handleSelect"
            ></el-autocomplete>
            <div class="info-description">
                <el-input
                        type="textarea"
                        :autosize="{ minRows: 3, maxRows: 6}"
                        placeholder="请在这里输入问题"
                        v-model="questionDescription">
                </el-input>
            </div>
            <div style="padding-top: 10px; padding-bottom: 10px">
                <el-button type="primary" style="float: right" @click="add">提问</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>

    import {Message} from 'element-ui'
    import {getNames} from '../../api/spot'
    import {listQuestion, addQuestions} from '../../api/active'

    export default {
        name: 'questions',
        data() {
            return {
                title:'',
                questionDescription: '',
                questionVisible: false,
                questionUrl: "http://" + location.hostname + ":" + location.port + "/questionDetails?q=",
                questionList: [],
                spotId: null,
                spotName: '',
                destination: '',
                description: '',
                pageNumber: 1,
                pageSize: 5,
                total: 0
            }
        },
        created() {
            this.getList();
        },
        methods: {
            add() {
                if (this.spotId == null || this.destination == '') {
                    Message.warning("请选择目的地")
                } else if(this.questionDescription == '' || this.title == '') {
                    Message.warning("请输入问题, 或者标题")
                } else {
                    addQuestions({
                        spotId: this.spotId,
                        userId: this.$store.getters.getUser.id,
                        destination: this.destination,
                        description: this.questionDescription,
                        title: this.title
                    }).then(res => {
                        Message.success({
                            message: "提问成功"
                        });
                        this.destination = '';
                        this.questionDescription = '';
                        this.questionVisible = false
                    })
                }
            },
            handleCurrentChange(val) {
                this.pageNumber = val;
                this.getList();
                document.querySelector("#day").scrollIntoView(true);
            },
            getList() {
                listQuestion({
                    // spotId: this.spotId,
                    description: this.description,
                    pageNumber: this.pageNumber,
                    pageSize: this.pageSize,
                }).then(res => {
                    this.total = res.data.total;
                    this.questionList = res.data.list;
                })
            },
            querySearchAsync(queryString, cb) {
                var results;
                getNames({
                    name: queryString
                }).then(res => {
                    results = res.data;
                });
                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    cb(results);
                }, 2000);
            },
            handleSelect(item) {
                this.spotId = item.id;
                this.spotName = item.value;
            },
            addQuestion() {
                if (this.$store.getters.getUser.token != "" && this.$store.getters.getUser.token != null) {
                    this.questionVisible = true;
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
    .info-description {
        padding-top: 10px;
    }

    .time {
        padding-top: 20px;
        text-align: right;
    }

    .question {
        padding-top: 15px;
        font-size: 20px;
        color: #666;
    }

    .answer {
        padding-top: 30px;
        font-size: 20px;
        color: #666;
    }

    .head-name {
        padding-top: 10px;
        text-align: center;
    }

    .head {
        padding-top: 30px;
        text-align: center;
    }

    .page {
        padding: 20px 0;
        text-align: right;
    }

    .title {
        padding: 20px 0;
        border-bottom: 1px solid #ddd;
    }

    .info-list {
        height: 150px;
        padding: 20px 0;
        border-bottom: 1px solid #ddd;
    }

    .info-list:hover {
        background-color: #fafafa;
    }

    .el-tabs__item {
        padding: 0 20px;
        height: 40px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        line-height: 40px;
        display: inline-block;
        list-style: none;
        font-size: 25px;
        font-weight: 500;
        color: #303133;
        position: relative;
    }

    .center {
        margin: 0 auto;
        width: 1000px;
        min-height: 500px;
    }

    .title {
        padding: 20px 0;
        border-bottom: 1px solid #ddd;
    }
</style>
