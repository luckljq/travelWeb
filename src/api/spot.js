import request from '../utils/request';

export const searchSpot = (query) => {
    return request({
        url: '/spot/search/spot',
        method: 'get',
        params: query
    })
};
