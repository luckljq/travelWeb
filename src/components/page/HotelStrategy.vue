<template>
    <div>
        <div class="center" >
            住宿{{spotId}} + {{hotelId}}
        </div>
    </div>
</template>
<script>
    export default {
        name: 'hotelStrategy',
        data() {
            return {
                spotId:'',
                hotelId:'',
            }
        },
        created() {
            this.spotId = this.$route.query.s;
            this.hotelId = this.$route.query.h;
        }
    }
</script>
<style>
    .center {
        margin:0 auto;
        width: 1000px;
    }
</style>
