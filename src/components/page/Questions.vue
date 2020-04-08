<template>
    <div>
        <div class="center">
            <div style="padding: 40px 0">
                <a id="day" href="#day" style="color:red"></a>
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>问答中心</span>
                    </div>
                    <div>
                        内容
                    </div>
                </el-card>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'questions',
        data() {
            return {}
        }
    }
</script>
<style scoped>
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
