<template>
    <div class="wrapper">
        <v-head></v-head>
        <router-view></router-view>
        <v-foot></v-foot>
    </div>
</template>

<script>
    import vHead from './Header.vue';
    import vFoot from './Foot'
    export default {
        data(){
            return {
                tagsList: [],
                collapse: false
            }
        },
        components:{
            // vHead, vSidebar, vTags
            vHead, vFoot
        },
        created(){

        }
    }
</script>
