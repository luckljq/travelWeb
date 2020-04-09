<template>
    <div>
        问答详情 +  {{questionId}}
    </div>
</template>
<script>

    export default {
        name: 'questionDetail',
        data() {
            return{
                questionId: null,
            }
        },
        created() {
            this.questionId = this.$route.query.q
        }
    }
</script>
<style scoped>

</style>
