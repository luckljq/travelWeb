<template>
    <div>
        <div class="center" >
            <el-row :gutter="60">
                <el-col :span="7">
                    <div class="foodList">
                        <div class="foodList-title">
                            <i class="el-icon-medal" style="color:red;"></i>
                            成都美食排行
                        </div>
                        <div class="foodList-list" v-for="(item,i) in foodList" :key="i">
                            <el-tag class="strategy-tag">{{i + 1}}</el-tag>
                            {{item.strategyName}}
                            <div style="float: right">
                                <i class="el-icon-top" style="color:red; font-size: 16px; line-height: 25px" ></i>
                                {{item.recommendTotal}}
                            </div>
                        </div>
                    </div>
                </el-col>
                <el-col :span="17">
                    <div class="foodList">
                        啊啊啊啊
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'foodStrategy',
        data() {
            return {
                spotId:'',
                foodId:'',
                foodList:[
                    {
                        strategyName:"龙抄手",
                        recommendTotal: 6,
                        imageUrl:"http://localhost/food/157888351452985f52adf86f64efdb75f8b4b55161204.jpeg",
                        address: "春熙路龙抄手总店",
                        description: "抄手即馄饨，龙抄手是成都的著名品牌，皮薄馅多。红油抄手是很出名的品种之一，10-15元10个",
                    },
                    {
                        strategyName:"龙抄手",
                        recommendTotal: 6,
                        imageUrl:"http://localhost/food/157888351452985f52adf86f64efdb75f8b4b55161204.jpeg",
                        address: "春熙路龙抄手总店",
                        description: "抄手即馄饨，龙抄手是成都的著名品牌，皮薄馅多。红油抄手是很出名的品种之一，10-15元10个",
                    },
                    {
                        strategyName:"龙抄手",
                        recommendTotal: 6,
                        imageUrl:"http://localhost/food/157888351452985f52adf86f64efdb75f8b4b55161204.jpeg",
                        address: "春熙路龙抄手总店",
                        description: "抄手即馄饨，龙抄手是成都的著名品牌，皮薄馅多。红油抄手是很出名的品种之一，10-15元10个",
                    },
                ],
            }
        },
        created() {
            this.spotId = this.$route.query.s;
            this.foodId = this.$route.query.f;
        }
    }
</script>
<style>
    .strategy-tag {
        line-height: 26px;
        background-color:#ff9d00;
        color: white;
        font-size: 15px;
    }
    .foodList-list {
        padding: 15px 0;
        border-bottom: 1px solid #eee;
    }
    .foodList-title {
        color: #ff9d00;
        font-size: 20px;
        border-bottom: 1px solid #eee;
        padding-bottom: 10px;
    }
    .foodList{
        padding-top: 40px
    }
    .center {
        margin:0 auto;
        width: 1000px;
    }
</style>
