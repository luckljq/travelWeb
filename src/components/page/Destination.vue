<template>
    <div>
        <div class="header-box">
            <div class="ms-login">
                <div class="ms">
                <div class="ms-title">你想去哪里？</div>
                    <el-input v-model="name" placeholder="我想去..." size="medium" class="handle-input"/>
                    <el-button icon="el-icon-search" circle size="medium" type="warning"></el-button>
                </div>
            </div>
        </div>
        <div class="container">
        目的地
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
        }
    }
</script>
<style scoped>
    .handle-input {
        width: 260px;
        margin-right: 20px;
        display: inline-block;
    }
    .header-box {
        background: url("../../assets/img/header.jpg") no-repeat;
        background-size: 100% 100%;
        width: 100%;
        height: 500px;
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
        background: rgba(128,128,128, 0.4);
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
