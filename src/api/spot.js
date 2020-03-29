import request from '../utils/request';

export const getNames = (query) => {
    return request({
        url: '/spot/spotName',
        method: 'get',
        params: query
    })
};

//获取景点图片列表
export const getImages = (id, query) => {
    return request({
        url:'/sev/spot/images/' + id,
        method: 'get',
        params: query
    })
};

//根据id获取美食信息
export const getFoodDetail = (id) => {
    return request({
        url: '/sev/foodDetail/' + id,
        method: 'get'
    })
};

//获取景点酒店列表接口
export const getHotelList = (query) => {
    return request({
        url:'/sev/hotels',
        method:'get',
        params: query
    })
};

//获取景点美食列表接口
export const getFoodList = (query) => {
    return request({
        url:'/sev/foods',
        method: 'get',
        params: query
    })
};
//获取用户未读消息数
export const getCount = (id) => {
    return request({
        url: '/spot/user/message/count/' + id,
        method: 'get'
    })
};

//获取回复
export const getReply = (query) => {
    return request({
        url: '/spot/user/reply',
        method: 'get',
        params: query
    })
};

//获取评论
export const getComment = (id) => {
    return request({
        url: '/spot/user/comment/' + id,
        method: 'get'
    })
};
//获取消息列表
export const getMessages = (id, query) => {
    return request({
        url: '/spot/user/message/' + id,
        method: 'get',
        params: query
    })
};
//新增评论
export const addComment = (query) => {
    return request({
        url: '/spot/user/comment',
        method: 'post',
        data: query
    })
};

//删除图片
export const deleteFile = (query) => {
    return request({
        url: '/spot/user/delete/image',
        method: 'delete',
        params: query
    })
};

//新增回复
export const addCommentReply = (query) => {
    return request({
        url: '/spot/user/spot/reply',
        method: "post",
        data: query
    })
};

//获取评论回复
export const getCommentReply = (id) => {
    return request({
        url: '/spot/reply/' + id,
        method: 'get'
    })
};

//获取景点评论列表
export const getSpotComment = (query) => {
    return request({
        url: '/spot/comments',
        method: 'get',
        params: query
    })
};

//获取用户是否给景点点赞
export const getSpotUserStatus = (query) => {
    return request({
        url: '/spot/user/spot/status',
        method: 'get',
        params: query
    })
};
//获取景点被点赞数
export  const getSpotCount = (id) => {
    return request({
        url:'/spot/spot/count/' + id,
        method: 'get'
    })
};
//用户给景点点赞
export const spotUserFabulous = (query) =>{
    return request({
        url:'/spot/user/fabulous',
        method:'post',
        params: query
    })
};

//获取景点详细信息
export const getSpotDetail = (id) => {
    return request({
        url: '/spot/spotDetail/' + id,
        method: 'get'
    })
};

//搜索景点
export const searchSpot = (query) => {
    return request({
        url: '/spot/search/spot',
        method: 'get',
        params: query
    })
};
