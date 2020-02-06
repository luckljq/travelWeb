import request from '../utils/request';

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
        url:'/spot/user/count/' + id,
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
