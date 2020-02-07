import request from '../utils/request';

//登录
export const login = (query) => {
    return request({
        url: '/uaa/login',
        method: 'post',
        data: query
    })
};
