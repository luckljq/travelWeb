/**
 * description：景点图片
 *
 * @author ljq
 * @date 2020/3/20　8:14
 */
<template>
    <div>
        <div class="center-bottom">
            <div class="center">
                <div class="header2-title">成都图片</div>
            </div>
            <div class="center-image">
                <div class="center" >
                    <el-row :gutter="10" v-infinite-scroll="load" infinite-scroll-disabled="disabled">
                        <el-col :span="8" v-for="(item,i) in imageUrls" :key="i">
                            <el-card :body-style="{ padding: '0px' }" style="margin-bottom: 20px">
                                <el-image :src="item" :preview-src-list="imageUrls" style="width: 324px; height: 230px"/>
                            </el-card>
                        </el-col>
                        <p v-if="loading" style="margin-top:10px; text-align: center" class="loading">
                            <span></span>
                        </p>
                    </el-row>
                    <div class="noMore">
                        <p v-if="noMore" style="margin-top:10px;font-size:20px;color:#ccc">没有更多了</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {getImages} from '../../api/spot'
    export default {
        data() {
            return {
                count: 1,//起始页数值为0
                loading: false,
                totalPages: "",//取后端返回内容的总页数
                list: [], //后端返回的数组
                spotId:null,
                imageUrls:[]
            }
        },
        created() {
            this.spotId = this.$route.query.s;
            this.getList();
        },
        computed: {
            noMore() {
                //当起始页数大于总页数时停止加载
                return this.count > this.totalPages - 1;
            },
            disabled() {
                return this.loading || this.noMore;
            }
        },
        methods: {
            load() {
                //滑到底部时进行加载
                this.loading = true;
                setTimeout(() => {
                    //页数+1
                    this.count += 1;
                    //调用接口，此时页数+1，查询下一页数据
                    this.getList()
                }, 2000);
            },
            getList() {
                getImages(this.spotId, {
                    pageNumber : this.count,
                    pageSize : 9,
                }).then(res => {
                    let list = res.data.list;
                    list.forEach(i => {
                        this.imageUrls.push(i.imageUrl);
                    });
                    this.totalPages = res.data.pages;
                    this.loading = false;
                })
            }
        }
    }
</script>
<style scoped>
    .noMore{
        text-align: center;
    }
    .loading span {
        display: inline-block;
        width: 20px;
        height: 20px;
        border: 2px solid #409eff;
        border-left: transparent;
        animation: zhuan 0.5s linear infinite;
        border-radius: 50%;
    }
    .header2-title {
        font-size: 40px;
        color: #333;
        padding: 20px 0
    }
    .center-bottom {
        border-bottom: 1px solid #eee;
    }
    .center {
        margin:0 auto;
        width: 1000px;
    }
    .center-image {
        padding-top: 30px;
        padding-bottom: 30px;
        background-color: #fafafa;
        min-height: 450px;
        border-bottom: 1px solid #eee;
        border-top: 1px solid #eee
    }
</style>
