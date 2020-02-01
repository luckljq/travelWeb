<template>
    <div>
        <div class="header">
            <el-row>
                <el-col :span="6">
                    <div class="logo">
                        旅行信息分享平台
                    </div>
                </el-col>
                <el-col :span="12">
                    <el-menu class="el-menu-demo"
                             :default-active="onRoutes"
                             mode="horizontal"
                             text-color="#222222"
                             active-text-color="#F7C709"
                             @select="handleSelect" router>
                        <el-menu-item index="dashboard" style="font-size: 18px">首页</el-menu-item>
                        <el-menu-item index="destination" style="font-size: 18px">目的地</el-menu-item>
                        <el-menu-item index="rankingList" style="font-size: 18px">排行榜</el-menu-item>
                        <el-menu-item index="diary" style="font-size: 18px">旅行日记</el-menu-item>
                        <el-menu-item index="questions" style="font-size: 18px">问答</el-menu-item>
                        <el-menu-item index="6" style="font-size: 18px"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
                    </el-menu>
                </el-col>
                <el-col :span="6">
                    <div class="header-user-con">
                        <!-- 用户头像 -->
                        <div class="user-avator"><img src="../../assets/img/img.jpg"></div>
                        <!-- 用户名下拉菜单 -->
                        <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                        <span class="el-dropdown-link">
                            {{username}} <i class="el-icon-caret-bottom"></i>
                        </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </el-col>
            </el-row>
        </div>

    </div>
</template>
<script>
    import bus from '../common/bus';

    export default {
        data() {
            return {
                activeIndex: 'dashboard',
                name: this.$store.getters.getUser.name,
            }
        },
        computed: {
            username() {
                return this.$store.getters.getUser.username;
            },
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        methods: {
            // 用户名下拉菜单选择事件
            handleCommand(command) {
                if (command === 'loginout') {
                    sessionStorage.clear();
                    this.$router.push('/login');
                }
            },
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            }
        },
        mounted() {
        }
    }
</script>
<style scoped>
    .el-menu-demo {
        padding-top: 3px;
    }
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        font-size: 22px;
        color: #fff;

    }

    .header .logo {
        color: #222222;
        float: right;
        padding-right: 50px;
        line-height: 70px;
    }

    .header-right {
        float: right;
        padding-right: 50px;
    }

    .header-user-con {
        display: flex;
        height: 70px;
        align-items: center;
    }

    .btn-bell .el-icon-bell {
        color: #fff;
    }

    .user-name {
        margin-left: 10px;
    }

    .user-avator {
        margin-left: 20px;
    }

    .user-avator img {
        display: block;
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }

    .el-dropdown-link {
        color: black;
        cursor: pointer;
    }
</style>
