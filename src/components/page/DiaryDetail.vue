<template>
    <div>
        <div class="container">
            游记详情 + {{diaryId}}
        </div>
    </div>
</template>
<script>
    export default {
        name: 'diaryDetail',
        data() {
            return {
                diaryId:null,
            }
        },
        created() {
            this.diaryId = this.$route.query.d;
        }
    }
</script>
<style scoped>

</style>
