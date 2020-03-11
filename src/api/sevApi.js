import request from '../utils/request';
/**
 * description：接口
 *
 * @author ljq
 * @date 2020/3/9　10:34
 */
//新增美食评论
export const addFoodComment = (query) => {
    return request({
        url: '/sev/user/food/comment',
        method: 'post',
        data: query
    })
};

//新增美食评论回复
export const addFoodReply = (query) => {
    return request({
        url: '/sev/user/food/reply',
        method: 'post',
        data: query
    })
};

//获取美食评论回复列表
export const getFoodReply = (id) => {
    return request({
        url: '/sev/food/reply/' + id,
        method: 'get'
    })
};

//根据id获取美食评论列表
export const getFoodComments = (query) => {
    return request({
        url:'/sev/food/comments',
        method: 'get',
        params: query
    })
};
//获取用户是否给美食点赞
export const getFoodUserStatus = (query) => {
    return request({
        url: '/sev/user/food/status',
        method: 'get',
        params: query
    })
};
//获取美食点赞总数
export const getFoodCount = (id) => {
    return request({
        url: '/sev/food/count/' + id,
        method: 'get'
    })
};
//给美食点赞
export const foodUserFabulous = (query) => {
    return request({
        url: '/sev/user/food/fabulous',
        method: 'get',
        params: query
    })
};
