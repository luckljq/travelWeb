import request from '../utils/request';

//注册
export const register = (query) => {
    return request ({
        url: '/uaa/register',
        method: 'post',
        data: query
    })
};
//获取验证码
export const getCode = (phone) => {
    return request({
        url: '/sys/code/' + phone,
        method: 'get'
    })
};
//登录
export const login = (query) => {
    return request({
        url: '/uaa/login',
        method: 'post',
        data: query
    })
};
