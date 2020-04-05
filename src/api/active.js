import request from '../utils/request';

//游记被点赞总数
export const getCount = (id) =>{
    return request({
        url:'/active/diary/count/' + id,
        method:'get'
    })
};

//用户是否给游记点赞
export const getStatus = (query) => {
    return request({
        url:'/active/user/diary/status',
        method:'get',
        params: query
    })
};

//用户给游记点赞
export const fabulous = (query) => {
    return request({
        url:'/active/user/fabulous',
        method:'post',
        params:query
    })
};

//获取游记详情
export const getDiary = (id) => {
    return request({
        url: '/active/diary/' + id,
        method: 'get'
    })
};

//获取游记列表
export const getDiaries = (query) => {
    return request({
        url:'/active/web/diaries',
        method:'get',
        params: query
    })
};

//新增游记
export const addDiary = (query) => {
    return request({
        url: '/active/user/diary',
        method:'post',
        data: query
    })
};
