<template>
    <div>
        <div class="center">
            <el-container>
                <el-aside width="200px">
                    <el-menu
                            active-text-color="#ffa800"
                            router
                            default-active="/info">
                        <el-menu-item index="/info">
                            <i class="el-icon-user-solid"></i>
                            <span style="font-size: 15px">我的信息</span>
                        </el-menu-item>
                        <el-menu-item index="/travels">
                            <i class="el-icon-camera-solid"></i>
                            <span style="font-size: 15px">我的游记</span>
                        </el-menu-item>
                        <el-menu-item index="/userQuestions">
                            <i class="el-icon-question"></i>
                            <span style="font-size: 15px">我的问答</span>
                        </el-menu-item>
                        <el-menu-item index="/comments">
                            <i class="el-icon-s-order"></i>
                            <span style="font-size: 15px">我的评论</span>
                        </el-menu-item>
                        <el-menu-item index="/news">
                            <i class="el-icon-info"></i>
                            <span style="font-size: 15px">我的消息</span>
                        </el-menu-item>
                        <el-menu-item index="/want">
                            <i class="el-icon-star-on"></i>
                            <span style="font-size: 15px">我想去的</span>
                        </el-menu-item>
                    </el-menu>
                </el-aside>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {

            }
        },
        computed: {
            onRoutes() {
                return this.$route.path.replace('/', '');
            }
        },
    }
</script>
<style>
    .el-aside {
        color: #333;
        text-align: center;
    }
    .el-main {
        padding: 0 20px;
        color: #333;
    }
    .center {
        padding-top: 40px;
        margin:0 auto;
        width: 1000px;
        height: 500px;
    }
</style>
