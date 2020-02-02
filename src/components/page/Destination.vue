<template>
    <div>
        <div class="header-box">
            <div class="ms-login">
                <div class="ms">
                <div class="ms-title">你想去哪里？</div>
                    <el-input v-model="name" placeholder="我想去..." size="medium" class="handle-input"/>
                    <el-button icon="el-icon-search" circle size="medium" type="warning" @click="toSearch"></el-button>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="container-title">热门目的地</div>
            <div class="center">
                <div class="mm">
                    <el-row :gutter="150">
                        <el-col :span="12">
                            <el-row>
                                <el-col :span="5" class="center-title"><a>直辖市</a></el-col>
                                <el-col :span="3"><a href="https://www.baidu.com" target="_blank">北京</a></el-col>
                                <el-col :span="3"><a href="http://localhost:8088/search" target="_blank">上海</a></el-col>
                                <el-col :span="3"><a>重庆</a></el-col>
                                <el-col :span="3"><a>天京</a></el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="12">
                            <el-row>
                                <el-col :span="5" class="center-title"><a>西藏</a></el-col>
                                <el-col :span="3"><a>拉萨</a></el-col>
                                <el-col :span="3"><a>林芝</a></el-col>
                                <el-col :span="3"><a>阿里</a></el-col>
                                <el-col :span="3"><a>昌都</a></el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                </div>
                <div class="mm">
                <el-row :gutter="150">
                    <el-col :span="12">
                        <el-row>
                            <el-col :span="5" class="center-title"><a>云南</a></el-col>
                            <el-col :span="3"><a>丽江</a></el-col>
                            <el-col :span="3"><a>大理</a></el-col>
                            <el-col :span="3"><a>昆明</a></el-col>
                            <el-col :span="4"><a>香格里拉</a></el-col>
                            <el-col :span="3"><a>泸沽湖</a></el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12">
                        <el-row>
                            <el-col :span="5" class="center-title"><a>四川</a></el-col>
                            <el-col :span="3"><a>成都</a></el-col>
                            <el-col :span="3"><a>九寨沟</a></el-col>
                            <el-col :span="3"><a>稻城</a></el-col>
                            <el-col :span="3"><a>都江堰</a></el-col>
                            <el-col :span="3"><a>峨眉山</a></el-col>
                            <el-col :span="3"><a>阿坝</a></el-col>
                        </el-row>
                    </el-col>
                </el-row>
            </div>
                <div class="mm">
                    <el-row :gutter="150">
                        <el-col :span="12">
                            <el-row>
                                <el-col :span="5" class="center-title"><a>山东</a></el-col>
                                <el-col :span="3"><a>青岛</a></el-col>
                                <el-col :span="3"><a>泰山</a></el-col>
                                <el-col :span="3"><a>日照</a></el-col>
                                <el-col :span="3"><a>威海</a></el-col>
                                <el-col :span="3"><a>烟台</a></el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="12">
                            <el-row>
                                <el-col :span="5" class="center-title"><a>江苏</a></el-col>
                                <el-col :span="3"><a>南京</a></el-col>
                                <el-col :span="3"><a>苏州</a></el-col>
                                <el-col :span="3"><a>无锡</a></el-col>
                                <el-col :span="3"><a>扬州</a></el-col>
                                <el-col :span="3"><a>周庄</a></el-col>
                                <el-col :span="3"><a>同里</a></el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'destination',
        data() {
            return {
                name:'',
            }
        },
        methods:{
            toSearch() {
                if(this.name != '') {
                    this.$router.push({
                        path: '/search?q=' + this.name,
                    });
                }
            }
        }
    }
</script>
<style scoped>
    .mm {
        padding: 30px;
        border-bottom: 1px solid #ddd;
        border-radius: 5px;
    }
    .center-title {
        font-size: 20px;
        text-decoration: underline;
    }
    .center {
        padding: 30px 320px;
        /*text-align: center;*/
    }
    .container-title {
        text-align: center;
        font-size: 30px;

    }
    .handle-input {
        width: 260px;
        margin-right: 20px;
        display: inline-block;
    }
    .header-box {
        background: url("../../assets/img/header.jpg") no-repeat;
        background-size: 100% 100%;
        width: 100%;
        height: 700px;
    }
    .ms-title{
        width:100%;
        line-height: 50px;
        font-size:20px;
        color: #fff;
    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:350px;
        margin:-190px 0 0 -175px;
        border-radius: 5px;
        background: rgba(128,128,128, 0.2);
        overflow: hidden;
    }
    .login-btn button{
        width:100%;
        height:36px;
        margin-bottom: 10px;
    }
    .ms{
        padding: 10px;
    }
</style>
