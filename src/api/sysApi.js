import request from '../utils/request';
/**
 * description：sys接口
 *
 * @author ljq
 * @date 2019/12/24　11:16
 */

//编辑用户信息
export const update = (query) => {
    return request({
        url: '/sys/user',
        method:'put',
        data: query
    })
};

//获取用户信息
export const getUserDetail = (id) => {
    return request({
        url: '/sys/user/' + id,
        method: 'get'
    })
};

//获取地区列表
export const getLocations = (id) => {
    return request({
        url: '/sys/location/' + id,
        method: 'get'
    })
};
