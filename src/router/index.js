import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    mode:'history',
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '主页' },
            children:[
                {
                    path: '/dashboard',
                    component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/destination',
                    component: resolve => require(['../components/page/Destination.vue'], resolve),
                    meta: { title: '目的地' }
                },
                {
                    path: '/rankingList',
                    component: resolve => require(['../components/page/RankingList.vue'], resolve),
                    meta: { title: '排行榜' }
                },
                {
                    path: '/diary',
                    component: resolve => require(['../components/page/Diary.vue'], resolve),
                    meta: { title: '旅行日记' }
                },
                {
                    path: '/questions',
                    component: resolve => require(['../components/page/Questions.vue'], resolve),
                    meta: { title: '问答' }
                },
                {
                    path: '/search',
                    component: resolve => require(['../components/page/Search.vue'], resolve),
                    meta: { title: '搜索' }
                },
                {
                    path: '/spot',
                    component: resolve => require(['../components/page/Spot.vue'], resolve),
                    meta: { title: '景点' }
                },
                {
                    path: '/user',
                    component: resolve => require(['../components/page/UserCenter.vue'], resolve),
                    meta: { title: '个人中心' },
                    children:[
                        {
                            path: '/info',
                            component: resolve => require(['../components/page/user/Info.vue'], resolve),
                            meta: { title: '用户信息' }
                        },
                        {
                            path: '/travels',
                            component: resolve => require(['../components/page/user/UserTravels.vue'], resolve),
                            meta: { title: '我的游记' }
                        },
                        {
                            path: '/userQuestions',
                            component: resolve => require(['../components/page/user/UserQuestions.vue'], resolve),
                            meta: { title: '我的问答' }
                        },
                        {
                            path: '/comments',
                            component: resolve => require(['../components/page/user/UserComments.vue'], resolve),
                            meta: { title: '我的评论' }
                        },
                        {
                            path: '/news',
                            component: resolve => require(['../components/page/user/News.vue'], resolve),
                            meta: { title: '我的消息' }
                        },
                        {
                            path: '/want',
                            component: resolve => require(['../components/page/user/Want.vue'], resolve),
                            meta: { title: '我想去的' }
                        },
                        {
                            path: '/change',
                            component: resolve => require(['../components/page/user/Change.vue'], resolve),
                            meta: { title: '我想去的' }
                        },
                    ]
                },
                {
                    path: '/404',
                    component: resolve => require(['../components/page/404.vue'], resolve),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: resolve => require(['../components/page/403.vue'], resolve),
                    meta: { title: '403' }
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
