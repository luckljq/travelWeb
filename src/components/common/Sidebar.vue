<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item v-for="(threeItem,i) in subItem.subs" :key="i" :index="threeItem.index">
                                    {{ threeItem.title }}
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.index" :key="subItem.index">
                                {{ subItem.title }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import bus from '../common/bus';
    export default {
        data() {
            return {
                collapse: false,
                items: [
                    {
                        icon: 'el-icon-lx-home',
                        index: 'dashboard',
                        title: '系统首页'
                    }
                    // },
                    // {
                    //     icon: 'el-icon-lx-cascades',
                    //     index: '1',
                    //     title: '景点管理',
                    //     subs: [
                    //         // {
                    //         //     index: 'spots',
                    //         //     title: '景区管理'
                    //         // },
                    //         // {
                    //         //     index: 'charts',
                    //         //     title: '攻略管理'
                    //         // },
                    //         // {
                    //         //     index: '',
                    //         //     title: '路线管理'
                    //         // }
                    //         ]
                    //
                    // },
                    // {
                    //     icon: 'el-icon-lx-calendar',
                    //     index: '2',
                    //     title: '功能管理',
                    //     subs: [
                    //         {
                    //             index: 'tabs',
                    //             title: '登陆日志'
                    //         }]
                    //
                    // },
                    // {
                    //     icon: 'el-icon-lx-settings',
                    //     index: '3',
                    //     title: '系统管理',
                    //     subs: [
                    //         // {
                    //         //     index: 'users',
                    //         //     title: '用户管理'
                    //         // },
                    //         // {
                    //         //     index: 'roles',
                    //         //     title: '角色管理'
                    //         // }
                    //     ]
                    // }
                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        created(){
            let privileges = JSON.parse(window.sessionStorage.getItem('privileges'));
            privileges.forEach(privilege => {
                let flag = false;
                this.items.forEach(i => {
                    if (privilege.groupName == i.title){
                        flag = true;
                    }
                });
                if (flag == false) {
                    let icon = 'el-icon-lx-cascades';
                    switch (privilege.groupName) {
                        case "景点管理":
                            icon = 'el-icon-lx-cascades';
                            break;
                        case "内容管理":
                            icon = 'el-icon-lx-calendar';
                            break;
                        case "系统管理":
                            icon = 'el-icon-lx-settings';
                            break;
                    }
                    this.items.push({
                        icon: icon,
                        index: privilege.privilegeCode,
                        title: privilege.groupName,
                        subs:[]
                    });
                }
            });
            this.items.forEach(i => {
                privileges.forEach(privilege => {
                    if (privilege.groupName == i.title) {
                        i.subs.push({
                            index: privilege.page,
                            title: privilege.privilegeName
                        });
                    }
                });
            });
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom:0;
        overflow-y: scroll;
    }
    .sidebar::-webkit-scrollbar{
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 250px;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
