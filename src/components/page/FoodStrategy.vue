<template>
    <div>
        <div class="center" >
            美食{{spotId}} + {{foodId}}
        </div>
    </div>
</template>
<script>
    export default {
        name: 'foodStrategy',
        data() {
            return {
                spotId:'',
                foodId:'',
            }
        },
        created() {
            this.spotId = this.$route.query.s;
            this.foodId = this.$route.query.f;
        }
    }
</script>
<style>
    .center {
        margin:0 auto;
        width: 1000px;
    }
</style>
