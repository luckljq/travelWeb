<template>
    <div>
        <div class="center">
            <div style="padding: 40px 0">
                <a id="day" href="#day" style="color:red"></a>
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="热门游记" name="first">
                        <div class="title">
                            <el-tag size="30">筛选</el-tag>
                            <el-autocomplete
                                    style="padding-left: 20px"
                                    v-model="destination"
                                    :fetch-suggestions="querySearchAsync"
                                    placeholder="请在这里输入目的地"
                                    @select="handleSelect"
                            ></el-autocomplete>
                            <el-button type="warning"
                                       size="medium"
                                       style="float: right"
                                       @click="goWrite">去写游记
                            </el-button>
                        </div>
                        <div style="min-height: 500px">
                            <a v-for="item in diaryList" v-bind="{ href: diaryUrl + item.id}" target="_blank"
                               style="color: #FF9D52">
                                <div class="info-list">
                                    <el-row :gutter="50">
                                        <el-col :span="8">
                                            <el-image style="height: 200px;"
                                                      :src="item.image"></el-image>
                                        </el-col>
                                        <el-col :span="16">
                                            <div class="info-title">
                                                {{item.title}}
                                            </div>
                                            <div class="info-info">
                                                {{item.description}}
                                            </div>
                                            <div class="info-last">

                                                <i class="el-icon-location-information" style="color:#ff9d00;"></i>
                                                {{item.destination}}，by&nbsp;&nbsp;
                                                <span style="color:#ff9d00;">{{item.userName}}</span>
                                                &nbsp;&nbsp; {{item.createTime}}
                                                <div style="float: right; color: #ff9d00;font-size: 19px">
                                                    {{item.recommendTotal}}
                                                    <i class="el-icon-thumb"></i>
                                                </div>
                                            </div>
                                        </el-col>
                                    </el-row>
                                </div>
                            </a>
                        </div>
                        <div class="page">
                            <el-pagination
                                    :current-page="pageNumber"
                                    @current-change="handleCurrentChange"
                                    layout="total, prev, pager, next"
                                    :page-size="pageSize"
                                    :total="total">
                            </el-pagination>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="最新游记" name="second">
                        最新游记
                    </el-tab-pane>

                </el-tabs>

            </div>
        </div>
    </div>
</template>
<script>
    import {Message} from 'element-ui'
    import {getNames} from '../../api/spot'
    import {getDiaries} from '../../api/active'

    export default {
        name: 'diary',
        data() {
            return {
                diaryList: [],
                diaryUrl: "http://" + location.hostname + ":" + location.port + "/diaryDetail?d=",
                destination: '',
                spotId: null,
                spotName: "",
                timeout: null,
                activeName: 'first',
                //分页
                pageNumber: 1,
                pageSize: 5,
                total: 0
            }
        },
        created() {
            this.getDiary();
        },
        methods: {
            handleCurrentChange(val) {
                let vm = this;
                this.pageNumber = val;
                this.getDiary();
                document.querySelector("#day").scrollIntoView(true);
            },
            goWrite() {
                if (this.$store.getters.getUser.token != "" && this.$store.getters.getUser.token != null) {
                    this.$router.push('/write')
                } else {
                    Message.warning({
                        message: "请您先登录，再进行操作",
                    });
                }
            },
            getDiary() {
                getDiaries({
                    spotId: this.spotId,
                    pageNumber: this.pageNumber,
                    pageSize: this.pageSize
                }).then(res => {
                    this.diaryList = res.data.list;
                    this.total = res.data.total;
                })
            },
            handleClick(tab, event) {
                console.log(tab, event);
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
                this.getDiary();
            }
        }
    }
</script>
<style>
    .page {
        padding: 20px 0;
        text-align: right;
    }

    .info-last {
        color: #666;
        width: 650px;
        position: absolute;
        bottom: 0;
    }

    .info-info {
        line-height: 1.5;
        height: 90px;
        display: -webkit-box; /*  display: -webkit-box; 必须结合的属性 ，将对象作为弹性伸缩盒子模型显示  */
        -webkit-box-orient: vertical; /*  -webkit-box-orient 必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式  */
        -webkit-line-clamp: 4; /*  -webkit-line-clamp用来限制在一个块元素显示的文本的行数 */
        overflow: hidden;
        padding: 15px 0;
        color: #666;
        font-size: 18px;
    }

    .info-title {
        color: #333;
        font-size: 22px;
    }

    .info-list {
        height: 200px;
        padding: 20px 0;
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
