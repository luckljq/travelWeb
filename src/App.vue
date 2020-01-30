<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
export default {
    name: 'App',
    // mounted() {
    //     window.addEventListener('unload', this.saveState);
    // },
    // methods: {
    //     saveState() {
    //         sessionStorage.setItem('UserState', JSON.stringify(this.$store.state.user));
    //     }
    // }
}
</script>

<style>
    @import "./assets/css/main.css";
    @import "./assets/css/color-dark.css";     /*深色主题*/
    /*@import "./assets/css/theme-green/color-green.css";   浅绿色主题*/
</style>
