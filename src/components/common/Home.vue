<template>
    <div class="wrapper">
        <v-head></v-head>
        <router-view></router-view>
    </div>
</template>

<script>
    import vHead from './Header.vue';
    export default {
        data(){
            return {
                tagsList: [],
                collapse: false
            }
        },
        components:{
            // vHead, vSidebar, vTags
            vHead
        },
        created(){

        }
    }
</script>
