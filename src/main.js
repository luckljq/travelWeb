import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';
import { messages } from './components/common/i18n';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import Vuex from 'vuex'
import './assets/css/icon.css';
import './components/common/directives';
import "babel-polyfill";
import store from './store'

import axios from 'axios'

Vue.prototype.axios = axios;
Vue.use(Vuex);
Vue.config.productionTip = false;
Vue.use(VueI18n);
Vue.use(ElementUI, {
    size: 'small'
});

const i18n = new VueI18n({
    locale: 'zh',
    messages
});

// 使用钩子函数对路由进行权限跳转
// router.beforeEach((to, from, next) => {
//     const state = sessionStorage.getItem('state');
//     console.log(state);
//     console.log(sessionStorage.getItem('UserState'));
//     if (to.path === '/login') {
//         // next('/login');
//     }
//     else if (state === null) {
//         next('/login');
//     }
//     next();
// });

// router.beforeEach((to, from, next) => {
//     const state = sessionStorage.getItem('state');
//     console.log(state);
//     console.log(sessionStorage.getItem('UserState'));
//     if (to.path === '/login') {
//         // next('/login');
//         if (state !== null) {
//             next('slides')
//         }
//     }
//     else if (state === null) {
//         next('/login');
//     }
//     next();
// });

new Vue({
    router,
    i18n,
    store,
    render: h => h(App)
}).$mount('#app');
