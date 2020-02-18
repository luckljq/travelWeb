import request from '../utils/request';
/**
 * description：sys接口
 *
 * @author ljq
 * @date 2019/12/24　11:16
 */

//获取地区列表
export const getLocations = (id) => {
    return request({
        url: '/sys/location/' + id,
        method: 'get'
    })
};
