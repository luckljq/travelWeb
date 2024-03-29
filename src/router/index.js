import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    mode:'history',
    routes: [
        {
            path: '/',
            redirect: '/destination'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '主页' },
            children:[
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
                    path: '/diaryDetail',
                    component: resolve => require(['../components/page/DiaryDetail.vue'], resolve),
                    meta: { title: '游记详情' }
                },
                {
                    path: '/write',
                    component: resolve => require(['../components/page/WriteDiary.vue'], resolve),
                    meta: { title: '写游记' }
                },
                {
                    path: '/questions',
                    component: resolve => require(['../components/page/Questions.vue'], resolve),
                    meta: { title: '问答' }
                },
                {
                    path: '/questionDetails',
                    component: resolve => require(['../components/page/QuestionDetail.vue'], resolve),
                    meta: { title: '问答详情' }
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
                    path: '/spotImages',
                    component: resolve => require(['../components/page/SpotImages.vue'], resolve),
                    meta: { title: '景点图片' }
                },
                {
                    path: '/foodStrategy',
                    component: resolve => require(['../components/page/FoodStrategy.vue'], resolve),
                    meta: { title: '美食攻略' }
                },
                {
                    path: '/hotelStrategy',
                    component: resolve => require(['../components/page/HotelStrategy.vue'], resolve),
                    meta: { title: '住宿攻略' }
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
                            path: '/notice',
                            component: resolve => require(['../components/page/user/SysNotice.vue'], resolve),
                            meta: { title: '系统公告' }
                        },
                        {
                            path: '/news',
                            component: resolve => require(['../components/page/user/News.vue'], resolve),
                            meta: { title: '我的消息' }
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
