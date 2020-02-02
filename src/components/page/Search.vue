<template>
    <div>
        <div class="container2">
            <div>
                <el-input v-model="name" placeholder="搜索景点..." size="medium" class="handle-input"/>
                <el-button icon="el-icon-search" size="medium" type="warning" ></el-button>
            </div>
            <div class="search">
                <h3>相关地点</h3>
            </div>
            <div class="search-image" v-for="(item,i) in list" :style="{backgroundImage:'url('+ item.url +')'}">
                <a v-bind="{href: item.a}" target="_blank">
                    <div class="search-title">
                        <div class="info-title">{{item.b}}</div>
                    </div>
                </a>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'search',
        data() {
            return {
                name:'',
                list:[
                    {
                        url:'http://localhost/scenic/1/1578637760683062823119e574fda9d1ed73b1b9daf9a.jpeg',
                        a:'https://www.baidu.com',
                        b:'成都'
                    },
                    {
                        url:'http://localhost/scenic/1/1578637763750c2a40838103448828e94c68bfbd6e393.jpeg',
                        a:'https://www.baidu.com',
                        b:'拉萨'
                    },
                    {
                        url:'http://localhost/scenic/1/15786377670827ebcab14f32b494c8e358e41daaa8c3a.jpeg',
                        a:'https://www.baidu.com',
                        b:'马尔代夫'
                    },
                ]
            }
        },
        created() {
            this.name = this.$route.query.q
        }
    }
</script>
<style scoped>
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
    }
    .handle-input {
        width: 300px;
        margin-right: 20px;
        display: inline-block;
    }
</style>
