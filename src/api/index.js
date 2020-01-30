import request from '../utils/request';

export const login = (query) => {
    return request({
        url: '/uaa/login',
        method: 'post',
        data: query
    })
};
