<template>
    <div>
        <div class="title">
            更换绑定手机
        </div>
        <div class="info">
            <el-steps :space="200"  finish-status="success">
                <el-step title="身份验证">

                </el-step>
                <el-step title="进行中"></el-step>
                <el-step title="步骤 3"></el-step>
            </el-steps>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                phone:''
            }
        }
    }
</script>
<style>
    .title {
        font-size: 30px;
        border-bottom: 1px solid #ddd;
    }
    .info {

    }
</style>
