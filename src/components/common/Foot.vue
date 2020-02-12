<template>
    <div class="foot">
        <div class="foot-title">
            LJQ毕业设计
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                activeIndex: 'foot',
                name: this.$store.getters.getUser.name,
            }
        }
    }
</script>
<style scoped>
    .foot {
        margin-top: 100px;
        background-color: #3C3C3C;
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 150px;
        font-size: 50px;
        text-align: center;
    }
    .foot-title {
        padding-top: 40px;
        color: #EEBE00;
    }
</style>
