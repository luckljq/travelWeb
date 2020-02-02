<template>
    <div>
        {{$route.query.q}}
        搜索页面
    </div>
</template>
<script>
    export default {
        name: 'searchPage',
        data() {
            return {
                name:'',
            }
        },
    }
</script>
<style scoped>

</style>
