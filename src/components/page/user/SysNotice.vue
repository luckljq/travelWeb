<template>
    <div    >
        <div class="title">
            系统公告
        </div>
        <div class="info">
            <div class="block">
                <el-timeline>
                    <el-timeline-item v-for="(item,i) in data" :timestamp="item.updateTime" placement="top" :key="i">
                        <el-card>
                            <h4 style="color: #FF9D52">{{item.noticeName}}</h4>
                            <p style="padding-top: 5px">{{item.description}}</p>
                            <div style="float: right; padding-top: 20px" >
                                <h4>{{item.senderName}}</h4>
                            </div>
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
    </div>
</template>
<script>
    import {getNotices} from '../../../api/sysApi'
    export default {
        data() {
            return {
                data:[],
                // 当前页
                pageNumber: 1,
                pageSize:5,
                total:0
            }
        },
        methods:{
            handleCurrentChange(val) {
                this.pageNumber = val;
                this.getData()
            },
            getData() {
                getNotices({
                    pageNumber:this.pageNumber,
                    pageSize:this.pageSize
                }).then(res => {
                    this.data = res.data.list;
                    this.total = res.data. total
                })
            }
        },
        created() {
            this.getData()
        }
    }
</script>
<style>
    .page {
        text-align: right;
    }
    .title {
        font-size: 30px;
        border-bottom: 1px solid #ddd;
    }
    .info {
        padding-top: 30px;
    }
</style>
