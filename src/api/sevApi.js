import request from '../utils/request';
/**
 * description：接口
 *
 * @author ljq
 * @date 2020/3/9　10:34
 */

export const getFoodCommentReply = (query) => {
    return request({
        url:'/sev/user/foodReply',
        method:'get',
        params:query
    })
};

export const getHotelCommentReply = (query) => {
    return request({
        url:'/sev/user/hotelReply',
        method:'get',
        params:query
    })
};

export const getFoodComment = (id) => {
    return request({
        url: '/sev/user/foodComment/' + id,
        method: 'get'
    })
};

export const getHotelComment = (id) => {
    return request({
        url: '/sev/user/hotelComment/' + id,
        method: 'get'
    })
};

//新增酒店评论
export const addHotelComment = (query) => {
    return request({
        url: '/sev/user/hotel/comment',
        method: 'post',
        data: query
    })
};

//新增酒店评论回复
export const addHotelReply = (query) => {
    return request({
        url: '/sev/user/hotel/reply',
        method: 'post',
        data: query
    })
};

//获取酒店评论回复列表
export const getHotelReply = (id) => {
    return request({
        url: '/sev/hotel/reply/' + id,
        method: 'get'
    })
};

//根据id获取酒店评论列表
export const getHotelComments = (query) => {
    return request({
        url:'/sev/hotel/comments',
        method: 'get',
        params: query
    })
};

//获取用户是否给酒店点赞
export const getHotelUserStatus = (query) => {
    return request({
        url: '/sev/user/hotel/status',
        method: 'get',
        params: query
    })
};
//获取酒店点赞总数
export const getHotelCount = (id) => {
    return request({
        url: '/sev/hotel/count/' + id,
        method: 'get'
    })
};
//给酒店点赞
export const hotelUserFabulous = (query) => {
    return request({
        url: '/sev/user/hotel/fabulous',
        method: 'get',
        params: query
    })
};

//获取酒店详情
export const getHotelDetails = (id) => {
    return request({
        url:'/sev/hotelDetails/' + id,
        method: 'get'
    })
};
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
