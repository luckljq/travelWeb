<template>
    <div>
        <div class="title">
            我的问答
        </div>
        <div class="info">
            <div class="block">
                <el-input v-model="title" style="width: 200px; padding-top: 10px; padding-right: 10px"
                          placeholder="搜一搜"></el-input>
                <el-button type="primary"
                           @click="search()">搜索
                </el-button>
                <el-timeline style="padding-top: 10px">
                    <el-timeline-item v-for="(item,i) in data" :timestamp="item.createTime" placement="top" :key="i">
                        <el-card>
                            <div class="info-title">
                                {{item.title}}
                            </div>
                            <div class="info-info">
                                {{item.description}}
                            </div>
                            <el-button  type="text" style="float: right; color: #FF9D52" @click="openMessage(item.id)">详情</el-button>
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
    import {getQuestionByUser} from '../../../api/active'
    export default {
        data() {
            return {
                data:[],
                title:'',
                //分页
                total:0,
                pageNumber:1,
                pageSize:5
            }
        },
        methods:{
            search() {
                this.pageNumber = 1;
                this.getData();
            },
            handleCurrentChange(val) {
                this.pageNumber = val;
                this.getData();
            },
            getData() {
                getQuestionByUser({
                    userId: this.$store.getters.getUser.id,
                    title:this.title,
                    pageNumber: this.pageNumber,
                    pageSize: this.pageSize
                }).then(res=>{
                    this.data = res.data.list;
                    this.total = res.data.total;
                })
            },
            openMessage(id){
                this.$router.push("/questionDetails?q=" + id)
            }
        },
        created() {
            this.getData()
        }
    }
</script>
<style scoped>
    .page {
        text-align: right;
    }
    .info-title {
        color: #FF9D52;
        font-size: 18px;
    }
    .info-info {
        padding-top: 5px;
        font-size: 14px;
        color: #303133;
        height: 20px;
        display: -webkit-box;  /*  display: -webkit-box; 必须结合的属性 ，将对象作为弹性伸缩盒子模型显示  */
        -webkit-box-orient: vertical; /*  -webkit-box-orient 必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式  */
        -webkit-line-clamp: 1; /*  -webkit-line-clamp用来限制在一个块元素显示的文本的行数 */
        overflow: hidden;
    }
    .title {
        font-size: 30px;
        border-bottom: 1px solid #ddd;
    }
</style>
