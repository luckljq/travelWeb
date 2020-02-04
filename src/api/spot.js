import request from '../utils/request';

export const spotUserFabulous = (query) =>{
    return request({
        url:'/spot/spot/fabulous',
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
