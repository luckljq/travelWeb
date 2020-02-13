<template>
    <div>
        <div class="container2">
            <div>
                <el-input v-model="name" placeholder="搜索景点..." size="medium" class="handle-input"/>
                <el-button icon="el-icon-search" size="medium" type="warning" @click="search" ></el-button>
            </div>
            <div class="search">
                <h3>相关地点</h3>
            </div>
            <div class="center2" v-if="this.list.length > 0">
                <div class="search-image" v-for="(item,i) in list" :style="{backgroundImage:'url('+ item.imageUrl +')'}">
                    <a v-bind="{href: 'http://localhost:8088/spot?s=' + item.scenicSpotId}" target="_blank">
                        <div class="search-title">
                            <div class="info-title">{{item.scenicSpotName}}</div>
                        </div>
                    </a>
                </div>
            </div>
            <div v-else>
                <div class="center">
                    未搜索到结果
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {searchSpot} from '../../api/spot'
    export default {
        name: 'search',
        data() {
            return {
                name:'',
                list:[]
            }
        },
        created() {
            this.name = this.$route.query.q;
            searchSpot({
                name: this.name
            }).then(res => {
                this.list = res.data
            });
        },
        methods:{
            search() {
                this.$router.push({
                    path: '/search?q=' + this.name,
                });
                searchSpot({
                    name: this.name
                }).then(res => {
                    this.list = res.data;
                    console.log(this.list)
                });
            }
        }
    }
</script>
<style scoped>
    .center2 {
        min-height: 425px;
    }
    .center {
        height: 425px;
        padding-top: 50px;
        font-size: 50px;
        text-align: center;
    }
    .info-title {
        padding-top: 30px;
        font-size: 50px;
        color: white;
        text-align: center;
    }
    .search-title {
        margin-top: 20px;
        width: 600px;
        height: 400px;

    }
    .container2 {
        width: 1300px;
        margin-left: 300px;
        padding: 30px;
    }
    .search {
        padding-top: 20px;
        border-bottom: 1px solid #ddd;
        border-radius: 5px;
    }
    .search-image {
        margin-top: 20px;
        margin-left: 30px;
        width: 600px;
        height: 400px;
        background-size:100% 100%;
        display: inline-block;
        border-radius: 5px;
    }
    .handle-input {
        width: 300px;
        margin-right: 20px;
        display: inline-block;
    }
</style>
