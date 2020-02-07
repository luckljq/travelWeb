import axios from 'axios';
import {Message} from 'element-ui'

let token = '';

const service = axios.create({
    // process.env.NODE_ENV === 'development' 来判断是否开发环境
    baseURL: 'http://localhost:8888',
    timeout: 500000
});

service.interceptors.request.use( config => {
    let url = config.url;
    if(url.indexOf("user") > 0){
        let user = JSON.parse(window.sessionStorage.getItem('UserState'));
        if (user) {
            token = user.user.token;
        }
        config.headers["Authorization"] ="Bearer " + token ;
    }
    return config;
}, error => {
    Message.error({
        message: "请求超时",
        center:true
    });
    console.log(error);
    return Promise.reject();
});

service.interceptors.response.use(response => {
    if(response.status === 200 && response.data.code === -1){
        Message.error({
            message: response.data.message,
            center:true
        });
        return Promise.reject();
    }else{
        return response.data;
    }
}, error => {
    console.log(error);
    Message.error({
        message: error.message,
        center:true
    });
    return Promise.reject();
});

export default service;
